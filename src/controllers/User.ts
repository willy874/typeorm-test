import { Request } from "express";
import { Repository } from "typeorm";
import { Controller } from "../libs/controller";
import { ControllerMiddleware, Route } from "../libs/route";
import User from "../models/User";

@ControllerMiddleware({
  path: '/api'
})
export default class UserController extends Controller {
  userRepo!: Repository<User>

  init(): void {
    this.userRepo = this.dataSource.manager.getRepository(User)
  }
  
  @Route({ method: 'GET', path: '/post-data' })
  async getUsers() {
    const users = await this.userRepo.createQueryBuilder().getMany()
    return {
      data: users,
      message: 'success!'
    }
  }

  @Route({ method: 'POST', path: '/post-data' })
  async createUser() {
    await this.userRepo
      .createQueryBuilder()
      .insert()
      .values({
        name: "Timber",
        email: "willy@gmail.com",
        age: 33
      })
      .execute()
    return { message: 'success!' }
  }

  @Route({ method: 'DELETE', path: '/post-data/:id' })
  async deleteUser(req: Request) {
    await this.userRepo
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: req.params.id })
      .execute()
    return { message: 'success!' }
  }
}
