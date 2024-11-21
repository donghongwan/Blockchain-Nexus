from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel,Field
from services.kyc_service import KYCService
from fastapi.security import OAuth2PasswordBearer
import logging

router = APIRouter()
kyc_service = KYCService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Account(BaseModel):
    user_id: str
    initial_balance: float = Field(gt=0, description="Initial balance must be greater than 0")

@router.post("/create_account")
async def create_account(account: Account, token: str = Depends(oauth2_scheme)):
    # Logic to create an account
    return {"message": f"Account created for user {account.user_id} with balance {account.initial_balance}"}

@router.get("/balance/{user_id}")
async def get_balance(user_id: str, token: str = Depends(oauth2_scheme)):
    # Logic to get balance
    return {"user_id": user_id, "balance": 1000.0}  # Example balance

@router.put("/update_balance/{user_id}")
async def update_balance(user_id: str, new_balance: float, token: str = Depends(oauth2_scheme)):
    # Logic to update balance
    return {"message": f"Balance updated for user {user_id} to {new_balance}"}
