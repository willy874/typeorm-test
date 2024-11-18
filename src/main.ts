import UserController from "./controllers/User"
import { Application } from "./libs/app"
import { ControllerMap } from "./libs/controller"
import { AppDataSource } from "./libs/data-source"

new Application()
  .useDataSource(AppDataSource)
  .useController(UserController)
  .initialize(3000)
  .then(() => {
    console.log(
      'Server is running on http://localhost:3000',
      JSON.stringify(ControllerMap, null, 2)
    )
  })
