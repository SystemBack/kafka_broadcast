const express = require('express');
const kafka = require('kafka-node');

const app = express();
const PORT = 3000;

app.use(express.json());

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Kafka Producer error:', err);
});

app.post('/test', (req, res) => {
    const payload = [{ topic: 'test', messages: JSON.stringify(req.body) }];
    producer.send(payload, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send('Message sent to Kafka');
    });
});

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
