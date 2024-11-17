import { DataSource} from "typeorm";
import express from "express";
import type { Express, Request, RequestHandler } from "express";
import { ControllerMap } from "./route";
import path from "path";

type Method = 'get' | 'post' | 'delete' | 'put' | 'patch'

export class Controller {
  readonly name!: string
  dataSource!: DataSource
  app = express()

  init() {}

  initialize(app: Express) {
    this.app = app
    const config = ControllerMap[this.constructor.name]
    const baseURL = config.path || '/'
    Object.keys(config.router).forEach((key) => {
      const options = config.router[key]
      const method = options.method.toLowerCase() as Method
      const handler = (this as any)[key].bind(this) as ((req: Request) => Promise<unknown>) | undefined
      const createRoute = this.app[method].bind(this.app) as (path: string, ...handlers: RequestHandler[]) => void
      if (handler) {
        const routeURL = path.join(baseURL, options.path)
        const middlewares = config.middlewares || []
        createRoute(routeURL, ...middlewares, (req, res) => {
          handler(req).then((data) => res.send(data))
        })
      }
    })
    this.init()
  }
}
