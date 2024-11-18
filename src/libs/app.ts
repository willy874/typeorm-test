import express from 'express'
import type { Controller } from './controller'
import { EventBus } from './event'
import { DataSource } from 'typeorm'

export class Application {
  current = express()
  databases: DataSource[] = []
  emitter = new EventBus()

  constructor() {
    this.current.use(express.json())
  }

  useDataSource(dataSource: DataSource) {
    this.databases.push(dataSource)
    return this
  }

  useController(ControllerConstructor: typeof Controller) {
    const controller = new ControllerConstructor()
    controller.initialize(this.current)
    return this
  }

  initialize(port: number): Promise<Application> {
    return Promise.all([
      new Promise((resolve) => this.current.listen(port, () => resolve(null))),
      ...this.databases.map((databases) => databases.initialize()),
    ]).then(() => {
      console.log('App initialize');
      return this
    })
  }
}