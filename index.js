const TelegramApi = require('node-telegram-bot-api');

const token = '6572216730:AAEZRw-X3IV6d75J2AgUhlx229nPKtsuEG8';
const {statListenerOptions, againOptions} = require('./options');
const bot = new TelegramApi(token, {polling: true});

const chats = {};



const startStatListener = async (chatId) => {
    await bot.sendMessage(chatId, `Есть 2 стула...`, statListenerOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/stat', description: 'Стата'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/kishku/kishku_012.webp?v=1706960706')
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот с какой-то статой')
        }
    
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/stat') {
            return startStatListener(chatId)
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй ещё раз!`)
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startStatListener(chatId)
        }
        if (data === 'Win') {
            return bot.sendMessage(chatId, `Следующий пункт`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Проёбано`, againOptions)
        }
    })  
}

start();