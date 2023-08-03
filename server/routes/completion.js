import express from 'express';
import fetchStory from '../controller/fetchStory.js'
import fetchSong from '../controller/fetchSong.js'
import fetchMovie from '../controller/fetchMovie.js';

const router = express.Router()

router.post('/story', fetchStory)
router.post('/song', fetchSong)
router.post('/movie', fetchMovie)

export default router