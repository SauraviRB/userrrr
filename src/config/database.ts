import { Sequelize } from "@sequelize/core";
import { db } from "./index";


const sequelize = new Sequelize(db.name, db.username, db.password, {
  dialect: "postgres",
  host: db.host,
  port: db.port,
});
console.log(db);
export default sequelize;
