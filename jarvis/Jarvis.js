require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


class Jarvis {
  openai = new OpenAIApi(configuration);
  // constructor();

  askQuestion = async (question) => {
    try {
      const answer = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${process.env.JARVIS_TRAINING_QUESTIONS}${question}?`,
        temperature: 0.47,
        max_tokens: 733,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " Jarvis:"],
      });
      return answer.data;
    } catch (error) {
        return error;
    }
  }
}

module.exports = Jarvis;