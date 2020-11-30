const Kafka = require("kafka-node");
const { KAFKA_SERVER, KAFKA_TOPIC } = require("./config/kafka.config");

try {
  const Client = new Kafka.KafkaClient(KAFKA_SERVER);
  const Producer = new Kafka.Producer(Client);
  const payloads = [
    {
      topic: KAFKA_TOPIC,
      messages: "lagi",
      // messages: {
      //   data: {
      //     id: "1",
      //     name: "customer name",
      //   },
      // },
    },
  ];

  Producer.on("ready", async function () {
    const push_status = Producer.send(payloads, (err, data) => {
      if (err) {
        console.log(`Kafka-Producer -> ${KAFKA_TOPIC}: Error`, err);
      } else {
        // send message
        console.log(`Kafka-Producer -> ${KAFKA_TOPIC}: Success`, data);
      }
    });
  });

  Producer.on("error", function (err) {
    console.error(`Kafka-Producer -> ${KAFKA_TOPIC}: Error`, err);
    throw err;
  });
} catch (err) {
  console.error("error", err);
  throw err;
}
