const TODO_FORM_ELEMENT_ID = 'todoForm';
const TODO_INPUT_ELEMENT_ID = 'todoInput';
const TODO_LIST_ELEMENT_ID = 'todos';

const clearForm = () => {
  const todoInputElement = document.getElementById(TODO_INPUT_ELEMENT_ID) as HTMLInputElement;
  todoInputElement.value = '';
};

const createTodo = () => {
  const todoInputElement = document.getElementById(TODO_INPUT_ELEMENT_ID) as HTMLInputElement;
  const todoContent = todoInputElement.value;

  const todos = localStorage.getItem('todos');
  if (!todos) {
    localStorage.setItem('todos', todoContent);
    return;
  }
  localStorage.setItem('todos', `${todos},${todoContent}`);
};

const renderTodos = () => {
  // todoリストを消去
  const todoListElement = document.getElementById('todoList') as HTMLUListElement;
  todoListElement.innerHTML = '';

  // 保存されたtodoが1つも無ければ終了
  const todos: Array<string> | undefined = localStorage.getItem(TODO_LIST_ELEMENT_ID)?.split(',');
  if (!todos) return;

  // todoをすべてリストに追加
  todos.forEach((todoContent) => {
    const todoElement = document.createElement('li');
    todoElement.textContent = todoContent;
    todoListElement.appendChild(todoElement);
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
