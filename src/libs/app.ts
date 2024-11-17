import express from 'express'
import type { Controller } from './controller'
import { EventBus } from './event'
import { DataSource, DataSourceOptions } from 'typeorm'

export class Application {
  current = express()
  dataSource: DataSource
  emitter = new EventBus()

  constructor(options: DataSourceOptions) {
    this.dataSource = new DataSource(options)
    this.current.use(express.json())
  }

  useController(ControllerConstructor: typeof Controller) {
    const controller = new ControllerConstructor()
    controller.dataSource = this.dataSource
    controller.initialize(this.current)
    return this
  }

  initialize(port: number): Promise<Application> {
    return Promise.all([
      new Promise((resolve) => this.current.listen(port, () => resolve(null))),
      this.dataSource.initialize(),
    ]).then(() => {
      console.log('App initialize');
      return this
    })
  }
}