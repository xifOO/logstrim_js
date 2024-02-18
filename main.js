async function methodGetTodos() {
  let xhrUsers = new XMLHttpRequest();
  xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhrUsers.send();

  xhrUsers.onload = function () {
    if (xhrUsers.status === 200) {
      let users = JSON.parse(xhrUsers.responseText);

      let xhrTodos = new XMLHttpRequest();
      xhrTodos.open('GET', 'https://jsonplaceholder.typicode.com/todos');
      xhrTodos.send();

      xhrTodos.onload = function () {
        if (xhrTodos.status === 200) {
          let todos = JSON.parse(xhrTodos.responseText);

          if (todos && Array.isArray(todos) && todos.length > 0) {
            todos.forEach((todo, index) => {
              let row = '<tr>';
              let user = users.find((user) => user.id === todo.userId);

              row += '<td>' +(Number(index) + 1) + '</td>';
              if (user) {
                row += '<td>' + user.name + '</td>';
              }
              row += '<td>' + todo.title + '</td>';
              row += '<td><input class="form-check-input" type="checkbox" ' + (todo.completed ? 'checked' : '') + '></td>';
              row += '</tr>';
              $('table tbody').append(row);
            });
          }
        } else {
          console.error('Ошибка =(');
        }
      }
    }
  }
}
