import { TODO_INPUT_ELEMENT_ID } from '../constant/elementId';
import { Todo } from '../type/Todo';

export const getTodos: () => Array<Todo> = () => {
  const todos = localStorage.getItem('todos');
  if (!todos) return [];
  return JSON.parse(todos);
};

const getTodoIndex = (todos: Array<Todo>, id: number) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return i;
    }
  }
};

export const createTodo = () => {
  const todoInputElement = document.getElementById(TODO_INPUT_ELEMENT_ID) as HTMLInputElement;
  const todoContent = todoInputElement.value;

  const todos = getTodos();
  if (!todos.length) {
    const newTodos: Array<Todo> = [
      {
        id: Date.now(),
        content: todoContent,
        completed: false
      }
    ];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return;
  }
  const newTodo = {
    id: Date.now(),
    content: todoContent,
    completed: false
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const completeTodo = (todoId: number) => {
  const newTodos = getTodos();
  const newTodoIndex = getTodoIndex(newTodos, todoId)!;
  newTodos[newTodoIndex].completed = true;
  localStorage.setItem('todos', JSON.stringify(newTodos));
};

export const backTodo = (todoId: number) => {
  const newTodos = getTodos();
  const newTodoIndex = getTodoIndex(newTodos, todoId)!;
  newTodos[newTodoIndex].completed = false;
  localStorage.setItem('todos', JSON.stringify(newTodos));
};

export const deleteTodo = (todoId: number) => {
  const todos = getTodos();
  const newTodos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(newTodos));
};
