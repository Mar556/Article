const mongoose = require('mongoose');
const User = require("./User");

const commentSchema = new mongoose.Schema({
    likes: {
        type: Number,
        default: 9
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    articles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
},
    {
        timestamps: true
    });


commentSchema.methods.toCommentResponse = async function (user) {
    const authorObj = await User.findById(this.author).exec();
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: authorObj.toProfileJSON(user)
    }
};

module.exports = mongoose.model('Comment', commentSchema);
