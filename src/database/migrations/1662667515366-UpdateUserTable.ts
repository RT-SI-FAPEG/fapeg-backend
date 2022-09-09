import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUserTable1662667515366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "isActive",
        type: "boolean",
        isNullable: true,
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "isActive");
  }
}
