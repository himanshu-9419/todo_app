import React,{Component} from 'react';
import ToDo from './todo.js';
import ToDoForm from './ToDoForm.js';
import * as apiCalls from './api.js';


class ToDoList extends Component{
    constructor(props){
        super(props);
        this.state={
            todos:[]
        }
        this.addToDo=this.addToDo.bind(this);
    }
    componentWillMount(){
        this.loadToDos();
    }
    async addToDo(val){
        var todos= await apiCalls.createTodo(val);
        this.setState({todos:[...this.state.todos,todos]});     
    }
    async deleteTodo(id){
        await apiCalls.deleteTodo(id);
        const todos=this.state.todos.filter(todo=>todo._id!==id);
        this.setState({todos});
          
    }
    async toggleTodo(elem){
        await apiCalls.updateTodo(elem);
        const todos = this.state.todos.map(todo =>todo._id === elem._id?{...todo,completed:!todo.completed}:todo);
        this.setState({ todos });        
    }
    async loadToDos(){
        let todos = await apiCalls.getTodos();
        this.setState({todos}); 
    }
    render(){
        const todos = this.state.todos.map(elem => (<ToDo key={elem._id} {...elem} 
            onDelete={this.deleteTodo.bind(this,elem._id)}
            onToggle={this.toggleTodo.bind(this,elem)}
             />))
        return (
            <div>
            <h1>ToDo List</h1>
            <ToDoForm addToDo={this.addToDo}/>
            <ul>{todos}</ul></div>
        )
    }
}

export default ToDoList;