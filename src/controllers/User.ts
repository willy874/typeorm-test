import { Request } from "express";
import { Controller } from "../libs/controller";
import User from "../models/User";
import { AppDataSource } from "../libs/data-source";

@Controller.Prefix('/api')
export default class UserController extends Controller {
  userRepo = AppDataSource.manager.getRepository(User)

  @Controller.Get('/post-data')
  async getUsers() {
    const users = await this.userRepo.createQueryBuilder().getMany()
    return {
      data: users,
      message: 'success!'
    }
  }

  @Controller.Post('/post-data')
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

  @Controller.Delete('/post-data/:id')
  async deleteUser(req: Request) {
    await this.userRepo
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: req.params.id })
      .execute()
    return { message: 'success!' }
  }
}
