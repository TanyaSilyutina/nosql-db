const router = require('express').Router()
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController')

router
.route('/')
.get(getThoughts)
.post(createThought);

router
.route('/:id')
.get(getThought)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(createReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;