const express = require('express');
const router = express.Router();
const twilioModule = require('./../modules/twilio');
const debug = require('debug')('twilio:twilio-route');

/* GET home page. */
router.get('/call/:phone', function(req, res, next) {
    debug(`executing twilio route with number ${req.params.phone}`);
    twilioModule.makeCall(req.params.phone);
    res.json({success: true});
});

router.post('/defaultXml', (req, res, next) => {
    debug('generating default reponse xml');
    const twiml = twilioModule.generateDefaultTwimMLResponse();
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString())
});

module.exports = router;
