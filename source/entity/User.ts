import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:'myapp'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length:30,

    })
    name: string

    @Column()
    password: string

    @Column()
    email: number
}