from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from agent.graph import app as agent_app

load_dotenv()

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserQuery(BaseModel):
    query: str
    current_url: str
    page_content: Optional[str] = None

class ActionStep(BaseModel):
    step_id: int
    selector: str
    action: str
    instruction: str

class AgentResponse(BaseModel):
    plan: List[ActionStep]

@app.post("/plan", response_model=AgentResponse)
async def create_plan(query: UserQuery):
    print(f"Received query: {query.query} on {query.current_url}")
    
    try:
        # Invoke LangGraph Agent
        inputs = {"query": query.query, "current_url": query.current_url}
        result = agent_app.invoke(inputs)
        
        generated_plan = result.get("plan")
        
        if not generated_plan or not generated_plan.steps:
            return AgentResponse(plan=[])
            
        # Convert Pydantic models from graph.py to dicts for main.py's response model
        return AgentResponse(plan=[step.dict() for step in generated_plan.steps])
        
    except Exception as e:
        print(f"Error processing request: {e}")
        # Fallback or error handling
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Agent Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
