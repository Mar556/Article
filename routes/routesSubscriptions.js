const express = require('express');

const router = express.Router();

const subscriptions = require('../models/subscriptions');
const subsController = require('../controllers/controllerSubscriptions');


router.post('/subs', subsController.addSubscription);

router.put('/subs/:id',subsController.updateSubscription);

router.delete('/subs/:id',subsController.deleteSubscription);

router.get('/subs/all',subsController.showSubscriptions);

router.get('/subs/:id',subsController.showById);

module.exports = router;
module.exports = subscriptions;