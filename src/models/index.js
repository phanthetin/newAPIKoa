

import  Sequelize from 'sequelize';
import CONFIG     from '../config/index';
import fs         from'fs';
import path       from'path';

var basename  = path.basename(__filename);
var db        = {};

const sequelize = new Sequelize(CONFIG.namedb, CONFIG.user, CONFIG.pass, {
  host: CONFIG.host,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize

module.exports = db;