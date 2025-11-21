import os
from typing import List, TypedDict, Optional
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
from .sitemap import get_page_elements, FEATURE_KNOWLEDGE

# --- Data Models ---
class ActionStep(BaseModel):
    step_id: int
    selector: str
    action: str = Field(description="Action type: click, type, or navigate")
    instruction: str = Field(description="User friendly instruction text")

class Plan(BaseModel):
    steps: List[ActionStep]

class AgentState(TypedDict):
    query: str
    current_url: str
    plan: Optional[Plan]

# --- Nodes ---
def planner_node(state: AgentState):
    query = state["query"]
    current_url = state["current_url"]
    
    # 1. Get available elements for the current page
    elements = get_page_elements(current_url)
    elements_str = "\n".join([f"- ID: {e['id']}, Desc: {e['desc']}, Selector: {e['selector']}" for e in elements])
    
    # 2. Prompt the LLM
    system_prompt = f"""
    You are an assistive agent for an elderly user using a government website.
    
    Current Page: {current_url}
    Available Interactive Elements on this page:
    {elements_str}
    
    Global Navigation Knowledge (Where to find things):
    {FEATURE_KNOWLEDGE}
    
    User Query: "{query}"
    
    Your goal is to generate a sequence of actions (steps) to help the user achieve their goal.
    
    Rules:
    1. Check if the user's goal can be achieved with the 'Available Interactive Elements' on the CURRENT page.
    2. If YES, provide the steps using those elements.
    3. If NO, use the 'Global Navigation Knowledge' to find which menu/page the user needs to go to.
       - Then, look at the 'Available Interactive Elements' to find the button/link that leads to that menu/page.
       - Provide the step to click that menu button.
       - Add a helpful instruction like "First, we need to go to the [Menu Name] page."
    4. If the user is already on the right page, provide the steps to perform the action.
    5. Return a JSON object with a list of steps.
    """
    
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    structured_llm = llm.with_structured_output(Plan)
    
    response = structured_llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=query)
    ])
    
    return {"plan": response}

# --- Graph Definition ---
workflow = StateGraph(AgentState)

workflow.add_node("planner", planner_node)
workflow.set_entry_point("planner")
workflow.add_edge("planner", END)

app = workflow.compile()
