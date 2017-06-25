var Todos = require('../models/todoModel');

function getTodos(res) {
    Todos.find((err, todos) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            //console.log(todos);
            res.json({ todos: todos, msg: "Return value successfully!" });
        }

    });
}

module.exports = (app) => {

    //Get all todos
    app.get('/api/todos', (req, res) => {
        getTodos(res);
    });

    // /api/todo/id 
    app.get('/api/:id', (req, res) => {
        // find Id
        Todos.findById({ id: req.params.id }, (err, todo) => {
            if (err) {
                throw err;
            } else {
                res.json(todo);
            }
        });

    });

    /** 
     *  favico.ico
     */
    app.get('/favicon.ico', function(req, res) {
        res.send(204);
    });

    /**
     * Create a todo.
     */

    app.post('/api/todo', (req, res) => {

        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };

        Todos.create(todo, (err, todo) => {
            if (err) {
                throw err;
            } else {
                getTodos(res);
            }
        });

    });

    /**
     * Update a todo
     */

    app.put('/api/todo', (req, res) => {
        console.log(req.body);
        if (!req.body._id) {
            return res.status(500).send('ID is required.');
        } else {
            Todos.update({
                _id: req.body._id,
            }, {
                text: req.body.text,
                isDone: req.body.isDone
            }, (err, todo) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    getTodos(res);
                }
            });
        }
    });

    /**
     * Delete a todo by _id.
     */

    app.post('/api/todo/:id', (req, res) => {

        // Problem!!!
        console.log(req.body);
        if (!req.body._id) {
            return res.status(500).send('ID is required.');
        } else {
            Todos.remove({
                _id: req.body._id,
            }, (err, todo) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    getTodos(res);
                }
            });
        }

    });
}