// import { render } from '@testing-library/react';
import './App.css';

import React from 'react';


export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList setTodos={setTodos} todos={todos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({todos, setTodos}) {

  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if(!todos.length){
    return <p>No todo's left!</p>;
  }


  return(
    <ul>
      {todos.map((todo) => (
        <li 
        onDoubleClick={() => handleToggleTodo(todo)} 
        style={{textDecoration: todo.done ? "line-through" : ""}} 
        key={todo.id}>

          {todo.text}
          <DeleteTodo setTodos={setTodos} todo={todo}/>
          
          </li>
      ))}
      
    </ul>
  )
}

function AddTodo({ setTodos }){

  const inputRef = React.useRef();

  function handleAddTodo(event){
    event.preventDefault();
    // console.log(event.target.elements.addTodo.value);
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done:false
    };

    
    setTodos(prevTodos => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }



  return(
    <form onSubmit={handleAddTodo}>
      <input name='addTodo' placeholder='Add todo' ref={inputRef}/>
      <button type='submit'>Submit</button>
    </form>
  );
}


function DeleteTodo({todo, setTodos}){

  function handleDeleteTodo(){

    const confirmed = window.confirm("do you want to delte this");
    if(confirmed){
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

 

  return(
    <span
    onClick={handleDeleteTodo}
    role="button"
    style={{
      color:'red',
      fontWeight:"bold",
      marginLeft:10,
      cursor:"pointer"

    }}
    
    >
      X
    </span>
  )




}
