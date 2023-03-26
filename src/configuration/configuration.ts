export default () => ({
  appSettings: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  chatGptSettings: {
    apiKey: process.env.CHAT_GPT_API_KEY,
  },
});
