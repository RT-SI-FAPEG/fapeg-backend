import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column()
  sexo: string;
}
