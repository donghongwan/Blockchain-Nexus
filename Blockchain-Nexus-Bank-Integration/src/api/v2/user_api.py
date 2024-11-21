from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from services.kyc_service import KYCService
from fastapi.security import OAuth2PasswordBearer
import logging

router = APIRouter()
kyc_service = KYCService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class IdentityData(BaseModel):
    name: str
    dob: str
    address: str
    id_number: str

@router.post("/submit_kyc/{user_id}")
async def submit_kyc(user_id: str, identity_data: IdentityData, token: str = Depends(oauth2_scheme)):
    try:
        kyc_service.submit_kyc(user_id, identity_data.dict())
        return {"message": f"KYC submitted for user {user_id}."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/kyc_status/{user_id}")
async def get_kyc_status(user_id: str, token: str = Depends(oauth2_scheme)):
    status = kyc_service.check_kyc_status(user_id)
    return {"user_id": user_id, "status": status["status"]}

@router.put("/update_user/{user_id}")
async def update_user(user_id: str, identity_data: IdentityData, token: str = Depends(oauth2_scheme)):
    # Logic to update user information
    return {"message": f"User {user_id} information updated."}
