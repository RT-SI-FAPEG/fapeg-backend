import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1661690955960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "birthDate",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "document",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "educationLevel",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "educationalInstitution",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "course",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "typePerson",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
