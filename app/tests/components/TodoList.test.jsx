var React = require("react");
var ReactDOM = require("react-dom");
var {Provider}=require("react-redux");
var expect = require("expect");
var $ = require("jQuery");
var TestUtils = require("react-addons-test-utils");

import {configure} from "configureStore";
import ConnectedTodoList, {TodoList} from "TodoList";
import ConnectedTodo, {Todo} from "Todo";

describe("TodoList", () => {
    it("should exits", () => {
        expect(TodoList).toExist();
    })

    it("should render one todo component for each todo item", () => {
        var todos = [
            {
                id: 1,
                value: "murali",
                completed: false,
                completedAt: undefined,
                createdAt: 500
            }, {
                id: 2,
                value: "tharu",
                completed: false,
                completedAt: undefined,
                createdAt: 500
            }
        ];

        var store = configure({todos});
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}><ConnectedTodoList/></Provider>
        );

        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todoComponents.length).toBe(todos.length);
    })

    it("should render empty item if no todos", () => {
        var todos = [];
        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    })
})
