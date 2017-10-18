var MODULE = (function() {
  return {
    init: function(selector) {
      //добавялем стили
      var css = "@import url('https://fonts.googleapis.com/css?family=Roboto');ul,li{ list-style-type:none; margin:0; padding:0}.to-do-list{ width:460px; height:630px; padding:0 20px; border-radius:7px; display:flex; background-color:#fefeff; flex-direction:column; font-family:Roboto; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2)}.new-task{ height:180px; width:100%; padding:20px 0; border-bottom:1px solid #606b7c; display:flex; justify-content:space-between; align-items:center; flex-direction:column}.new-task__text{ font-size:20px; width:459px}.new-task__options{ width:455px; height:25px; font-size:18px; margin:0; padding:0}.tasks-options{ height:50px; width:100%; border-bottom:1px solid #606b7c; display:flex; align-items:center; justify-content:space-around}.task-option{ width:175px; font-size:18px; border:none}.tasks{ overflow:auto; height:340px}.list__item{ width:100%; height:50px; font-size:18px; position:relative; text-decoration:none; padding:5px 0 0 0; border-bottom:1px solid gray}.deadline{ font-size:16px; color:gray}.deadline--padding{ padding:0 0 0 20px}.list__item--line{ text-decoration:line-through}.close{ height:55px; width:55px; line-height:55px; text-align:center; font-size:25px; position:absolute; right:0; top:0; cursor:pointer}.close:hover{ background-color:gray}";;
      var style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);

      //обертка todo list
      var divToDo = document.createElement("div");
      divToDo.className = "to-do-list";

      var date = new Date();
      var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      var divNewTask = document.createElement("div");
      divToDo.appendChild(divNewTask);

      var spanTaskText = document.createElement("span");
      var inputTask = document.createElement("input");
      var spanTaskText2 = document.createElement("span");
      var inputDate = document.createElement("input");
      var addTask = document.createElement("button");

      divNewTask.className = "new-task";
      spanTaskText.className = "new-task__text";
      spanTaskText2.className = "new-task__text";
      inputTask.className = "new-task__name new-task__options";
      inputDate.className = "new-task__options";
      addTask.className = "new-task__options";
      inputDate.id = "date";

      spanTaskText.innerHTML = "Task name:";
      spanTaskText2.innerHTML = "Task deadline:";
      addTask.innerHTML = "Add task";
      inputTask.type = "text";
      inputDate.type = "date";
      addTask.type = "button";
      inputTask.placeholder = "Title...";
      inputTask.maxLength = 40;
      inputDate.min = currentDate;
      inputDate.value = currentDate;
      addTask.addEventListener("click", newItem);

      divNewTask.appendChild(spanTaskText);
      divNewTask.appendChild(inputTask);
      divNewTask.appendChild(spanTaskText2);
      divNewTask.appendChild(inputDate);
      divNewTask.appendChild(addTask);

      //блок с опциями отображения задач
      var divTaskOptions = document.createElement("div");
      divToDo.appendChild(divTaskOptions);
      divTaskOptions.className = "tasks-options";
      var selectTasks = document.createElement("select");
      var selectDeadline = document.createElement("select");
      selectTasks.id = "tasks";
      selectDeadline.id = "deadlines";
      selectTasks.className = "task-option";
      selectDeadline.className = "task-option";

      var optionT1 = document.createElement("option");
      var optionT2 = document.createElement("option");
      var optionT3 = document.createElement("option");
      var optionD1 = document.createElement("option");
      var optionD2 = document.createElement("option");
      var optionD3 = document.createElement("option");

      optionT1.innerHTML = "All tasks";
      optionT2.innerHTML = "Finished";
      optionT3.innerHTML = "Unfinished";
      optionD1.innerHTML = "All deadlines";
      optionD2.innerHTML = "Tomorrow";
      optionD3.innerHTML = "Next 7 days";

      divTaskOptions.appendChild(selectTasks);
      divTaskOptions.appendChild(selectDeadline);
      selectTasks.appendChild(optionT1);
      selectTasks.appendChild(optionT2);
      selectTasks.appendChild(optionT3);
      selectDeadline.appendChild(optionD1);
      selectDeadline.appendChild(optionD2);
      selectDeadline.appendChild(optionD3);

      //блок со списком задач
      var divTasks = document.createElement("div");
      divToDo.appendChild(divTasks);
      divTasks.className = "tasks";
      var list = document.createElement("ul");
      list.className = "list";
      list.id = "tasksList";
      divTasks.appendChild(list);

      //фильтры
      selectTasks.addEventListener("change", selectTask);
      selectTasks.addEventListener("change", selectDeadlines);
      selectDeadline.addEventListener("change", selectTask);
      selectDeadline.addEventListener("change", selectDeadlines);

      //сортировка выполнено/не выполнено
      function selectTask() {
        var sel = document.getElementById("tasks").options[document.getElementById("tasks").selectedIndex].value;
        switch (sel) {
          case "All tasks":
            for (var i = 0; i < document.getElementById("tasksList").childNodes.length; i++) {
              document.getElementById("tasksList").childNodes[i].style.display = "";
            }
            break;
          case "Finished":
            for (var i = 0; i < document.getElementById("tasksList").childNodes.length; i++) {
              if (!document.getElementById("tasksList").childNodes[i].firstChild.checked) {
                document.getElementById("tasksList").childNodes[i].style.display = "none";
              } else {
                document.getElementById("tasksList").childNodes[i].style.display = "";
              }
            }
            break;
          case "Unfinished":
            for (var i = 0; i < document.getElementById("tasksList").childNodes.length; i++) {
              if (document.getElementById("tasksList").childNodes[i].firstChild.checked) {
                document.getElementById("tasksList").childNodes[i].style.display = "none";
              } else {
                document.getElementById("tasksList").childNodes[i].style.display = "";
              }
            }
            break;
        }
      }

      //сортировка по дэдлайну
      function selectDeadlines() {
        var spanDate = [];
        var curspanDate;
        var sel = document.getElementById("deadlines").options[document.getElementById("deadlines").selectedIndex].value;
        switch (sel) {
          case "All deadlines":
            break;
          case "Tomorrow":
            var tommorowDate = new Date(date.getFullYear(), (date.getMonth()), date.getDate() + 1);
            for (var i = 0; i < document.getElementById("tasksList").childNodes.length; i++) {
              if (document.getElementById("tasksList").childNodes[i].style.display == "") {
                spanDate = document.getElementById("tasksList").childNodes[i].lastChild.textContent.split(".");
                curspanDate = new Date(spanDate[2], spanDate[1] - 1, spanDate[0]);
                if (convertDateForCompare(curspanDate) != convertDateForCompare(tommorowDate)) {
                  document.getElementById("tasksList").childNodes[i].style.display = "none";
                }
              }
            }
            break;
          case "Next 7 days":
            var nextDate = new Date(date.getFullYear(), (date.getMonth()), date.getDate() + 7);
            for (var i = 0; i < document.getElementById("tasksList").childNodes.length; i++) {
              if (document.getElementById("tasksList").childNodes[i].style.display == "") {
                spanDate = document.getElementById("tasksList").childNodes[i].lastChild.textContent.split(".");
                curspanDate = new Date(spanDate[2], spanDate[1] - 1, spanDate[0]);
                if (convertDateForCompare(curspanDate) <= convertDateForCompare(nextDate)) {
                  document.getElementById("tasksList").childNodes[i].style.display = "";
                } else {
                  document.getElementById("tasksList").childNodes[i].style.display = "none";
                }
              }
            }
            break;
        }
      }

      //добавление новой задачи
      var idcounter = makeCounter();

      function newItem() {
        var inputValue = document.querySelector(".new-task__name").value;
        if (inputValue === '') {
          alert("Введите какую-нибудь задачу");
        } else {
          var li = document.createElement("li");
          var checkbox = document.createElement("input");
          var spanClose = document.createElement("span");
          var spanDeadline = document.createElement("span");
          var spanDate = document.createElement("span");
          var list = document.querySelector(".list");

          checkbox.type = "checkbox";
          spanClose.innerHTML = "×";
          spanDeadline.innerHTML = "Deadline: ";
          spanDate.innerHTML = convertToDotsdate(document.getElementById("date").value);
          li.innerHTML = inputValue + "<br>";

          spanClose.className = "close";
          spanDeadline.className = "deadline deadline--padding";
          spanDate.className = "deadline";
          li.className = "list__item";
          checkbox.id = "checkbox" + idcounter();
          spanClose.id = "span" + idcounter();

          spanClose.addEventListener("click", deleteItem);
          checkbox.addEventListener("click", completeTask);

          list.appendChild(li);
          li.insertBefore(checkbox, li.firstChild)
          li.appendChild(spanClose);
          li.appendChild(spanDeadline);
          li.appendChild(spanDate);
          document.querySelector(".new-task__name").value = "";
        }
        selectTask();
        selectDeadlines();
      }

      //преобразование даты из календаря в формат для вывода даты дэдлайна
      function convertToDotsdate(date) {
        var arr = date.split("-");
        arr.reverse();
        return arr.join(".");
      }

      //перобразование даты для сравнения при сортировке
      function convertDateForCompare(date) {
        return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
      }

      //удалить задачу
      function deleteItem() {
        document.getElementById(event.target.id).parentNode.parentNode.removeChild(document.getElementById(event.target.id).parentNode);
      }

      //флаг выполнено/не выполнено
      function completeTask() {
        var check = document.getElementById(event.target.id).checked;
        if (check) {
          document.getElementById(event.target.id).parentNode.className = "list__item list__item--line";
        } else {
          document.getElementById(event.target.id).parentNode.className = "list__item";
        }
        selectTask();
      }

      //счетчик формирования уникального id
      function makeCounter() {
        var currentCount = 1;
        return function() {
          return currentCount++;
        };
      }

      //добавляем todo list на страницу
      if (document.getElementById(selector)) {
        document.getElementById(selector).appendChild(divToDo);
      } else {
        var selector = "." + selector;
      }
      if (document.querySelector(selector)) {
        document.querySelector(selector).appendChild(divToDo);
      }

    }
  }
}());
