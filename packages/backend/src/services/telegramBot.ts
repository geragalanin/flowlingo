import { Telegraf, Markup } from 'telegraf';

export async function initTelegramBot(): Promise<Telegraf> {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const MINI_APP_URL = process.env.MINI_APP_URL || 'http://localhost:5173/';

    if (!BOT_TOKEN) {
        throw new Error('Missing TELEGRAM_BOT_TOKEN environment variable');
    }

    const bot = new Telegraf(BOT_TOKEN);

    bot.start(async (ctx) => {
        const text = 'Welcome! Tap the button to open the Mini App.';
        await ctx.reply(
            text,
            Markup.inlineKeyboard([[Markup.button.webApp('Open Mini App', MINI_APP_URL)]]),
        )
    })

    try {
        await bot.telegram.setChatMenuButton({
            menuButton: {
                type: 'web_app',
                text: 'Open Mini App',
                web_app: { url: MINI_APP_URL },
            },
        })
    } catch (err) {
        console.warn('Failed to set chat menu button:', err);
    }

    await bot.launch();
    console.log('Telegram bot launched');

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    return bot;
}
