import * as dotenv from "dotenv";
import * as express from "express";
import connectDB from "../database/mongo.db";
import regionRoutes from "./routes/regions.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

if (!process.env.GOOGLE_API_KEY) {
  console.error("API Key da Google não configurada!");
  process.exit(1);
}

connectDB();
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/regions", regionRoutes);

app.listen(3000);
