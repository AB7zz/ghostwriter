import express from 'express';
import fetchStory from '../controller/fetchStory.js'
import fetchSong from '../controller/fetchSong.js'

const router = express.Router()

router.post('/story', fetchStory)
router.post('/song', fetchSong)

export default router