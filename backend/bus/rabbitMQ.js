const amqp = require('amqplib/callback_api');
const { User } = require('../models/user');
const { Consulta } = require('../models/consulta');
const { Mensaje } = require('../models/mensaje');

amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
  if (error0) {
    console.error('Error connecting to RabbitMQ:', error0);
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      console.error('Error creating channel:', error1);
      throw error1;
    }

    const userQueue = 'userQueue';
    const consultaQueue = 'consultaQueue';
    const mensajeQueue = 'mensajeQueue';

    channel.assertQueue(userQueue, {
      durable: false
    });

    channel.assertQueue(consultaQueue, {
      durable: false
    });

    channel.assertQueue(mensajeQueue, {
      durable: false
    });

    console.log(`Waiting for messages in ${userQueue}, ${consultaQueue}, and ${mensajeQueue}. To exit press CTRL+C`);

    channel.consume(userQueue, async (msg) => {
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

    channel.consume(consultaQueue, async (msg) => {
      console.log(`Received ${msg.content.toString()}`);
      const consulta = JSON.parse(msg.content.toString());

      try {
        await Consulta.create(consulta);
        console.log('Consulta added to database');
      } catch (error) {
        console.error('Error adding consulta to database:', error);
      }
    }, {
      noAck: true
    });

    channel.consume(mensajeQueue, async (msg) => {
      console.log(`Received ${msg.content.toString()}`);
      const mensaje = JSON.parse(msg.content.toString());

      try {
        await Mensaje.create(mensaje);
        console.log('Mensaje added to database');
      } catch (error) {
        console.error('Error adding mensaje to database:', error);
      }
    }, {
      noAck: true
    });
  });
});