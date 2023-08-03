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
            Theme: ${theme},
            Mood: ${mood},
            Rhyme: ${rhyme},
            Lyrics: ${lyrics}
            Where the value is anything, you can just replace it with anything thats suitable.

            And give the response in the following JSON format
            {
                "title": "title of the song",
                "story": "song"
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

export default fetchSong