import { DataSource } from "typeorm"
import { Config } from "../../shared/config"
import { MonthlyReportEntity } from "./entities/monthly-report.entity"

const mongoDatasource = new DataSource({
    type: "mongodb",
    host: Config.db.host,
    port: +Config.db.port,
    database: Config.db.database,
    username: Config.db.user,
    password: Config.db.password,
    entities: [MonthlyReportEntity],
    logger: "debug",
    authSource: "admin"
})

export async function getDatabase() {
    if (mongoDatasource.isInitialized) {
        return mongoDatasource
    } else {
        return mongoDatasource.initialize()
    }
}