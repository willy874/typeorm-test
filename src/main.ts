import UserController from "./controllers/User"
import User from './models/User'
import path from 'path'
import { Application } from "./libs/app"
import { ControllerMap } from "./libs/route"

new Application(
  {
    type: 'mysql',
    host: 'app-db-service',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'bam_cms',
    entities: [path.resolve(process.cwd(), 'dist', 'models', '*.js'), User],
  }
)
  .useController(UserController)
  .initialize(3000)
  .then(() => {
    console.log(
      'Server is running on http://localhost:3000',
      JSON.stringify(ControllerMap, null, 2)
    )
  })
