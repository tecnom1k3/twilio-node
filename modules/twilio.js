'use strict';

const client = require('twilio')(process.env.SID, process.env.AUTH_TOKEN);
const debug = require('debug')('twilio:twilio-module');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const twilioModule = (() => {

    const fromNumber = process.env.FROM_NUMBER;

    const makeCall = (toNumber) => {
        debug(`executing makeCall method to number ${toNumber}`);

        try {
            client.calls
                .create({
                    url: `${process.env.LOCAL_URL}/twilio/defaultXml`,
                    to: toNumber,
                    from: fromNumber
                })
                .then(call => debug(`call SID: ${call.sid}`));
        } catch (e) {
            debug(`exception: ${e.toString()}`);
        }
    };

    const generateDefaultTwimMLResponse = () => {
        const twiml = new VoiceResponse();
        twiml.say({
            voice: 'man',
            language: 'en'
        },'Hello from your pals at Twilio! Have fun.');
        twiml.play('http://demo.twilio.com/docs/classic.mp3');
        return twiml;
    };

    return {
        makeCall,
        generateDefaultTwimMLResponse
    }

})();

module.exports = twilioModule;