import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId: "kafka-cash" });

export const connectKafkaProducer = async () => {
    await producer.connect();

    console.log("The Kafka producer is connected");
    
};
