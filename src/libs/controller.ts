import express from "express";
import type { Express, Request, RequestHandler } from "express";
import path from "path";

interface ControllerOptions {
  path?: string
  middlewares?: RequestHandler[]
}

interface RouteOptions {
  path: string
  method: string
}

type RouterOptions = { [key: string | symbol]: RouteOptions }

export const ControllerMap: { [key: string]: ControllerOptions & { router: RouterOptions } } = {}

const initController = (name: string) => {
  if (!ControllerMap[name]) {
    ControllerMap[name] = { router: {} }
  }
  return ControllerMap[name]
}

type Method = 'get' | 'post' | 'delete' | 'put' | 'patch'

export class Controller {
  static Prefix(path: string): ClassDecorator {
    return function (target) {
      const config = initController(target.name)
      config.path = path
    }
  }

  static Middleware(fn: RequestHandler): ClassDecorator {
    return function (target) {
      const config = initController(target.name)
      !config.middlewares && (config.middlewares = [])
      config.middlewares!.push(fn)
    }
  }

  static Get(path: string): PropertyDecorator {
    return function (target, propertyKey) {
      const config = initController(target.constructor.name)
      config.router[propertyKey] = { method: 'get', path }
    }
  }

  static Post(path: string): PropertyDecorator {
    return function (target, propertyKey) {
      const config = initController(target.constructor.name)
      config.router[propertyKey] = { method: 'post', path }
    }
  }

  static Delete(path: string): PropertyDecorator {
    return function (target, propertyKey) {
      const config = initController(target.constructor.name)
      config.router[propertyKey] = { method: 'delete', path }
    }
  }

  static Put(path: string): PropertyDecorator {
    return function (target, propertyKey) {
      const config = initController(target.constructor.name)
      config.router[propertyKey] = { method: 'put', path }
    }
  }

  static Patch(path: string): PropertyDecorator {
    return function (target, propertyKey) {
      const config = initController(target.constructor.name)
      config.router[propertyKey] = { method: 'patch', path }
    }
  }

  readonly name!: string
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
