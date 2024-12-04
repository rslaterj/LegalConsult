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
    const loginQueue = 'loginQueue';
    const userRoleQueue = 'userRoleQueue';

    channel.assertQueue(userQueue, {
      durable: false
    });

    channel.assertQueue(consultaQueue, {
      durable: false
    });

    channel.assertQueue(mensajeQueue, {
      durable: false
    });

    channel.assertQueue(loginQueue, {
      durable: false
    });

    channel.assertQueue(userRoleQueue, {
      durable: false
    });

    console.log(`Waiting for messages in ${userQueue}, ${consultaQueue}, ${mensajeQueue}, and ${loginQueue}. To exit press CTRL+C`);

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

    channel.consume(loginQueue, async (msg) => {
      console.log(`Received ${msg.content.toString()}`);
      const { email, password } = JSON.parse(msg.content.toString());

      try {
        const user = await User.findOne({ where: { email, password } });
        if (user) {
          console.log('User authenticated successfully');
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    }, {
      noAck: true
    });

    channel.consume(userRoleQueue, async (msg) => {
      console.log(`Received ${msg.content.toString()}`);
      const { userId } = JSON.parse(msg.content.toString());

      try {
        const userRole = await getUserRole(userId);
        console.log(`User role for userId ${userId}: ${userRole}`);
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    }, {
      noAck: true
    });
  });
});