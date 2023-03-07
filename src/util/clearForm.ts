export const clearForm = (elementId: string) => {
  const todoInputElement = document.getElementById(elementId) as HTMLInputElement;
  todoInputElement.value = '';
};
