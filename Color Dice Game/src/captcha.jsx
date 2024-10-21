import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
const Captcha = () => {
  function handleVerify(value) {
    console.log("Captcha value:", value);
  }
  return (
    <div>
      <GoogleReCaptchaProvider reCaptchaKey="6LcrkEwqAAAAAC6BkQnziYEDIobeb9uv397tNEdM">
        <GoogleReCaptcha onVerify={handleVerify} />
      </GoogleReCaptchaProvider>
    </div>
  );
};

export default Captcha;
