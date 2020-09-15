import React, { useContext } from "react";
import todoContext from "./../contexts/todoContext";

export default function TodoItem(props) {
  const { alert, methods } = useContext(todoContext);

  return (
    <li className={props.data.completed ? "item-todo completed" : "item-todo"}>
      <span className="item-content">{props.data.title}</span>
      <span className="action-or-date">
        <span className="date">完成時間: {props.data.completedDate}</span>
        <label className="btn-underline">
          <input
            className="hidden"
            type="checkbox"
            name={`completed${props.data.id}`}
            checked={props.data.completed}
            onChange={(event) => {
              alert.setter({
                text: `You've done [ ${props.data.title} ]. Great!`,
                color: "green"
              });
              methods.completeItem(props.data.id);
            }}
          />
          Mark as done
        </label>
        <button
          className="btn-underline"
          type="button"
          onClick={() => {
            alert.setter({
              text: `[ ${props.data.title} ] has been deleted.`,
              color: "red"
            });
            methods.deleteItem(props.data.id);
          }}
        >
          Delete
        </button>
      </span>
    </li>
  );
}
