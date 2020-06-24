const express = require('express');
const app = express();
const PORT = 3000;
const URL = '192.168.1.103' || process.env.URL;
const db = require('./config/db');

const consign = require('consign');
const TasksModel = require('./models/TasksModel')();
const UserModel = require('./models/UserModel')();
consign()
  .then('./config/midleweres.js')
  .include('./config/passport.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);
// db
app.db = db();
app.Tasks = TasksModel;
app.User = UserModel;
//

app.listen(PORT, URL, () =>
  console.log('Backend working on ' + URL + ':' + PORT),
);
