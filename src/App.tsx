import { v4 as uuidv4 } from "uuid";
import type { Todo } from "./types";
import { useLocalStorage } from "./utils/useLocalStorage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import styles from "./styles/App.module.css";

const STORAGE_KEY = "todo_app_v1";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((task) => !task.completed));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>
      <div className={styles.card}>
        <TodoForm onAdd={addTodo} />
        <Filter
          todos={todos}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={todos}
          onToggle={(id) => {
            const task = todos.find((x) => x.id === id);
            // console.log("toggle", task);

            if (task) updateTodo(id, { completed: !task.completed });
          }}
          onEdit={(id, text) => updateTodo(id, { text })}
          onDelete={deleteTodo}
        />
      </div>
      <footer className={styles.footer}>
        <small>Built with React + TypeScript • Data stored in LocalStorage</small>
      </footer>
    </div>
  );
}

export default App;
