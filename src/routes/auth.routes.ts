import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { redirectIfAuth } from "../middleware/auth";

const router = Router();

router.get('/register', redirectIfAuth, authController.getRegister);
router.get('/login', redirectIfAuth, authController.getLogin);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

export default router;