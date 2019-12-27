import { Router } from "express";
import { validateAuth } from "../../../middleware/auth";
import { signToken } from "../../../utils";

const router = Router();

router.get("/role/user", validateAuth("user"), (req, res) => {
  res.status(200).send();
});

router.get("/role/admin", validateAuth("admin"), (req, res) => {
  res.status(200).send();
});

router.get("/token/:role", (req, res) => {
  const { role } = req.params;
  if (role === "admin" || role === "user") {
    const token = signToken({ userId: "" });
    res.status(200).send(token);
  } else res.status(400).send("invalid role");
});

export default router;
