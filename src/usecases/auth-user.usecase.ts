import { AppError } from "../shared/errors/AppError";
import { IFindUserByEmailRepository } from "./ports/find-user-by-email.repository";
import { IJwtCreator } from "./ports/jwt-creator";
import { IPasswordComparer } from "./ports/password-comparer";
import { IEmailValidator } from "./ports/user-validator";

interface AuthUserDTO {
  email: string;
  password: string;
}

interface AuthUserProps {
  emailValidator: IEmailValidator;
  findUserByEmailRepository: IFindUserByEmailRepository;
  passwordComparer: IPasswordComparer;
  jwtCreator: IJwtCreator;
}

export class AuthUserUseCase {
  constructor(private props: AuthUserProps) {}

  async execute({ email, password }: AuthUserDTO) {
    if (!email || !password) throw new AppError("All fields are required");

    if (!this.props.emailValidator.validate(email))
      throw new AppError("Invalid Email Address");

    const user = await this.props.findUserByEmailRepository.findUserByEmail(
      email
    );

    if (!user) throw new AppError("User not finded");

    if (!this.props.passwordComparer.compare(password, user.password))
      throw new AppError("Invalid user password");

    const token = this.props.jwtCreator.create({
      exp: "1d",
      sub: user.id || "",
    });

    return {
      token,
    };
  }
}
