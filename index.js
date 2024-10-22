const express = require('express');
const app = express();
const port = 3000;

// Uso de json en las request
app.use(express.json());

const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('todo.db'), { fileMustExist: true });

// Como crear una tabla sqlite db.exec
// app.get('/createdb', (req, res) => {
//     db.exec(`
// CREATE TABLE todos (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   descripcion text NOT NULL UNIQUE,
//   estado text NOT NULL,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
// )`);
// });

app.get('/', (req, res) => {
    const todos = db.prepare('SELECT * FROM todos').all();

    res.json({ todos });
});
app.post('/', function (req, res, next) {
    try {
        // Destruncturing 
        const { descripcion, estado } = req.body;

        //Ejecucion query INSERT
        const stmt = db.prepare('INSERT INTO todos (descripcion, estado) VALUES (?, ?)');
        const todo = stmt.run(descripcion, estado);

        res.json({ response: todo });
    } catch (err) {
        console.error(`Error while adding `, err.message);
        next(err);
    }
});
app.put('/', (req, res) => {
    try {
        // Destruncturing 
        const { descripcion, estado, id } = req.body;

        //Ejecucion query INSERT
        const stmt = db.prepare('UPDATE todos  set descripcion = ? , estado = ? WHERE id= ?');
        const todo = stmt.run(descripcion, estado, id);

        res.json({ response: todo });
    } catch (err) {
        console.error(`Error while adding `, err.message);
        next(err);
    }
});
app.delete('/', (req, res) => {
    res.json({ message: 'Eliminado' });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
