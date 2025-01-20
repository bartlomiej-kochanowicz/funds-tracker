"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="margin: 0;font-size: 16px;width: 100%;">
  <head style="margin: 0;">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" style="margin: 0;">
    <meta http-equiv="x-ua-compatible" content="ie=edge" style="margin: 0;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" style="margin: 0;">

    <title style="margin: 0;">Your Funds Tracker confirmation code</title>
  </head>

  <body style="margin: 0;width: 100%;font-size: 16px;background-color: rgb(249, 249, 250);font-family: 'Roboto', sans-serif;color: rgb(52, 52, 52);">
    <div class="wrapper" style="margin: 0 auto;max-width: 550px;width: 90%;">
      <div class="wrapper__image" style="margin: 0 auto;width: 400px;height: auto;">
        <a href="https://funds-tracker.com/" style="margin: 0;">
          <img class="header-image" src="https://lh3.googleusercontent.com/pw/AL9nZEXiwz6WYifZ5BySv6Gl1TS8189cgocc2HuM3_7nhDglK6aIHdsZ8Mb3UQIUAC_VuoZcml7HvfVfh5bF8dMsWs84HbXnFd5yLunGrg42kcFuhGsimwph7pfBG1yabWLGnFsIwqHsXquw-b1NkVAHSeu4Yw=w1800-h155-no?authuser=0" style="margin: 0;width: 400px;height: auto;padding: 24px 0;">
        </a>
      </div>

      <div class="wrapper__heading" style="margin: 0;display: block;color: rgb(255, 255, 255);font-size: 20px;padding: 24px;text-align: center;background-color: rgb(52, 52, 52);border-radius: 6px;margin-bottom: 4px;">Reset pasword</div>

      <div class="content-wrapper" style="margin: 0;margin-top: 4px;padding: 24px;background-color: rgb(255, 255, 255);border-radius: 6px;">
        <p class="content-wrapper__paragraph" style="margin: 0;display: block;text-align: center;font-size: 14px;">
          <b style="margin: 0;">Hello {{name}}</b>

          <br style="margin: 0;">
          <br style="margin: 0;">

          There was recently a request to change the password on your account. If you requested this password change, please click the button below to set a new password within 24 hours:
        </p>

        <span class="content-wrapper__code" style="margin: 32px 0;display: block;width: 100%;padding: 24px;background-color: rgb(222, 225, 227);border-radius: 6px;font-weight: 600;font-size: 36px;text-align: center;box-sizing: border-box;">
          <a href="{{resetPasswordLink}}" class="content-wrapper__button" style="margin: 0;display: block;border: none;text-decoration: none;cursor: pointer;font-size: 1rem;background-color: #3F8CFF;color: #ffffff;padding: 0.5rem 1.25rem;font-weight: 400;border-radius: 6.25rem;">
            Click here to change your password
          </a>
        </span>

        <p class="content-wrapper__paragraph margin-bottom" style="margin: 0;display: block;text-align: center;font-size: 14px;margin-bottom: 8px;">
          If the button above isn’t working, paste the link below into your browser:
        </p>

        <a href="{{resetPasswordLink}}" class="content-wrapper__paragraph margin-bottom color-blue" style="margin: 0;display: block;text-align: center;font-size: 14px;margin-bottom: 8px;color: #3F8CFF;">
          {{resetPasswordLink}}
        </a>

        <a class="content-wrapper__paragraph-small" style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">
          If you don't want to change your password, just ignore this message.

      </a></div>

      <p class="content-wrapper__paragraph-small" style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">
        This email was sent to <a href="mailto:{{email}}" class="color-blue" style="margin: 0;color: #3F8CFF;">{{email}}</a> because you are a registered Funds Tracker user.
      </p>

      <p class="content-wrapper__paragraph-small" style="margin: 0;display: block;text-align: center;font-size: 12px;color: rgb(152, 161, 168);margin-top: 40px;">© 2023 Funds Tracker</p>
    </div>
  </body>
</html>
`;
//# sourceMappingURL=reset-password.hbs.js.map