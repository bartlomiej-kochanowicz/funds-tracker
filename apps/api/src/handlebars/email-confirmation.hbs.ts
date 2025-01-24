export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #16a34a;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .heading {
            margin-top: 0px;
        }
        .logo {
            height: 50px;
        }
        .content {
            background-color: #f4f4f5;
            padding: 20px;
            border-radius: 5px;
        }
        .link {
            color: #16a34a;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            background-color: #e0e0e0;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img class="logo" src="https://www.funds-tracker.com/favicon.svg" alt="Funds Tracker logo"/>
            <h1 class="heading">Confirm Your Account</h1>
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>Thank you for signing up to <a class="link" href="https://funds-tracker.com">Funds Tracker</a>! To complete your registration, please use the following confirmation code:</p>
            <div class="code">{{code}}</div>
            <p>Enter this code on our website to verify your email address and activate your account.</p>
            <p>If you didn't request this email, please ignore it or contact our support team if you have any concerns.</p>
            <p>Best regards,<br>Funds Tracker App Team</p>
        </div>
        <div class="footer">
            <p>This email was sent to <strong>{{email}}</strong>. If you have any questions, please contact us at <strong>support@funds-tracker.com</strong></p>
            <p>© Funds Tracker 2025. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
