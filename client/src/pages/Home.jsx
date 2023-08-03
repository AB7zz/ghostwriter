import React from 'react'
import axios from 'axios'

const Home = () => {
  const [story, setStory] = React.useState()
  const handleImageSubmit = () =>{
    console.log('Image')
  }

  const handleTextSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target); // Get form data from the event target
      // Access individual form field values using their names
      const type = formData.get("type");
      const objects = formData.get("objects");
      const genre = formData.get("genre");
      const words = formData.get("words");
  
      console.log("Type:", type);
      console.log("Objects:", objects);
      console.log("Genre:", genre);
      console.log("Words:", words);

      const res = await axios.post('http://localhost:5000/gapi/sendReq', {objects, genre, words, type})
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
        <input type="text" placeholder="objects" name="objects" />
        <input type="text" placeholder="genre" name="genre" />
        <input type="number" placeholder="world limit" name="words" />
        <select name="type" id="">
          <option value="short story" selected>Short story</option>
          <option value="movie" selected>Movie</option>
          <option value="song" selected>Song</option>
        </select>
        <button type="submit" className='bg-blue-500 text-white px-3 py-2 rounded'>Submit</button>
        {story && <>
          <h1 className='text-xl font-bold'>{story.title}</h1>
          <p className='text-lg'>{story.story}</p>
        </>}
      </form>
    </>
  )
}

export default Home