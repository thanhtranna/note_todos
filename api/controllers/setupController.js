const Todos = require("../models/todoModel");

module.exports = (app) => {

    app.get('/api/setupTodos', (req, res) => {

        var seedTodos = [{
                text: "Hoc Node.js",
                isDone: false
            },
            {
                text: "Hoc Angular.js",
                isDone: false
            },
            {
                text: "Viet mot ung dung Node.js hoan chinh",
                isDone: false
            }
        ];

        Todos.create(seedTodos, (err, result) => {
            res.json(result);
        });

    });

};