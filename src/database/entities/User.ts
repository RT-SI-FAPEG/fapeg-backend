import { EntitySchema } from "typeorm";
import { User } from "../../entities/user.entity";

export const UserEntity = new EntitySchema<User>({
  name: "user",
  columns: {
    id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    email: {
      type: String,
    },
    document: {
      type: String,
    },
    password: {
      type: String,
    },
    educationLevel: {
      type: String,
      nullable: true,
    },
    educationalInstitution: {
      type: String,
      nullable: true,
    },
    course: {
      type: String,
      nullable: true,
    },
    typePerson: {
      type: String,
      nullable: true,
    },
  },
});
