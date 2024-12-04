const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/addUser', (req, res) => {
  const user = req.body;

  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = 'userQueue';
      const msg = JSON.stringify(user);

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`Sent ${msg}`);
      res.send('User added to queue');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});