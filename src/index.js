const express = require('express');
const morgan = require('morgan');

const taskRoutes = require('./routes/tasks.routes');

const app = express();
app.use(morgan('dev'));
app.use(taskRoutes);


const serverPORT = 3000;

app.listen(serverPORT);
console.log(`Server on port ${serverPORT}`);
