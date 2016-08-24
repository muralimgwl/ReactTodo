var uuid = require("node-uuid");
var moment = require("moment");

export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case "SET_SEARCH_TEXT":
            return action.searchText;
        default:
            return state;
    }
}

export var showCompltedReducer = (state = true, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW_COMPLETED":
            return !state;
        default:
            return state;
    }
}

export var todosReducer = (state = [], action) => {
    switch (action.type) {

        case "ADD_TODO":
            return [
                ...state, {
                    id: uuid(),
                    value: action.todo,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ];
        case "TOGGLE_TODO":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    var nextCompleted = !todo.completed;

                    return {
                        ...todo,
                        completed: nextCompleted,
                        completedAt: nextCompleted
                            ? moment().unix()
                            : undefined
                    }
                }
                else {
                  return todo;
                }
            });
            // case "TOGGLE_TODO":
            //     {
            //         var updatedTodos = state.map((todo) => {
            //             if (todo.id === action.id) {
            //                 todo.completed = !todo.completed;
            //                 todo.completedAt = todo.completed
            //                     ? moment().unix()
            //                     : undefined;
            //             }
            //             return todo;
            //         })
            //         return updatedTodos;
            //     };
        default:
            return state;
    }
}