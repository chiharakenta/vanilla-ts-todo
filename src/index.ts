const TODO_FORM_ELEMENT_ID = 'todoForm';
const TODO_INPUT_ELEMENT_ID = 'todoInput';
const TODO_LIST_ELEMENT_ID = 'todos';

interface Todo {
  id: number;
  content: string;
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

const createTodo = () => {
  const todoInputElement = document.getElementById(TODO_INPUT_ELEMENT_ID) as HTMLInputElement;
  const todoContent = todoInputElement.value;

  const todos = getTodos();
  if (!todos.length) {
    const newTodos: Array<Todo> = [
      {
        id: Date.now(),
        content: todoContent
      }
    ];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return;
  }
  const newTodo = {
    id: Date.now(),
    content: todoContent
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
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
  const todoListElement = document.getElementById('todoList') as HTMLUListElement;
  todoListElement.innerHTML = '';

  // 保存されたtodoが1つも無ければ終了
  const todos = getTodos();
  if (!todos.length) return;

  // todoをすべてリストに追加
  todos.forEach((todo) => {
    const todoElement = document.createElement('li');

    // <span>${todoContent}</span>
    const todoContentElement = document.createElement('span');
    todoContentElement.textContent = todo.content;

    // <button class="todo-complete-button" >完了</button>
    const todoCompleteButtonElement = document.createElement('button');
    todoCompleteButtonElement.textContent = '完了';
    todoCompleteButtonElement.id = String(todo.id);
    todoCompleteButtonElement.classList.add('todo-complete-button');
    todoCompleteButtonElement.onclick = deleteTodo;

    /*
    <li>
      <span>${todoContent}</span>
      <button class="todo-complete-button" >完了</button>
    </li> 
    */
    todoElement.appendChild(todoContentElement);
    todoElement.appendChild(todoCompleteButtonElement);

    todoListElement.appendChild(todoElement);
  });
};

/* メイン処理 */
window.onload = renderTodos;

const todoFormElement = document.getElementById(TODO_FORM_ELEMENT_ID) as HTMLFormElement;
todoFormElement.onsubmit = (event) => {
  event.preventDefault();
  console.log(event);
  createTodo();
  clearForm();
  renderTodos();
};
/* メイン処理終わり */
