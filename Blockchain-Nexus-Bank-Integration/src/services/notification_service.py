import logging
import smtplib
from email.mime.text import MIMEText

class NotificationService:
    def __init__(self):
        self.logger = self.setup_logger()
        self.smtp_server = "smtp.example.com"
        self.smtp_port = 587
        self.smtp_user = "your_email@example.com"
        self.smtp_password = "your_password"

    def setup_logger(self):
        logger = logging.getLogger("NotificationService")
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler("notification_service.log")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger

 def send_email(self, recipient, subject, body):
        self.logger.info(f"Sending email to {recipient}")
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = self.smtp_user
        msg['To'] = recipient

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.smtp_user, self.smtp_password)
            server.sendmail(self.smtp_user, recipient, msg.as_string())
            self.logger.info(f"Email sent to {recipient}")

# Example usage
if __name__ == "__main__":
    notification_service = NotificationService()
    notification_service.send_email("user@example.com", "KYC Status Update", "Your KYC has been successfully verified.")
