const {User, Thought} = require('../models')

const userController = {
    // get users
    getUsers(req, res) {
        User.find({})
            .populate({path: 'thoughts', select: '-__v'})
            .select('-__v')
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err))
    },

    // get a user
    getUser(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .populate({path: 'thoughts', select: '-__v', populate: {path: 'reactions'}})
            .select('-__v')
            .then(user => user ? res.json(user) : res.status(404).json({
                message: "User with the provided ID not found"
            }))
            .catch(err => res.status(404).json(err))
    },

    // add a new user
    createUser(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email
        })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err))
    },

    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true})
            .then(user => user ? res.json(user) : res.status(404).json({
                message: "user with the provided ID not found"
            }))
            .catch(err => res.status(400).json(err))
    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.id})
            .then(user => {
                if (!user) {
                    return res.status(404).json({message: 'Not found'})
                }
                Thought.deleteMany({username: req.body.username})
                    .then(data => data ? res.json({message: 'success'}) : res.status(404).json({message: 'Not found'}))
            })
            .catch(err => res.status(400).json(err))
    },
}

module.exports = userController;