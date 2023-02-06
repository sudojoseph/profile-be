const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { response } = require('express');
const Jarvis = require('./jarvis/Jarvis.js');
const MessageTelegram = require('./messageTelegram/MessageTelegram.js');
const jarvis = new Jarvis;
const messageTelegram = new MessageTelegram(process.env.TELEGRAM_TOKEN, process.env.TELEGRAM_CHAT_ID);


app.use(express.json());
app.use(cors());

app.post('/jarvis', async(req, res) => {
    const customErrorMessage = 'Sorry my servers at Open AI seem overwelmed at the moment. Please try again a bit later. Than I can tell you all about Joseph!';
    try {
      const resp = await jarvis.askQuestion(req.body.question);
      res.send(resp);
    } catch (error) {
      response.status(500).json({message: customErrorMessage});
    }
});

app.post('/telegram', async(req, res) => {
  const responce = await messageTelegram.sendMessage(req.body.message);
  if (responce.status === 200) {
    res.status(200).json({message: 'Successfully Send!'});
  } else {
    res.status(500).json({message: 'Oops something whent wrong! Try again!'});
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});