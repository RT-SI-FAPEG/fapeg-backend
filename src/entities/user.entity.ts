import { randomUUID } from "crypto";

export enum TypePerson {
  FISICA = 1,
  JURIDICA = 2,
}

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  document: string;
  birthDate?: Date;
  interestArea: string;
  typePerson: TypePerson;
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

  toJSON() {
    return this.props;
  }
}
