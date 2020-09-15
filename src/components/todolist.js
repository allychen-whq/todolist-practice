import React, { useState, useContext } from "react";
import TodoItem from "./todoitem";
import todoContext from "./../contexts/todoContext";

export default function TodoList2() {
  const { data, alert } = useContext(todoContext);
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="list-wrap">
      <div className="abstract">
        <span>
          {showCompleted
            ? data.length
            : data.filter((n) => !n.completed).length}{" "}
          item(s)
        </span>
        <label>
          <input
            type="checkbox"
            name="showCompleted"
            checked={showCompleted}
            onChange={() => {
              if (!data.filter((n) => n.completed).length) {
                alert.setter({ text: "No done items.", color: "blue" });
                return false;
              }
              setShowCompleted(!showCompleted);
            }}
          />
          <span>show done items</span>
        </label>
      </div>
      <ul className="list-todo">
        {data.map((n) => {
          return (
            (showCompleted || !n.completed) && <TodoItem key={n.id} data={n} />
          );
        })}
      </ul>
    </div>
  );
}
