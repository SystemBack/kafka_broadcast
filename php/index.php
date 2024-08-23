<?php

require_once 'vendor/autoload.php';

use RdKafka\Consumer;
use RdKafka\ConsumerTopic;
use RdKafka\Message;
use RdKafka\Conf;

// Kafka Configuration
$conf = new Conf();
$conf->set('group.id', 'php-consumer-group');
$conf->set('metadata.broker.list', 'kafka:9092');

// Create Kafka Consumer
$consumer = new Consumer($conf);
$topic = $consumer->newTopic('test');

// Consume Messages
$topic->consumeStart(0, RD_KAFKA_OFFSET_END);

echo "Waiting for messages...\n";

while (true) {
    $msg = $topic->consume(0, 1000);
    if ($msg && $msg->payload) {
        echo "Received message: " . $msg->payload . "\n";
    }
}
