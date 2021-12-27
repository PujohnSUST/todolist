// import { render } from '@testing-library/react';
import './App.css';

import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 pt-5'>
            <h1 className='pb-3 text-center'>Todo List</h1>
 
        
            <AddTodo setTodos={setTodos} />
            <TodoList setTodos={setTodos} todos={todos} />
             
           
             
              

            
            
        </div>
      </div>
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
        key={todo.id}
        className='p-2'  
        >

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
    <form onSubmit={handleAddTodo} className='text-center mb-5'>
      <input className='form-control' name='addTodo' placeholder='Add todo' ref={inputRef}/>
      <button className='btn btn-success btn-md mt-3' type='submit'>Add TO DO list</button>
    </form>
  );
}


function DeleteTodo({todo, setTodos}){

  function handleDeleteTodo(){

    const confirmed = window.confirm("do you want to delete this");
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
     <ClearIcon />
    

    </span>
  )




}
