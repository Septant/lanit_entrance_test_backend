const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("express");
const app = express();
const moment = require("moment");


const connectionConfig = {
    user: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    database: 'lanit_entrance_db',
};


const client = new mysql.createConnection(connectionConfig);

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.send();
});


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/users', (req, res) => {
    client.query("SELECT * FROM user;", function (err, results, fields) {

        if (err) {
            res.send({
                status: 'error',
                message: 'Ошибка обращения к базе данных'
            });
        } else res.send({
            status: 'success',
            data: results
        });
    });
});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.user.name;
    const surname = req.body.user.surname;
    const date_of_birth = req.body.user.date_of_birth;

    client.execute("UPDATE user SET name = '" + name + "', surname = '" + surname + "'," +
        " date_of_birth = '" + moment(date_of_birth).format("YYYY-MM-DD") + "', updated= NOW() WHERE id = " + id + ";",
        function (err, result, fields) {
            if (err) {
                res.send({
                    status: 'error',
                    message: 'Ошибка работы с базой данных: ' + err.sqlMessage
                });
            } else {
                res.send({
                    status: 'success'
                });
            }
        });
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    client.execute("DELETE FROM user WHERE id=" + id + ";",
        function (err, result, fields) {
            if (err) {
                res.send({
                    status: 'error',
                    message: 'Ошибка работы с базой данных: ' + err.sqlMessage
                });
                res.send({
                    status: 'success'
                });
            }
        });
});

app.post('/user', (req, res) => {
    const name = req.body.user.name;
    const surname = req.body.user.surname;
    const date_of_birth = req.body.user.date_of_birth;
    client.execute("INSERT INTO user (name, surname, date_of_birth, created, updated) " +
        "VALUES('" + name + "', '" + surname + "', '" + moment(date_of_birth).format("YYYY-MM-DD") + "', NOW(), NOW());",
        function (err, result, fields) {

            if (err) {
                res.send({
                    status: 'error',
                    message: 'Ошибка работы с базой данных: ' + err.sqlMessage
                });
            } else {
                res.send({
                    status: 'success'
                });
            }
        });
});

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(7000, '127.0.0.1', function () {
    console.log(`Server started`);
});