import React from "react";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) return <p className={styles.empty}>No tasks yet — add your first task.</p>;

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
