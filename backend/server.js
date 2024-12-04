const express = require('express');
const cors = require('cors');
const amqp = require('amqplib/callback_api');
const app = express();
const port = 3000;

app.use(cors()); // Permitir todas las solicitudes CORS
app.use(express.json());

app.post('/addUser', (req, res) => {
  const user = req.body;

  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
    if (error0) {
      console.error('Error connecting to RabbitMQ:', error0);
      return res.status(500).send('Failed to connect to RabbitMQ');
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error('Error creating channel:', error1);
        return res.status(500).send('Failed to create channel');
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

app.post('/addConsulta', (req, res) => {
  const consulta = req.body;

  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
    if (error0) {
      console.error('Error connecting to RabbitMQ:', error0);
      return res.status(500).send('Failed to connect to RabbitMQ');
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error('Error creating channel:', error1);
        return res.status(500).send('Failed to create channel');
      }

      const queue = 'consultaQueue';
      const msg = JSON.stringify(consulta);

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`Sent ${msg}`);
      res.send('Consulta added to queue');
    });
  });
});

app.post('/addMensaje', (req, res) => {
  const mensaje = req.body;

  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
    if (error0) {
      console.error('Error connecting to RabbitMQ:', error0);
      return res.status(500).send('Failed to connect to RabbitMQ');
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error('Error creating channel:', error1);
        return res.status(500).send('Failed to create channel');
      }

      const queue = 'mensajeQueue';
      const msg = JSON.stringify(mensaje);

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`Sent ${msg}`);
      res.send('Mensaje added to queue');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});