const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateMaterialList = async (projectDescription) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-004",
      prompt: `Generate a detailed list of roofing materials needed for the following project: ${projectDescription}`,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating material list with GPT-4:", error);
    throw error;
  }
};

module.exports = {
  generateMaterialList,
};