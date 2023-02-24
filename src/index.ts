/* 関数定義 */
const createTodoElement = (text: string) => {
  // todoの作成
  const todoElement = document.createElement('li');
  todoElement.textContent = text;
  return todoElement;
};

const appendTodo = (todoElement: HTMLLIElement) => {
  // todoの追加
  const todoList = document.getElementById('todoList') as HTMLUListElement;
  todoList.appendChild(todoElement);
};

const clearForm = (todoInput: HTMLInputElement) => {
  todoInput.value = '';
};
/* 関数定義ここまで */

/* メイン処理 */
const todoForm = document.getElementById('todoForm') as HTMLFormElement;
todoForm.onsubmit = (event) => {
  event.preventDefault();
  const todoInput = document.getElementById('todoInput') as HTMLInputElement;
  const todoText = todoInput.value;
  const todoElement = createTodoElement(todoText);
  appendTodo(todoElement);
  clearForm(todoInput);
};
/* メイン処理ここまで */
