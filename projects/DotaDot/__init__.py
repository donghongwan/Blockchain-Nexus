# src/__init__.py

# Import necessary modules and services
from .main import start_application
from .services.user_service import UserService
from .services.transaction_service import TransactionService
from .services.ai_service import AIService
from .services.oracle_service import OracleService

# Initialize services
user_service = UserService()
transaction_service = TransactionService()
ai_service = AIService()
oracle_service = OracleService()

# Package version
__version__ = "0.1.0"
