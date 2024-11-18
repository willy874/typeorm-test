import path from "path";
import { DataSource} from "typeorm";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'app-db-service',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'bam_cms',
  entities: [path.resolve(__dirname, 'models', '*.js')],
})