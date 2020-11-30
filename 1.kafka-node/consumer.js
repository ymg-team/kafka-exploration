const Kafka = require("kafka-node");
const { KAFKA_SERVER, KAFKA_TOPIC } = require("./config/kafka.config");

try {
  const Client = new Kafka.KafkaClient(KAFKA_SERVER);
  const Consumer = new Kafka.Consumer(Client, [
    {
      topic: KAFKA_TOPIC,
      partition: 0,
    },
  ]);

  Consumer.on("message", async function (message) {
    console.log("here");

    // receive message
    console.log(`Kafka Consumer -> receive message : `, message);

    // delete message
    console.log(`Kanfka Consumer -> deleting message :`, message);
  });

  Consumer.on("error", function (err) {
    console.log("error", err);
    throw err;
  });
} catch (err) {
  console.error("error", err);
  throw err;
}
