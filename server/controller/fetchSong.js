import { Configuration, OpenAIApi } from "openai"
import 'dotenv/config'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const fetchSong = async(req, res) =>{
    try {
        const objects = req.body.objects
        const genre = req.body.genre
        const mood = req.body.mood
        const lyrics = req.body.lyrics
        const theme = req.body.theme
        const rhyme = req.body.rhyme
        const songType = req.body.songType

        const prompt = `
            write me a song for me with the following details:-
            Type: ${songType}
            Objects present in the song: ${objects},
            Genre: ${genre},
            Where the value is anything, you can just replace it with anything thats suitable.

            And give the response in the following JSON format
            {
                "title": "title of the song",
                "data": "song"
            }

        `;

        const prompt2 = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }
        `

        const chatCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens:2048 ,
            temperature: 0,
            prompt: prompt2
        });

        res.json(chatCompletion.data.choices[0].text)
    } catch (error) {
        console.log(error)
    }
}

export default fetchSong