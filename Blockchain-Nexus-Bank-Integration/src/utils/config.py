import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    """Configuration class to hold application settings."""
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///default.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")
    DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

# Example usage
if __name__ == "__main__":
    print("Database URL:", Config.DATABASE_URL)
    print("Secret Key:", Config.SECRET_KEY)
    print("Debug Mode:", Config.DEBUG)
    print("Log Level:", Config.LOG_LEVEL)
