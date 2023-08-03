import { Configuration, OpenAIApi } from "openai"
import 'dotenv/config'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const fetchMovie = async(req, res) =>{
    try {
        const objects = req.body.objects
        const genre = req.body.genre
        const words = req.body.words
        const twist = req.body.twist

        const prompt = `
            write me a movie and an approriate title for me with the following details:-
            Objects present in the story: ${objects},
            Genre: ${genre},
            Total word limit: ${words},
            Should there be a twist? : ${twist}

            And give the response in the following JSON format. And in the story, insert a \\n every 20 words to represent a line break and then continue without any line breaks/gaps
            {
                "title": "title of the movie",
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

        console.log(chatCompletion.data.choices[0].text)
        res.json(chatCompletion.data.choices[0].text)
    } catch (error) {
        console.log(error)
    }
}

export default fetchMovie