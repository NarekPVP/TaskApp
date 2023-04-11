import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ nullable: true })
    public firstUserId: string;

    @Column({ nullable: true })
    public secondUserId: string;

    @Column({ nullable: true })
    public content: string;
}