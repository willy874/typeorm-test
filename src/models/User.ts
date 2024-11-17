import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

// Model
@Entity({
  name: 'users'
})
class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar', length: 150
  })
  name!: string

  @Column({
    type: 'varchar', length: 150, unique: true
  })
  email!: string

  @Column({
    type: 'int', default: 0
  })
  age!: number
}

export default User