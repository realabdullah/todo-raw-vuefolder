<template>
  <div class="doit">
    <div class="header">
        <img src="../assets/todo.png" alt="To-Do">
        <p>CHECK-IT</p>
    </div>
    
    <div class="todo-body">
      <form @submit.prevent="addNewTodo">
        <div class="addtask-header">
          <p>Add A New Task!</p>
        </div>

        <input v-model="newTodo" name="newTodo" class="task-input" type="text" placeholder="Task Title..">

        <button @click.prevent="addNewTodo" class="add">
          <img src="../assets/add.png" alt="Add">
          <p>Add New Task</p>
        </button>
      </form>
      <div class="taskss">
        <div class="completed-tasks">
          <div class="uncompleted-header">
            <p>Fresh Tasks</p>
          </div>
          <div class="search search-animation">
            <input type="text" placeholder="Search tasks here...">
            <img src="../assets/search.png" alt="search">
          </div>
          <ul id="tasks" class="tasks">
            <li class="element-animation" v-for="(todo, index) in todos" :key="todo.id">
              <p>{{ todo.content }}</p>
              <img @click="taskCompleted(index)" src="../assets/uncomplete.png" alt="uncomplete">
            </li>
          </ul>
        </div>

        <div class="completed-tasks">
          <div class="completed-header">
            <p>Completed Tasks</p>
          </div>
          <ul id="tasks" class="tasks">
            <li class="completed-animation" v-for="(completedTodo, index) in completedTodos" :key="completedTodo.id">
              <p>{{ completedTodo.content }}</p>
              <img @click="deleteTask(index)" src="../assets/complete.png" alt="uncomplete">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newTodo: '',
      id: null,
      done: null,
      content: '',
      todos: [],
      completedTodos: []
    }
  },
  methods: {
    addNewTodo() {
      if(this.newTodo.length > 0) {
        this.todos.push({
          id: Date.now(),
          done: false,
          content: this.newTodo
        });
        console.log(this.todos)
        this.newTodo = ''
        document.querySelector('.uncompleted-header').style.display = "block";
        if(this.todos.length > 5) {
          document.querySelector('.search').style.display = "flex";
        }
      }
    },
    taskCompleted(index) {
      if(this.todos.length) {
        this.completedTodos.push(this.todos[index]);
        this.todos.splice(index, 1);
        if(this.completedTodos.length > 0) {
          document.querySelector('.completed-header').style.display = "block";
        }
        if(this.todos.length <= 0) {
          document.querySelector('.uncompleted-header').style.display = "none";
          document.querySelector('.search').style.display = "none";
        }
      }
      console.log(this.completedTodos);
    },
    deleteTask(index) {
      this.completedTodos.splice(index, 1);
      console.log(this.completedTodos);
      if(this.completedTodos.length <= 0) {
        document.querySelector('.completed-header').style.display = "none";
      }
    }
  }
  /*
  this.completedTodos.push(index, {
        id: index.todos.id

  setup() {
    const newTodo = ref('');
    const todos = ref([]);
    const completedTodos = ref([]);

    function addNewTodo() {
      if(newTodo.value.length > 0) {
        todos.value.push({
        id: Date.now(),
        done: false,
        content: newTodo.value
      });
      newTodo.value = '';

      if(todos.value.length > 5) {
        document.querySelector('.search').style.display = "flex";
      }
      document.querySelector('.completed-header').style.display = "block";
      }
    }

    function taskCompleted(index) {
      completedTodos.value.push(index, {
        id: index.id,
        done: true,
        content: this.index
      });
      console.log(completedTodos);
    }

    function deleteTask(index) {
      todos.value.splice(index, 1);
      console.log(completedTodos);
    }

    return {
      todos,
      newTodo,
      addNewTodo,
      taskCompleted,
      deleteTask
    }
  } */
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: #131415;
  }

  .element-animation{
    animation: animationFrames ease 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
  }

  @keyframes animationFrames{
    0% {
      opacity:0;
      transform:  translate(-1500px,0px);
    }
    60% {
      opacity:1;
      transform:  translate(30px,0px);
    }
    80% {
      transform:  translate(-10px,0px);
    }
    100% {
      opacity:1;
      transform:  translate(0px,0px);
    }
  }

  .doit{
    padding: 20px;
    height: 100%;
  }

  .header{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header p{
    color: #fff;
    font-size: 25px;
    font-weight: bold;
  }

  .search-animation{
    animation-name: bounce-top;
    animation-duration: 1.2s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: both;
  }

  @keyframes bounce-top{
    0%{
      -webkit-transform: translateY(-45px);
      transform: translateY(-45px);
    }
    25%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40%{
      -webkit-transform: translateY(-24px);
      transform: translateY(-24px);
    }
    55%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    65%{
      -webkit-transform: translateY(-12px);
      transform: translateY(-12px);
    }
    75%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    82%{
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }
    87%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    93%{
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .search{
    display: none;
    margin-top: 15px;
    align-items: center;
    justify-content: flex-end;
  }

  .search input{
    width: 50%;
    border: none;
    padding: 10px 20px;
    border-radius: 7px;
    background-color: #21242A;
  }

  .search ::placeholder{
    font-weight: bold;
    font-style: italic;
    color: #fff;
  }

  .search input:focus{
    color: #fff;
    outline: none;
    font-weight: bold;
  }

  .search img{
    position: relative;
    left: -35px;
  }

  .task-input {
    width: 100%;
    border: none;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 7px;
    background-color: #21242A;
  }

  .task-input::placeholder{
    font-weight: bold;
    font-style: italic;
    color: #fff;
  }

  .task-input:focus{
    outline: none;
    font-weight: bold;
    color: #fff;
  }

  .taskss{
    margin-top: 30px;
    text-align: center;
  }

  .completed-header {
    display: none;
  }

  .addtask-header p {
    font-size: 25px;
    font-weight: bold;
    color: #fff;
  }

  .completed-header p{
    font-size: 25px;
    font-weight: bold;
    color: #fff;
  }

  .tasks li{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
    border-radius: 7px;
    background-color: #21242A;
}

  .tasks li p{
    color: #fff;
    font-weight: bold;
  }

  .uncompleted-tasks{
    margin-top: 30px;
  }

  .uncompleted-header {
    display: none;
  }

  .uncompleted-header p{
    font-size: 25px;
    font-weight: bold;
    color: #fff;
  }

  .uncomplete-tasks li{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
    border-radius: 7px;
    background-color: #21242A;
  }

  .uncomplete-tasks li p{
    color: #fff;
    font-weight: bold;
  }

  .completed-animation {
    animation-name: rotate-90-right-ccw;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
  }

  @keyframes rotate-90-right-ccw {
    0%{
      -webkit-transform: scale(.2);
      transform: scale(.2);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
    100%{
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
  }
  .add{
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #17B978;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
  }

  .add:hover{
    opacity: .9;
  }

  .add img{
    margin-right: 10px;
  }

  .add p{
    color: #fff;
    font-weight: bold;
  }

  li{
    list-style: none;
  }

  @media(min-width: 900px) {
    .todo-body {
      display: grid;
      grid-template-columns: 3fr 6fr;
      gap: 20px;
    }

    .taskss {
      display: grid;
      grid-template-columns: 3fr 3fr;
      grid-gap: 20px;
      margin-top: 10px;
    }

    .addtask-header {
      margin-top: 10px;
    }

    .task-input {
      margin-top: 10px;
    }

  }
</style>
