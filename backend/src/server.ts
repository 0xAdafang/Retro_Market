import express from "express";
import mainRoutes from "./routes/mainRouter";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", mainRoutes); 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue" });
  }
);

const PORT = process.env.PORT || 3001;

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
);
