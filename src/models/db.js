import Sequelize from 'sequelize';
import {cfg} from '../config';
import {getLogger} from '../services/logger';
const logger = getLogger('database');

const dlDB = new Sequelize(cfg('DB_NAME'), cfg('DB_USERNAME'), cfg('DB_PASSWORD'), {
    host: cfg('DB_HOST'),
    dialect: cfg('DB_DRIVER'),
    dialectOptions: {
      useUTC: false, //for reading from database
    },
    timezone: cfg('DB_TIMEZONE'), //for writing to database
    logging: cfg('DB_LOGGING') ? logger.sql : false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: false
  });
dlDB
    .authenticate()
    .then(() => {
    logger.info(`Connection(${cfg('DB_DRIVER')}) has been established successfully.`);
    })
    .catch(err => {
    logger.error(`(${cfg('DB_DRIVER')}) Unable to connect to the database: \n%o`, err);
    });

    export default dlDB ;