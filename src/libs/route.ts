import type { RequestHandler } from "express";

export interface ControllerOptions {
  path?: string
  middlewares?: RequestHandler[]
}

export interface RouteOptions {
  path: string
  method: string
}

export type RouterOptions = { [key: string | symbol]: RouteOptions }

export const ControllerMap: { [key: string]: ControllerOptions & { router: RouterOptions } } = {}

const initController = (name: string) => {
  if (!ControllerMap[name]) {
    ControllerMap[name] = { router: {} }
  }
  return ControllerMap[name]
}

export function ControllerMiddleware(options: ControllerOptions = {}): ClassDecorator {
  return function (target) {
    const config = initController(target.name)
    !config.path && (config.path = options.path)
    !config.middlewares && (config.middlewares = options.middlewares)
  }
}

export function Route(options: RouteOptions): PropertyDecorator {
  return function (target, propertyKey) {
    const config = initController(target.constructor.name)
    config.router[propertyKey] = options
  }
}

