const {User, Thought} = require('../models')

const thoughtController = {
    // get thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err))
    },

    // get a thought by id
    getThought(req, res) {
        Thought.findOne({_id: req.params.id})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thought => thought ? res.json(thought) : res.status(404).json({message: 'Not Found'}))
            .catch(err => res.status(500).json(err))
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}))
            .then(thought => thought ? res.json(thought) : res.status(400).json({message: 'something went wrong'}))
            .catch(err => res.status(500).json(err))
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true})
            .then(thought => thought ? res.json(thought) : res.status(404).json({message: 'something went wrong'}))
            .catch(err => res.status(400).json(err))
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
            .then(thought => thought ? res.json({message: 'success'}) : res.status(404).json({message: 'thought with the provided ID not found'}))
            .catch(err => res.status(500).json(err))
    },

    // add a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {
                $push: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username
                    }
                }
            },
            {new: true, runValidators: true})
            .then(reaction => reaction ? res.json(reaction) : res.status(404).json({message: 'not found'}))
            .catch(err => res.status(500).json(err))
    },

    // remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {
            $pull: {
                reactions:
                    {_id: req.params.reactionId}
            }
        }, {new: true})
            .then(reaction => reaction ? res.json({message: 'reaction removed'}) : res.status(404).json({message: "reaction with this ID not found"}))
            .catch(err => res.status(404).json(err))
    }
}

module.exports = thoughtController;