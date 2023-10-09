const mongoose = require('mongoose');

const subscriptions = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    articleCount: {
        type: Number,
        required: true
    }
},
    {
        timestamps: false
})

subscriptions.methods.toSubscriptionResponse=function () {
    return{
        title : this.title,
        status : this.status,
        price : this.price,
        articleCount : this.articleCount        
    }
};

subscriptions.methods.toSubscriptionJSON = function () {
    return{
        title : this.title,
        status : this.status,
        price : this.price,
        articleCount : this.articleCount        
    }
};

module.exports = mongoose.model('Subscriptions', subscriptions)