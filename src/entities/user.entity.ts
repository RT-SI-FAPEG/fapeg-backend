import { randomUUID } from "crypto";

export type TypePerson = 1 | 2;

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  document: string;
  birthDate?: Date;
  interestArea: string;
  typePerson: number;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
    };
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  toJSON() {
    return this.props;
  }
}
