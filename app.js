const express = require("express");
const mysql = require("mysql2");
const app = express();

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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/user-table', (req, res) => {
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
        console.log(results);
    });
});

app.post('update-table', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const date_of_birth = req.body.date_of_birth;

    client.execute("UPDATE user SET name = '" + name + "', surname = '" + surname + "'," +
        " date_of_birth = '" + date_of_birth + ", updated= NOW() ' WHERE id = "+id+";",
        function (err, result, fields) {
        if(err) {
            console.log(err);
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