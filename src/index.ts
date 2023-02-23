/* 関数定義 */
const createTodo = (text: string) => {
  // todoの作成
  const todo = document.createElement('li');
  todo.textContent = text;

  // todoの追加
  const todoList = document.getElementById('todoList') as HTMLUListElement;
  todoList.appendChild(todo);
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
  createTodo(todoText);
  clearForm(todoInput);
};
/* メイン処理ここまで */
