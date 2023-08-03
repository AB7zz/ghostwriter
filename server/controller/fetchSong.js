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
        const songType = req.body.songType

        const prompt = `
            write me a song along with a good title for me with the following details:-
            Type: ${songType}
            Objects present in the song: ${objects},
            Genre: ${genre}

            And give the response in the following JSON format. And wherever there is a line break, replace it with \\n. And if there is any gap between verses and choruses, replace it with \\n
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
            prompt: prompt
        });

        console.log(chatCompletion.data.choices[0].text)
        res.json(chatCompletion.data.choices[0].text)
    } catch (error) {
        console.log(error)
    }
}

export default fetchSong