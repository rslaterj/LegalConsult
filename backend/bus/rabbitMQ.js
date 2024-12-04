const amqp = require('amqplib/callback_api');
const { User } = require('../models/user');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'userQueue';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (msg) => {
      console.log(`Received ${msg.content.toString()}`);
      const user = JSON.parse(msg.content.toString());

      try {
        await User.create(user);
        console.log('User added to database');
      } catch (error) {
        console.error('Error adding user to database:', error);
      }
    }, {
      noAck: true
    });
  });
});