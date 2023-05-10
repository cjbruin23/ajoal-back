import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("GET Question");
});

router.get("/:id", (req: Request, res: Response) => {
  const questionId = req.params.id;
  res.send(`Question ${questionId}`);
});

export default router;
