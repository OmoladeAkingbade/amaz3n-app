import express, { Application, Response, NextFunction, Request } from "express";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello World from the server side yay!", app: "amaz3n" });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`app is fired up on port ${port}`);
});
