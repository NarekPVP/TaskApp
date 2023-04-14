import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public users: string;
}