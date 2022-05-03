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

app.get('/', (req, res) => {
    return res.send('<h1>Funcionando</h1>')
})

app.listen(3000, () => {
    console.log('Server running on port 3000...');
})