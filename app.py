from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

app = Flask(__name__, template_folder='.', static_folder='.')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/submit-order', methods=['POST'])
def submit_order():
    data = request.json
    
    # Send email notification
    try:
        send_email_notification(data)
        return jsonify({
            'status': 'success',
            'message': 'Order submitted successfully! Email sent.',
            'order_id': datetime.now().strftime('%Y%m%d%H%M%S')
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Order received but email failed: {str(e)}'
        })

def send_email_notification(data):
    sender_email = "your-email@gmail.com"  # Replace with your Gmail
    sender_password = "your-app-password"   # Replace with Gmail App Password
    receiver_email = "rafrosetithy@gmail.com"
    
    message = MIMEMultipart("alternative")
    message["Subject"] = "New Order Submission - Priothy"
    message["From"] = sender_email
    message["To"] = receiver_email
    
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px;">New Order Received</h2>
          <p style="color: #666; font-size: 14px;">Order Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Customer Information:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Shipping Address:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">{data.get('shipping_address', 'N/A')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">{data.get('phone', 'N/A')}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">{data.get('email', 'N/A')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Product Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">{data.get('product', 'N/A')}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 15px; background: #667eea; color: white; border-radius: 5px; text-align: center;">
            <p style="margin: 0; font-size: 16px;">Thank you for using Priothy!</p>
          </div>
        </div>
      </body>
    </html>
    """
    
    part = MIMEText(html, "html")
    message.attach(part)
    
    # Send email using Gmail SMTP
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())

@app.route('/api/products', methods=['GET'])
def get_products():
    products = [
        {'id': 1, 'name': 'Lavender Luxury Soap', 'price': 4000, 'image': 'c3.png'},
        {'id': 2, 'name': 'Elegant Silk Scarf', 'price': 3000, 'image': 'c2.png'},
        {'id': 3, 'name': 'Artisan Soap Collection', 'price': 3000, 'image': 'c4.png'}
    ]
    return jsonify(products)

# Configuration instructions:
# 1. Enable 2-Step Verification in your Google Account
# 2. Generate App Password: https://myaccount.google.com/apppasswords
# 3. Replace 'your-email@gmail.com' and 'your-app-password' above

if __name__ == '__main__':
    app.run(debug=True, port=5000)
