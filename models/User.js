const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username:
            {
                type: String,
                unique: true,
                required: true,
                trim: true
            },
        email:
            {
                type: String,
                required: true,
                unique: false,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
        thoughts:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            }],
        friends:
            [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
