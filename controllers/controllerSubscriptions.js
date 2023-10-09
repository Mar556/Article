const Subscription = require('../models/subscriptions');
const asyncHandler = require('express-async-handler');


const addSubscription = asyncHandler(async (req, res) => {
    const title = req.body.title;
    const status = req.body.status;
    const price = req.body.price;
    const articleCount = req.body.articleCount;

    // confirm data
    if (!title || !status || !price || !articleCount) {
        return res.status(400).json({message: "All fields are required"});
    }

    const subsObject={
        "title":title,
        "status":status,
        "price":price,
        "articleCount":articleCount
    }


    const createSubscription = await Subscription.create(subsObject);

    if (createSubscription) { // subscription object created successfully
        res.status(201).json({
            subscription: createSubscription.toSubscriptionResponse()
        })
    } else {
        res.status(422).json({
            errors: {
                body: "Unable to create a subscription"
            }
        });
    }
});

const updateSubscription=asyncHandler(async(req,res)=>{
    const title = req.body.title;
    const status = req.body.status;
    const price = req.body.price;
    const articleCount = req.body.articleCount;

    const update=await Subscription.findById(req.params.id).exec();

    if (title){
        update.title=title;
    }
    if (status){
        update.status=status;
    }
    if (price){
        update.price=price;
    }
    if (articleCount){
        update.articleCount=articleCount;
    }

    await update.save();

    return res.status(200).json({
        subscription:update.toSubscriptionResponse()
    });
});

const deleteSubscription=asyncHandler(async(req,res)=>{
    const deleted=await Subscription.findByIdAndDelete(req.params.id);
    res.send(`Subscription "${deleted.title}" has been deleted..`)
});

const showSubscriptions=asyncHandler(async(req,res)=>{
    const data = await Subscription.find();
    return res.status(200).json({
        subscription:data
    });
});

const showById=asyncHandler(async(req,res)=>{
    const data = await Subscription.findById(req.params.id);
    return res.status(200).json({
        subscription:data
    });
});


module.exports = {
    addSubscription,
    updateSubscription,
    deleteSubscription,
    showSubscriptions,
    showById
}