const TODO_FORM_ELEMENT_ID = 'todoForm';
const TODO_INPUT_ELEMENT_ID = 'todoInput';
const TODO_LIST_ELEMENT_ID = 'todoList';
const TODO_COMPLETE_LIST_ELEMENT_ID = 'todoCompleteList';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

const clearForm = () => {
  const todoInputElement = document.getElementById(TODO_INPUT_ELEMENT_ID) as HTMLInputElement;
  todoInputElement.value = '';
};

const getTodos: () => Array<Todo> = () => {
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

const createTodo = () => {
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

const completeTodo = (event: MouseEvent) => {
  const todoId = parseInt((event.currentTarget as HTMLButtonElement).id);
  const newTodos = getTodos();
  const newTodoIndex = getTodoIndex(newTodos, todoId)!;
  newTodos[newTodoIndex].completed = true;
  localStorage.setItem('todos', JSON.stringify(newTodos));
  renderTodos();
};

const deleteTodo = (event: MouseEvent) => {
  const todoId = parseInt((event.currentTarget as HTMLButtonElement).id);
  const todos = getTodos();
  const newTodos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  renderTodos();
};

const renderTodos = () => {
  // todoリストを消去
  const todoListElement = document.getElementById(TODO_LIST_ELEMENT_ID) as HTMLUListElement;
  todoListElement.innerHTML = '';
  const todoCompleteListElement = document.getElementById(
    TODO_COMPLETE_LIST_ELEMENT_ID
  ) as HTMLUListElement;
  todoCompleteListElement.innerHTML = '';

  // 保存されたtodoが1つも無ければ終了
  const todos = getTodos();
  if (!todos.length) return;

  // todoをすべてリストに追加
  todos.forEach((todo) => {
    const todoElement = document.createElement('li');

    // <span>${todoContent}</span>
    const todoContentElement = document.createElement('span');
    todoContentElement.textContent = todo.content;
    todoElement.appendChild(todoContentElement);

    if (!todo.completed) {
      // <button class="todo-complete-button" >完了</button>
      const todoCompleteButtonElement = document.createElement('button');
      todoCompleteButtonElement.textContent = '完了';
      todoCompleteButtonElement.id = String(todo.id);
      todoCompleteButtonElement.classList.add('todo-complete-button');
      todoCompleteButtonElement.onclick = completeTodo;
      todoElement.appendChild(todoCompleteButtonElement);
    }

    if (!todo.completed) todoListElement.appendChild(todoElement);
    if (todo.completed) todoCompleteListElement.appendChild(todoElement);
  });
};

/* メイン処理 */
window.onload = renderTodos;

const todoFormElement = document.getElementById(TODO_FORM_ELEMENT_ID) as HTMLFormElement;
todoFormElement.onsubmit = (event) => {
  event.preventDefault();
  createTodo();
  clearForm();
  renderTodos();
};
/* メイン処理終わり */
