const mongoose = require('mongoose');
const { Schema, Types, model } = require('mongoose')

const reactionSchema = new mongoose.Schema(
    {
        reactionId:
            {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
            },
        reactionBody:
            {
                type: String,
                required: true,
                maxLength: 280,
            },
        username:
            {
                type: String,
                required: true,
            },
        createdAt:
            {
                type: Date,
                default: Date.now,
                get: (timestamp) => new Date(timestamp).toISOString()
            }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)


const thoughtSchema = new mongoose.Schema(
    {
        thoughtText:
            {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280
            },
        createdAt:
            {
                type: Date,
                default: Date.now,
                get: (timestamp) => new Date(timestamp).toISOString(),
            },
        username:
            {
                type: String,
                required: true,
            },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
