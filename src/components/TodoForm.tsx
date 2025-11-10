import React, { useState } from "react";
import styles from "../styles/TodoForm.module.css";

interface Props {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button
        className={styles.button}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
