import path from "path";
import { DataSource} from "typeorm";

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'password',
  database: 'bam_cms',
  entities: [path.resolve(__dirname, 'models', '*.ts')],
  migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
})
