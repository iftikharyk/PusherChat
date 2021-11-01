const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
require('dotenv').config();

const pusher = Pusher({
    appId: process.env.pusherAppId,
    key: process.env.pusherKey,
    secret: process.env.pusherSecret,
    cluster: process.env.pusherCluster
});

router.get('/', (req, res) => {
  res.send('all good');
});

/*
Considering that we will be triggering Pusher events directly from our client, we need to implement an authentication endpoint. 
This endpoint will be called by Pusher directly in order to authenticate any subscription it receives from our front end.
Pusher will be making a POST request to an endpoint that we will provide. Therefore, let’s create a POST /pusher/auth endpoint.
Whenever Pusher calls the authentication endpoint, it sends a socket_id and channel_name that we will use to authenticate the incoming subscription.
*/
router.post('/pusher/auth', (req, res) => {
  console.log('POST to /pusher/auth');
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  console.log('auth ', auth);
  res.send(auth);
});

module.exports = router;