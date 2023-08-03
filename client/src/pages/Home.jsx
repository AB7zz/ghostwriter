import React from 'react'
import axios from 'axios'

const Home = () => {
  const [story, setStory] = React.useState()
  const [type, setType] = React.useState('story')
  const [objects, setObjects] = React.useState('')

  // Song 
  const [genre, setGenre] = React.useState('anything')
  const [mood, setMood] = React.useState('anything')
  const [lyrics, setLyrics] = React.useState('anything')
  const [theme, setTheme] = React.useState('anything')
  const [rhyme, setRhyme] = React.useState('anything')
  const [songType, setSongType] = React.useState('anything')
  // Song 


  // Short Story
  const [storyType, setStoryType] = React.useState('')
  const [twist, setTwist] = React.useState('')
  const [words, setWords] = React.useState(100)
  // Short Story

  const handleImageSubmit = () =>{
    console.log('Image')
  }

  const handleTextSubmit = async(e) => {
    try {
      e.preventDefault()

      let res
  
      if(type == "story"){
        console.log(objects, genre, words, storyType, twist)
        res = await axios.post('http://localhost:5000/gapi/story', {objects, genre, words, twist, storyType})
      }else if(type == "song"){
        res = await axios.post('http://localhost:5000/gapi/song', {objects, genre, mood, lyrics, theme, rhyme, songType})
      }

      if(res.data.story){
        setStory(JSON.parse(res.data.story))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form className='px-5 py-5' onSubmit={handleImageSubmit}>
        <input type="file" name="image" id="image" />
        <button type="submit" className='bg-blue-500 text-white px-3 py-2 rounded'>Submit</button>
      </form>
      <p className='text-center text-3xl font-bold'>OR</p>
      <form className='px-5 py-5' onSubmit={e => handleTextSubmit(e)}>
        <input className='border-2 rounded px-3 py-2 ml-5' onChange={e => setObjects(e.target.value)} type="text" placeholder="objects" name="objects" />
        <select className='border-2 rounded px-3 py-2 ml-5' onChange={e => setType(e.target.value)} name="type" id="">
          <option value="story" selected>Story</option>
          <option value="movie">Movie</option>
          <option value="song">Song</option>
        </select>
        {
          type == "song" ? 
          <>
            <select className='border-2 rounded px-3 py-2 ml-5' onChange={e => setSongType(e.target.value)} name="type" id="">
              <option value="rap" selected>Rap</option>
              <option value="pop">Pop</option>
              <option value="folk">Folk</option>
            </select>
            <input onChange={e => setGenre(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="genre" name="genre" />
            <input onChange={e => setMood(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="Mood" name="mood" />
            <input onChange={e => setTheme(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="Theme" name="theme" />
            <input onChange={e => setLyrics(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="Lyrics Style" name="lyrics" />
            <input onChange={e => setRhyme(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="Rhyme Scheme" name="rhyme" />
            <button type="submit" className='bg-blue-500 text-white px-3 py-2 rounded'>Submit</button>
          </>
          : type == "story" ? 
          <>
            <select onChange={e => setStoryType(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' name="type" id="">
              <option value="poem" selected>Poem</option>
              <option value="short story">Short Story</option>
              <option value="roleplay">Roleplay</option>
            </select>
            <input onChange={e => setGenre(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="text" placeholder="genre" name="genre" />
            <input onChange={e => setWords(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' type="number" placeholder="word limit" name="word" />
            <select onChange={e => setTwist(e.target.value)} className='border-2 rounded px-3 py-2 ml-5' name="type" id="">
              <option value="">--Do you want a Twist?--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <button type="submit" className='bg-blue-500 text-white px-3 py-2 rounded'>Submit</button>
          </>
          : <></>
        }
        {
          story && 
          <>
            <h1 className='text-xl font-bold'>{story.title}</h1>
            <p className='text-lg'>{story.story}</p>
          </>
        }
      </form>
    </>
  )
}

export default Home