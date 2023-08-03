import { Configuration, OpenAIApi } from "openai"
import 'dotenv/config'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const fetchStory = async(req, res) =>{
    try {
        const objects = req.body.objects
        const genre = req.body.genre
        const words = req.body.words
        const twist = req.body.twist
        const storyType = req.body.storyType

        const prompt = `
            write me a story for me with the following details:-
            Type: ${storyType}
            Objects present in the story: ${objects},
            Genre: ${genre},
            Total word limit: ${words},
            Should there be a twist? : ${twist}

            And give the response in the following JSON format
            {
                "title": "title of the story",
                "data": "story"
            }

        `;

        const prompt2 = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;
        const chatCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 2048,
            temperature: 0,
            prompt: prompt
        });

        res.json(chatCompletion.data.choices[0].text)
    } catch (error) {
        console.log(error)
    }
}

export default fetchStory