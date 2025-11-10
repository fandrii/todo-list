import React from "react";
import styles from "../styles/Filter.module.css";
import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  onClearCompleted: () => void;
}

const Filter: React.FC<Props> = ({ todos, onClearCompleted }) => {
  const total = todos.length;
  const active = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.stats}>
        <span>Total: {total}</span>
        <span>Active: {active}</span>
        <span>Completed: {completed}</span>
      </div>
      <div>
        <button
          className={styles.clearBtn}
          onClick={onClearCompleted}
          disabled={completed === 0}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default Filter;
