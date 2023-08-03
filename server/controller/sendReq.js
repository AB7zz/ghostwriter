import { Configuration, OpenAIApi } from "openai"
import 'dotenv/config'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const sendReq = async(req, res) =>{
    try {
        const objects = req.body.objects
        const genre = req.body.genre
        const words = req.body.words
        const type = req.body.type

        const prompt = `
            write me someting for me with the following details:-
            Type: ${type}
            Objects present in the story: ${objects},
            Genre: ${genre},
            Total word limit: ${words},

            And give the response in the following JSON format
            {
                "title": "title of the story",
                "story": "story"
            }

        `;
        const chatCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens:2048 ,
            temperature: 0,
            prompt: prompt
        });

        res.json({story: chatCompletion.data.choices[0].text})
    } catch (error) {
        console.log(error)
    }
}

export default sendReq