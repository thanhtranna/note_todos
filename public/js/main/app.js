var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', ($scope, svTodos) => {

    $scope.appName = "Todo Dashboard !!!";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [];

    // Load data from api.
    svTodos.get()
        .then((res) => {
            console.log(res.data);
            let data = res.data;
            $scope.todos = data.todos;
            $scope.loading = false;
        });
    console.log($scope.todos);
    // $scope.todos = [{
    //         text: "Khởi động dự án, include thư viện bootstrap, font awesome, angularjs, ..",
    //         isDone: true
    //     },
    //     {
    //         text: "Cài đặt AngularJS app, controller, khởi tạo dữ liệu ban đầu",
    //         isDone: true
    //     },
    //     {
    //         text: "Tạo services gọi api, biding dữ liệu, action, ...",
    //         isDone: false
    //     },
    //     {
    //         text: "Hoàn thành ứng dụng, deploy lên Heroku ...",
    //         isDone: false
    //     }
    // ];

    /**
     *  Create a todo.
     */

    $scope.createTodo = () => {
        $scope.loading = true;

        var todo = {
            text: $scope.formData.text,
            isDone: false
        };

        svTodos.create(todo)
            .then((data) => {
                $scope.todos.push(todo);
                $scope.formData.text = "";
                $scope.loading = false;
            });

    };

    /**
     * Update a todo by _id.
     */

    $scope.updateTodo = (todo) => {

        console.log("Update todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo)
            .then((res) => {
                $scope.todos = res.data.todos;
                $scope.loading = false;
            })

    };

    /**
     * Delete a todo by _id.
     */

    $scope.deleteTodo = (todo) => {
        console.log("Delete todo: ", todo);
        console.log(todo._id);
        $scope.loading = true;

        svTodos.delete(todo._id, todo)
            .then((res) => {
                $scope.todos = res.data.todos;
                $scope.loading = false;
            });
    };

}]);