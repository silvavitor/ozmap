import * as express from "express";
import connectDB from "../database/mongo.db";
import userRoutes from "./routes/user.routes";

connectDB();
const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000);
