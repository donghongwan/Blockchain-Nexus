# examples/example_notification.py

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_notification(to_email, subject, body):
    # Email configuration
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    from_email = "your_email@gmail.com"  # Replace with your email
    password = "your_email_password"  # Replace with your email password

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
        server.login(from_email, password)
        server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        print("Failed to send email:", str(e))
    finally:
        server.quit()

if __name__ == "__main__":
    # Example usage
    recipient_email = "recipient@example.com"  # Replace with recipient's email
    email_subject = "Test Notification"
    email_body = "This is a test notification from the high-tech application."

    send_email_notification(recipient_email, email_subject, email_body)
