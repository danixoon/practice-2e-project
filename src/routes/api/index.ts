import { Router } from "express";

const router = Router();

router.get("/auth", (req, res) => {
  res.status(200).send();
});
router.post("/register", (req, res) => {});

export default router;
