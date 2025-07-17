const axios = require('axios');

const callGemini = async (question) => {
    const prompt = `
    Given the following list of questions from an audience, group
    them if they are similar, and return a sorted list with the most frequently
    asked or relevant questions summarized:

    ${question.map(
        (ques, index) => `${index + 1}. ${ques.content}`
    ).join('\n')}

    Respond with only the summarized list, one per line.
`;


    const response = await axios.post(url, 
        {
            contents: [{
                parts: [{ text: prompt }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            }
        }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.split('\n').filter(line => line.trim() !== '');
};

module.exports = { callGemini };

//Example Question format that we want to send in the request to Gemini API
//1.What is MERN.
//2.What is React.
//3.What is Node.js.
//4.What is Express.js.