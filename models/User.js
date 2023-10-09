const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const { Int32 } = require('mongodb');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
        unique: true
        
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
   
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favouriteArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]


},
    
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

// @desc generate access token for a user
// @required valid email and password
userSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    return accessToken;
}

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        password: this.password,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateAccessToken()
    }
};

userSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        password: this.password,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUserId of this.following) {
        if (followingUserId.toString() === idStr) {
            return false;
        }
    }
    return true;
};

userSchema.methods.unfollow = function (id) {
    const index = this.following.indexOf(id);
    if (index !== -1) {
        this.following.splice(index, 1);
    }
    return this.save();
};

userSchema.methods.isFavourite = function (id) {
    return this.favouriteArticles.includes(id);
};

userSchema.methods.favorite = function (id) {
    if (!this.favouriteArticles.includes(id)) {
        this.favouriteArticles.push(id);
    }
    return this.save();
};

userSchema.methods.unfavorite = function (id) {
    const index = this.favouriteArticles.indexOf(id);
    if (index !== -1) {
        this.favouriteArticles.splice(index, 1);
    }
    return this.save();
};
module.exports = mongoose.model('User', userSchema);
