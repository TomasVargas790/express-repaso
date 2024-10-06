import { Router } from "express";
import { loginMiddleware, registerMiddleware } from "./service.js";

const router = Router();

router.post('/register', registerMiddleware)
router.post('/login', loginMiddleware)

export default router;
