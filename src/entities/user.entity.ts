import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column({length: 60, unique: true})
    email: string

    @Column()
    @Exclude()
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