import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { connectKafkaProducer, producer } from "./config/kafka.config.js";
import { consumerMessage, producerMessage } from "./helper.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.post("/",async(req: Request, res: Response) => {
  const body = req.body;

  await producerMessage("crash",body)
  return res.json({message:"Data Add Successfully"})
})

//connect Kafka Producer 

connectKafkaProducer().catch((err) => console.log("The Kafka producer failed to connect"));


consumerMessage('crash').catch((err) => console.log("The Kafka consume failed to connect"));


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
