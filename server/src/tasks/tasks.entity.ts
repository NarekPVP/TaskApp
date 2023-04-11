import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ nullable: true })
    public userId: string;

    @Column({ nullable: true})
    public title: string;

    @Column({ nullable: true})
    public description: string;

    @Column({ nullable: true, type: 'date' })
    public createdAt?: Date;

    @Column({ nullable: true, type: 'date' })
    public updatedAt?: Date;
}