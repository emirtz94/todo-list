import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

class AuthController {
  public getRegister = (_req: Request, res: Response) => {
    res.render('register');
  };

  public getLogin = (_req: Request, res: Response) => {
    res.render('login');
  };

  public postRegister = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const user = await authService.register(email, password, name);

    req.session.userId = user.id;
    res.redirect('/todos');
  };

  public postLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await authService.login(email, password);

      req.session.userId = user.id;

      res.redirect('/todos');
    } catch (error) {
      res.render('login', { error: (error as Error).message});
    }
  };

  public postLogout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
}

export const authController = new AuthController();
