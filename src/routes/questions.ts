import express, { Request, Response } from "express";

const router = express.Router({ mergeParams: true });

router.get("/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("GET Questions");
});

router.post("/", (req: Request, res: Response) => {
  res.send();
});

export default router;
