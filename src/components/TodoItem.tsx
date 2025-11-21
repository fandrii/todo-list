import React, { useState } from "react";
import type { Todo } from "../types";
import styles from "../styles/TodoItem.module.css";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onEdit, onDelete }) => {
  // console.log("ittem:", todo);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
      setEditing(false);
    }
  };

  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle ${todo.text}`}
      />
      {!editing ? (
        <div className={styles.content}>
          <span className={todo.completed ? styles.completed : ""}>{todo.text}</span>
          <div className={styles.actions}>
            <button
              onClick={() => setEditing(true)}
              className={styles.actionBtn}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className={styles.actionBtn}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.editRow}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.editInput}
          />
          <button
            onClick={save}
            className={styles.actionBtn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setValue(todo.text);
            }}
            className={styles.actionBtn}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
