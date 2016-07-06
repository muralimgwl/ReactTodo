var $ = require('jQuery');

module.exports = {
    getTodos: () => {
        var stringyfyTodos = localStorage.getItem("todos");
        var todos = [];

        try {
            todos = JSON.parse(stringyfyTodos);
        } catch (e) {}

        return $.isArray(todos)
            ? todos
            : [];
    },
    setTodos: (todos) => {
        if ($.isArray(todos)) {
            localStorage.setItem("todos", JSON.stringify(todos));
            return todos;
        }
    },
    filterTodos: (todos, searchCompleted, searchText) => {
        var filteredTodos = todos;

        //filter todo when searchCompleted and completed
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || searchCompleted;
        })

        //filter todos by text
        filteredTodos = filteredTodos.filter((todo) => {
            var todoText = todo.value.toLowerCase();
            return searchText.length === 0 || todoText.indexOf(searchText) > -1;
        })

        //sort filteredTodos
        filteredTodos.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1;
            } else if (a.completed && !b.completed) {
                return 1;
            } else {
                return 0;
            }
        })

        return filteredTodos;
    }
};
