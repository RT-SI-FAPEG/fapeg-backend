import { IJwtDecoder } from "../usecases/ports/jwt-decoder";
import {verify} from "jsonwebtoken";
import { jwtKey } from "../shared/constants/jwt-key";

export class JwtDecoder implements IJwtDecoder {
    decode(token: string) {
        const { } = verify(token,jwtKey)
    }

}