export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
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
            <h1 class="heading">Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>We received a request to reset your password for your <a class="link" href="https://funds-tracker.com">Funds Tracker</a> account. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <p style="text-align: center;">
                <a href="{{passwordResetLink}}" class="button">Reset Your Password</a>
            </p>
            <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
            <p><a href="{{passwordResetLink}}" class="link">{{passwordResetLink}}</a></p>
            <p>This link will expire in 24 hours for security reasons. If you need to reset your password after that, please request a new password reset.</p>
            <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
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
