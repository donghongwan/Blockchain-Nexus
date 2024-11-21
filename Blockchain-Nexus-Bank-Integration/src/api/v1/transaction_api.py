from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from services.aml_service import AMLService
from fastapi.security import OAuth2PasswordBearer
import logging

router = APIRouter()
aml_service = AMLService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Transaction(BaseModel):
    sender: str
    recipient: str
    amount: float = Field(gt=0, description="Transaction amount must be greater than 0")

@router.post("/send")
async def send_transaction(transaction: Transaction, token: str = Depends(oauth2_scheme)):
    try:
        aml_service.monitor_transaction(transaction.dict())
        return {"message": f"Transaction of {transaction.amount} from {transaction.sender} to {transaction.recipient} successful."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/transaction_history/{user_id}")
async def get_transaction_history(user_id: str, token: str = Depends(oauth2_scheme)):
    # Logic to get transaction history
    return {"user_id": user_id, "transactions": []}  # Example empty history
