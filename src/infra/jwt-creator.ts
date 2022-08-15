import { IJwtCreator, IJwtCreatorProps } from "../usecases/ports/jwt-creator";
import { sign } from "jsonwebtoken";
import { jwtKey } from "../shared/constants/jwt-key";

export class JwtCreator implements IJwtCreator {
  create(data: IJwtCreatorProps): string {
    return sign({ sub: data.sub }, jwtKey, {
      expiresIn: data.exp,
    });
  }
}
