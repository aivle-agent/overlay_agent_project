from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI()

class UserQuery(BaseModel):
    query: str
    current_url: str
    page_content: Optional[str] = None

class ActionStep(BaseModel):
    step_id: int
    selector: str
    action: str # click, type, etc.
    instruction: str

class AgentResponse(BaseModel):
    plan: List[ActionStep]

@app.post("/plan", response_model=AgentResponse)
async def create_plan(query: UserQuery):
    # Mock logic for now
    print(f"Received query: {query.query} on {query.current_url}")
    
    # Simple mock response
    mock_plan = [
        ActionStep(step_id=1, selector="#login-btn", action="click", instruction="Click the Login button to proceed."),
        ActionStep(step_id=2, selector="#username", action="type", instruction="Enter your username.")
    ]
    
    return AgentResponse(plan=mock_plan)

@app.get("/")
async def root():
    return {"message": "Agent Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
