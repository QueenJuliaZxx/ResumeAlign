from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional
import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    phone: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    password: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    createdAt: str


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)) -> UserResponse:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return UserResponse(
            id=user_id,
            username=payload.get("username", ""),
            email=payload.get("email"),
            phone=payload.get("phone"),
            avatar=payload.get("avatar"),
            createdAt=payload.get("createdAt", datetime.utcnow().isoformat())
        )
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


MOCK_USERS = {
    "user_test": {
        "id": "user_test",
        "username": "测试用户",
        "email": "15640657621@163.com",
        "phone": None,
        "password": "Zxx995958657",
        "avatar": None,
        "createdAt": "2024-01-01T00:00:00"
    }
}


@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    user_id = f"user_{len(MOCK_USERS) + 1}"
    created_at = datetime.utcnow().isoformat()
    
    MOCK_USERS[user_id] = {
        "id": user_id,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "password": user.password,
        "createdAt": created_at
    }
    
    return UserResponse(
        id=user_id,
        username=user.username,
        email=user.email,
        phone=user.phone,
        createdAt=created_at
    )


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    for user_data in MOCK_USERS.values():
        if user.email and user_data.get("email") == user.email and user_data.get("password") == user.password:
            access_token = create_access_token({
                "sub": user_data["id"],
                "username": user_data["username"],
                "email": user_data.get("email"),
                "phone": user_data.get("phone"),
                "avatar": user_data.get("avatar"),
                "createdAt": user_data.get("createdAt")
            })
            return Token(access_token=access_token, token_type="bearer")
        
        if user.phone and user_data.get("phone") == user.phone and user_data.get("password") == user.password:
            access_token = create_access_token({
                "sub": user_data["id"],
                "username": user_data["username"],
                "email": user_data.get("email"),
                "phone": user_data.get("phone"),
                "avatar": user_data.get("avatar"),
                "createdAt": user_data.get("createdAt")
            })
            return Token(access_token=access_token, token_type="bearer")
    
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/send-code")
async def send_verification_code(phone: str):
    return {"message": "Verification code sent", "code": "123456"}


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user


@router.get("/github")
async def github_login():
    return {"url": "https://github.com/login/oauth/authorize"}


@router.post("/github/callback")
async def github_callback(code: str):
    access_token = create_access_token({
        "sub": "github_user",
        "username": "GitHub User",
        "avatar": "https://github.com/identicons/default.png",
        "createdAt": datetime.utcnow().isoformat()
    })
    return Token(access_token=access_token, token_type="bearer")
