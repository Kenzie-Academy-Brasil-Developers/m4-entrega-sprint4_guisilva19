import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column({length: 60, unique: true})
    email: string

    @Column()
    password: string

    @Column()
    isAdm: boolean
    
    @Column({ default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}