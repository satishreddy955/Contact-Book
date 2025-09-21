import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import contactsRouter from "./routes/contacts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/contacts", contactsRouter);


app.get("/", (req, res) => res.json({ ok: true, msg: "Contact Book API" }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
