import { IJwtDecoder } from "../usecases/ports/jwt-decoder";
import { verify } from "jsonwebtoken";
import { jwtKey } from "../shared/constants/jwt-key";

interface JwtDecoderProps {
  sub: string;
  iat: number;
}

export class JwtDecoder implements IJwtDecoder {
  decode(token: string) {
    const { iat, sub } = verify(token, jwtKey) as JwtDecoderProps;
  }
}
