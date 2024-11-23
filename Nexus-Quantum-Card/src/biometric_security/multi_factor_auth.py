import random
import smtplib
from email.mime.text import MIMEText

class MultiFactorAuth:
    def __init__(self, email_service):
        self.email_service = email_service

    def send_otp(self, email):
        """
        Send a one-time password (OTP) to the user's email.
        
        :param email: User's email address.
        :return: The generated OTP.
        """
        otp = random.randint(100000, 999999)
        self.email_service.send_email(email, otp)
        return otp

    def verify_otp(self, user_input, otp):
        """
        Verify the one-time password entered by the user.
        
        :param user_input: OTP entered by the user.
        :param otp: The generated OTP.
        :return: True if the OTP is correct, False otherwise.
        """
        return user_input == otp

class EmailService:
    def __init__(self, smtp_server, smtp_port, username, password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password

    def send_email(self, recipient, otp):
        """
        Send an email containing the OTP to the recipient.
        
        :param recipient: Email address of the recipient.
        :param otp: The one-time password to send.
        """
        msg = MIMEText(f"Your OTP is: {otp}")
        msg['Subject'] = 'Your One-Time Password'
        msg['From'] = self.username
        msg['To'] = recipient

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)

if __name__ == "__main__":
    email_service = EmailService(smtp_server='smtp.example.com', smtp_port=587, username='your_email@example.com', password='your_password')
    mfa = MultiFactorAuth(email_service)

    user_email = input("Enter your email address: ")
    otp = mfa.send_otp(user_email)
    user_input = input("Enter the OTP sent to your email: ")

    if mfa.verify_otp(user_input, otp):
        print("Authentication successful!")
    else:
        print("Invalid OTP. Authentication failed.")
