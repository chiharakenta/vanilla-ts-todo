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

const completeTodo = (todoId: number) => {
  const newTodos = getTodos();
  const newTodoIndex = getTodoIndex(newTodos, todoId)!;
  newTodos[newTodoIndex].completed = true;
  localStorage.setItem('todos', JSON.stringify(newTodos));
  renderTodos();
};

const backTodo = (todoId: number) => {
  const newTodos = getTodos();
  const newTodoIndex = getTodoIndex(newTodos, todoId)!;
  newTodos[newTodoIndex].completed = false;
  localStorage.setItem('todos', JSON.stringify(newTodos));
  renderTodos();
};

const deleteTodo = (todoId: number) => {
  const todos = getTodos();
  const newTodos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  renderTodos();
};

const createTodoElement = (todo: Todo) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo';
  todoElement.draggable = true;
  todoElement.ondragstart = (event) => {
    const { id, content, completed } = todo;
    event.dataTransfer?.setData('text/plain', JSON.stringify({ id, content, completed }));
  };
  return todoElement;
};

const createTodoContentElement = (todoContent: string) => {
  const todoContentElement = document.createElement('span');
  todoContentElement.textContent = todoContent;
  // <span>${todoContent}</span>
  return todoContentElement;
};

const createTodoCompleteButtonElement = (todoId: string) => {
  const todoCompleteButtonElement = document.createElement('input');
  todoCompleteButtonElement.type = 'checkbox';
  todoCompleteButtonElement.id = todoId;
  todoCompleteButtonElement.className = 'todo-check-button';
  todoCompleteButtonElement.onclick = () => completeTodo(parseInt(todoId));
  // <button id="${todo.id}" class="todo-complete-button">完了</button>
  return todoCompleteButtonElement;
};

const createTodoBackButtonElement = (todoId: string) => {
  const todoCompleteButtonElement = document.createElement('input');
  todoCompleteButtonElement.type = 'checkbox';
  todoCompleteButtonElement.checked = true;
  todoCompleteButtonElement.id = todoId;
  todoCompleteButtonElement.className = 'todo-check-button';
  todoCompleteButtonElement.onclick = () => backTodo(parseInt(todoId));
  // <button id="${todo.id}">戻す</button>
  return todoCompleteButtonElement;
};

const createTodoDeleteButtonElement = (todoId: string) => {
  const todoDeleteButtonElement = document.createElement('button');
  todoDeleteButtonElement.textContent = '削除';
  todoDeleteButtonElement.id = todoId;
  todoDeleteButtonElement.onclick = () => deleteTodo(parseInt(todoId));
  // <button id="${todo.id}">削除</button>
  return todoDeleteButtonElement;
};

const renderTodos = () => {
  // todoリスト内を一度空にする
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
    const todoElement = createTodoElement(todo);

    // <span>${todo.content}</span>
    const todoContentElement = createTodoContentElement(todo.content);

    if (!todo.completed) {
      // <button id="${todo.id}" class="todo-complete-button">完了</button>
      const todoCompleteButtonElement = createTodoCompleteButtonElement(String(todo.id));
      todoElement.appendChild(todoCompleteButtonElement);
      todoElement.appendChild(todoContentElement);
      const todoDeleteButtonElement = createTodoDeleteButtonElement(String(todo.id));
      // todoElement.appendChild(todoDeleteButtonElement);
      todoListElement.appendChild(todoElement);
    }

    if (todo.completed) {
      const todoBackButtonElement = createTodoBackButtonElement(String(todo.id));
      todoElement.appendChild(todoBackButtonElement);
      todoElement.appendChild(todoContentElement);
      // const todoDeleteButtonElement = createTodoDeleteButtonElement(String(todo.id));
      // todoElement.appendChild(todoDeleteButtonElement);
      todoCompleteListElement.appendChild(todoElement);
    }
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

const todoList = document.getElementById(TODO_LIST_ELEMENT_ID) as HTMLUListElement;
todoList.ondragover = (event) => event.preventDefault();
todoList.ondragenter = (event) => event.preventDefault();
todoList.ondrop = (event) => {
  const todoPlainText = event.dataTransfer?.getData('text/plain');
  if (!todoPlainText) return;
  const todo = JSON.parse(todoPlainText) as Todo;
  if (todo.completed) backTodo(todo.id);
};

const todoCompleteList = document.getElementById(TODO_COMPLETE_LIST_ELEMENT_ID) as HTMLUListElement;
todoCompleteList.ondragover = (event) => event.preventDefault();
todoCompleteList.ondragenter = (event) => event.preventDefault();
todoCompleteList.ondrop = (event) => {
  const todoPlainText = event.dataTransfer?.getData('text/plain');
  if (!todoPlainText) return;
  const todo = JSON.parse(todoPlainText) as Todo;
  if (!todo.completed) completeTodo(todo.id);
};
/* メイン処理終わり */
