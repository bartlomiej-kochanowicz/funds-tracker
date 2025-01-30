export default `
<html style="margin: 0;font-size: 16px;width: 100%;">
  <head style="margin: 0;">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" style="margin: 0;">
    <meta http-equiv="x-ua-compatible" content="ie=edge" style="margin: 0;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" style="margin: 0;">

    <title style="margin: 0;">Your Funds Tracker confirmation code</title>
  </head>

  <body style="margin: 0;width: 100%;font-size: 16px;background-color: rgb(249, 249, 250);font-family: 'Roboto', sans-serif;color: rgb(52, 52, 52);">
    <div style="margin: 0 auto;max-width: 550px;width: 90%;">
        <img src="https://www.funds-tracker.com/favicon.svg" width="50" height="auto" style="display:block;margin: 0 auto;padding: 24px 0;" alt="Funds Tracker logo"/>

        <div style="display: block;margin: 0;color: rgb(255, 255, 255);font-size: 20px;padding: 24px;text-align: center;background-color: rgb(52, 52, 52);border-radius: 6px;margin-bottom: 4px;">Reset Your Password</div>

        <div style="margin: 0;margin-top: 8px;padding: 24px;background-color: rgb(255, 255, 255);border-radius: 6px;text-align: center;font-size: 14px;">
            <p>Hello {{name}},</p>
            <p>
              We received a request to reset your password for your <a class="link" href="https://funds-tracker.com">Funds Tracker</a> account. If you didn't make this request, please ignore this email.
            </p>
            <p>
              To reset your password, click the link below:
            </p>
            <p style="text-align: center;word-break: break-all;">
                <a href="{{passwordResetLink}}">{{passwordResetLink}}</a>
            </p>
            <p>
              <b>This link will expire in 24 hours for security reasons.</b>
            </p>
            <p style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">
                If you have any questions or concerns, please don't hesitate to contact our support team at <a href="mailto:support@funds-racker.com">support@funds-tracker.com</strong>
            </p>
        </div>

        <p style="display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 20px;">
            This email was sent to <a href="mailto:{{email}}" style="margin: 0;">{{email}}</a> because you are a registered Funds Tracker user.
        </p>

        <p style="text-align: center;font-size: 12px;color: rgb(152, 161, 168);">© Funds Tracker 2025. All rights reserved.</p>
    </div>
  </body>
</html>
`;
