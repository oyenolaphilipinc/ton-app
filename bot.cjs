const { Telegraf, Markup } = require('telegraf');

// Replace with your actual bot token from @BotFather
const bot = new Telegraf('7562670674:AAEhbvE0jATATyF7gWyLJL2Z0f7hqnqo8A4');

bot.start((ctx) => {
  return ctx.reply(
    'Welcome to Speedy Swap Decentralized Exchange. Swap your tokens faster and easier now',
    Markup.inlineKeyboard([
      Markup.button.webApp('Open TON App', 'https://ton-app-sigma.vercel.app')
    ])
  );
});

bot.launch();

console.log("Bot is running...");

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
