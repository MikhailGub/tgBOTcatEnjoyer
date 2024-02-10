module.exports = {
    statListenerOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Win', callback_data: 'Win'}, {text: 'Lose', callback_data: 'Lose'}]
            ]
        })
    },    
    againOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть ещё раз', callback_data: '/again'}]
            ]
        })
    }
}