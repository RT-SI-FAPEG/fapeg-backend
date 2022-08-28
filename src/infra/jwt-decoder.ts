import { IJwtDecoder } from "../usecases/ports/jwt-decoder";
import { verify } from "jsonwebtoken";
import { jwtKey } from "../shared/constants/jwt-key";

interface JwtDecoderProps {
  sub: string;
  iat: number;
  exp: number;
}

export class JwtDecoder implements IJwtDecoder {
  decode(token: string) {
    const { iat, sub, exp } = verify(token, jwtKey) as JwtDecoderProps;
    return {
      iat,
      sub,
      exp,
    };
  }
}
