const TelegramApi = require('node-telegram-bot-api');

const token = '6572216730:AAEZRw-X3IV6d75J2AgUhlx229nPKtsuEG8';

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}],
            [{text: '2', callback_data: '2'}],
            [{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Получить информацию о пользователе'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/kishku/kishku_012.webp?v=1706960706')
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот любителя котиков')
        }
    
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её отгадать`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, `Отгадывайте число, пожалуйста!`, gameOptions);
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй ещё раз!`)
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);
    })
}

start();