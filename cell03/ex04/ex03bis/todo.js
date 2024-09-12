$(document).ready(function () {
  let todoId = 0;
  $(window).on("load", loadTodo);

  function saveTodo() {
    const todos = [];
    const links = $("#ft_list").find("a").toArray();
    links.forEach((link) => {
      const todo = {
        id: link.id,
        text: encodeURIComponent($(link).find(".todo").text()), // Encode text
      };
      todos.push(todo);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
  }

  function loadTodo() {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todos="));
    if (cookieString) {
      const todos = JSON.parse(cookieString.split("=")[1]);
      todos.forEach((todo) => {
        $("<a></a>")
          .attr("id", todo.id)
          .click(function () {
            deleteTodo(this.id);
          })
          .append($("<div></div>").addClass("todo").text(decodeURIComponent(todo.text))) // Decode text
          .appendTo($("#ft_list"));
      });
      todoId = todos.length
        ? Math.max(...todos.map((todo) => parseInt(todo.id))) + 1
        : 0;
    }
  }

  $(".new-btn").click(newTodo);
  
  function newTodo() {
    let todoMsg = prompt("Enter a new todo:");
    if (todoMsg) {
      var newLink = $("<a></a>")
        .attr("id", todoId++)
        .click(function () {
          deleteTodo(this.id);
        });
      $("<div></div>").addClass("todo").text(todoMsg).appendTo(newLink);
      $("#ft_list").prepend(newLink);
      saveTodo();
    }
  }

  function deleteTodo(id) {
    let deleteMsg = confirm("Are you sure you want to delete this todo?");
    if (deleteMsg) {
      $("#" + id).remove();
      saveTodo();
    }
  }
});
