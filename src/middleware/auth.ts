import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.body.token = token;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
