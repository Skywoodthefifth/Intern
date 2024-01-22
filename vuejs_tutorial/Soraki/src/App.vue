<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'

// part 2
const counter = reactive({ count: 0 })
const message = ref('Hello World!')

// part 3
const titleClass = ref('title')

// part 4
const count = ref(0)

function increment() {
  count.value++
}

// part 5
const text = ref('')

// part 6
const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}

//part 7 + 8
// give each todo a unique id
let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}

//part 9
const pElementRef = ref(null)

onMounted(() => {
  // component is now mounted.
  pElementRef.value.textContent = 'mounted!'
})

//part 10
const todoId = ref(1)
const todoData = ref(null)

async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  todoData.value = await res.json()
}

fetchData()

watch(todoId, fetchData)

//part 11
import ChildComp from './components/ChildComp.vue'

//part 12
const greeting = ref('Hello from parent')

//part 13
const childMsg = ref('No child msg yet')

//part 14
const msg = ref('from parent')

//part 15
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

function showConfetti() {
  confetti.addConfetti()
}

showConfetti()
</script>

<template>
  <!-- part 2 -->
  <h1>{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>

  <!-- part 3-->
  <h1 :class="titleClass">Make me red</h1>

  <!-- part 4-->
  <button @click="increment">count is: {{ count }}</button>

  <!-- part 5-->
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>

  <!-- part 6-->
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>

  <!-- part 7 -->
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>

  <!-- part 8 -->
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>

  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>

  <!-- part 9 -->
  <p ref="pElementRef">hello</p>

  <!-- part 10 -->
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>

  <!-- part 11 -->
  <ChildComp />

  <!-- part 12 -->
  <ChildComp :msg="greeting" />

  <!-- part 13 -->
  <ChildComp @response="(msg) => childMsg = msg" />
  <p>{{ childMsg }}</p>

  <!-- part 14 -->
  <ChildComp>Message: {{ msg }}</ChildComp>

  <!--part 15-->
  <h1 @click="showConfetti">🎉 Congratulations!</h1>
</template>

<style>
.title {
  color: red;
}

.done {
  text-decoration: line-through;
}

.h1 {
  text-align: center;
  cursor: pointer;
  margin-top: 3em;
}
</style>