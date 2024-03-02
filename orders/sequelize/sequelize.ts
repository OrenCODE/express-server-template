import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql', 'root', 'Oren1590@!', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
