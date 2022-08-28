import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtKey } from "../shared/constants/jwt-key";

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  if (!authorization)
    return res.status(401).json({ error: "Usuário não autenticado" });

  const [, token] = authorization.split(" ");

  if (!token)
    return res
      .status(401)
      .json({ error: "Usuário não autenticado, token faltando" });

  try {
    jwt.verify(token, jwtKey);
  } catch (error) {
    return res.status(400).json({ error: "Token JWT inválido" });
  }

  return next();
}
