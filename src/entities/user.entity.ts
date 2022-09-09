import { randomUUID } from "crypto";

export type TypePerson = "1" | "2" | "3";

interface UserDTO {
  id?: string;
  name: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
  isActive?: boolean;
}

interface UserProps {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
  isActive?: boolean;
}

export class User {
  private props: UserProps;

  constructor(props: UserDTO) {
    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.props = {
      ...props,
      id: props.id || randomUUID(),
      isActive: props.isActive || false,
    };
  }

  get id() {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get birthDate(): string {
    return this.props.birthDate;
  }

  get document(): string {
    return this.props.document;
  }

  get typePerson(): TypePerson {
    return this.props.typePerson;
  }

  get educationLevel() {
    return this.props.educationLevel || "";
  }

  get educationalInstitution() {
    return this.props.educationalInstitution || "";
  }

  get isActive() {
    return this.props.isActive || false;
  }

  get course() {
    return this.props.course || "";
  }

  set password(password: string) {
    this.props.password = password;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }

  set document(document: string) {
    this.props.document = document;
  }

  set educationLevel(educationLevel: string) {
    this.props.educationLevel = educationLevel;
  }

  set educationalInstitution(educationalInstitution: string) {
    this.props.educationalInstitution = educationalInstitution;
  }

  set course(course: string) {
    this.props.course = course;
  }

  set typePerson(typePerson: TypePerson) {
    this.props.typePerson = typePerson;
  }

  set isActive(isActive: boolean) {
    this.isActive = isActive;
  }

  toJSON() {
    return this.props;
  }
}
