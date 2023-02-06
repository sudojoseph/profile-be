const axios = require('axios');

class MessageTelegram {
    constructor(telegramToken, chatId) {
        this.telegramToken = telegramToken;
        this.chatId = chatId;
    };

    sendMessage = async (message) => {
        const response = await axios.get(`https://api.telegram.org/bot${this.telegramToken}/sendMessage?chat_id=${this.chatId}&text=${message}`);
        return(response);
    };

};

module.exports = MessageTelegram;