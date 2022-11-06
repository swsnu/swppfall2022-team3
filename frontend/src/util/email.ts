import { EmailJSResponseStatus, init, send } from 'emailjs-com';


const userId = "9WyiS5CMeqEq9CpWW";
const serviceId = "service_10yj9og";
const templateId = "template_iu54ipr";
let isInitialized = false;

const initialize = () => {
  init(userId);
  isInitialized = true;
};

export const sendVerificationCode = async (targetEmail: string, verificationCode: number | string): Promise<EmailJSResponseStatus> => {
  if (!isInitialized)
    initialize();
  const templateParams = {
    target_email: targetEmail,
    verification_code: verificationCode,
  }
  return await send(serviceId, templateId, templateParams, userId);
}

export default {
  sendVerificationCode,
}
