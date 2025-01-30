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

      <div style="display: block;margin: 0;color: rgb(255, 255, 255);font-size: 20px;padding: 24px;text-align: center;background-color: rgb(52, 52, 52);border-radius: 6px;margin-bottom: 4px;">Complete registration</div>

      <div style="margin: 0;margin-top: 8px;padding: 24px;background-color: rgb(255, 255, 255);border-radius: 6px;text-align: center;font-size: 14px;">
        <p>Hello {{name}},</p>
        <p style="margin: 0;display: block;text-align: center;font-size: 14px;">
          <b style="margin: 0;">Please enter this confirmation code in the window
          </b>

          where you started creating your account:
        </p>

        <span style="margin: 32px 0;display: block;width: 100%;padding: 24px;background-color: rgb(222, 225, 227);border-radius: 6px;font-weight: 600;font-size: 36px;text-align: center;box-sizing: border-box;">
          {{code}}
        </span>

        <p style="margin: 0;display: block;text-align: center;font-size: 14px;margin-bottom: 8px;">
          <b style="margin: 0;">Why do I have to confirm my email?</b>
        </p>

        <p style="margin: 0;display: block;text-align: center;font-size: 14px;margin-bottom: 8px;">
          Confirming your email address certifies that you are the owner of this account. Without it, you not be able to use Funds Tracker until your account is confirmed.
        </p>

        <p style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">
          You received this email because you have signed up for <a href="https://funds-tracker.com/">Funds Tracker</a> - the platform to track and manage your funds.
        </p>
      </div>

      <p style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">
        This email was sent to <a href="mailto:{{email}}" style="margin: 0;">{{email}}</a> because you are a registered Funds Tracker user.
      </p>

      <p style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">© Funds Tracker 2025. All rights reserved.</p>
    </div>
  </body>
</html>
`;
