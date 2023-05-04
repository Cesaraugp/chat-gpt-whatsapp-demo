export default () => ({
  appSettings: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  chatGptSettings: {
    apiKey: process.env.CHAT_GPT_API_KEY,
  },
  whatsAppSettings: {
    version: process.env.WH_VERSION,
    phoneNumberId: process.env.WH_PHONE_NUMBER_ID,
    apiKey: process.env.WH_API_KEY,
  },
});
