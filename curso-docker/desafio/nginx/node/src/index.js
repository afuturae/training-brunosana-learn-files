import Express from 'express';
import mysql from 'mysql';

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}


const app = Express();

app.get('/save', (req, res) => {
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO PEOPLE(name) VALUES('Bruno')`;
    connection.query(sql);
    connection.end();
    return res.send('<h1>Adicionou</h1>')
})

app.get('/item', (req, res) => {
    const connection = mysql.createConnection(config);
    const sql = `SELECT * FROM PEOPLE`;
    let finalResult = '<h1>Resultado:</h1><br/>';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;



        Object.keys(result).forEach(function(key) {
          var row = result[key];
          let line = `<p>${row.id} - ${row.name}</p><br/>`
          finalResult += line;
          console.log(row.id)
          console.log(row.name)
        });
        connection.end();
        console.log('retornando');
        return res.send(finalResult)
    });
})

app.get('/', (req, res) => {
    return res.send('<h1>Funcionando</h1>')
})

app.listen(3000, () => {
    console.log('Server running on port 3000...');
})