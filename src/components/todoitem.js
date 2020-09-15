import React, { useContext } from "react";
import todoContext from "./../contexts/todoContext";

export default function TodoItem(props) {
  const { item } = props;
  const { alertSetter, methods } = useContext(todoContext);

  return (
    <li className={item.completed ? "item-todo completed" : "item-todo"}>
      <span className="item-content">{item.title}</span>
      <span className="action-or-date">
        <span className="date">完成時間: {item.completedDate}</span>
        <label className="btn-underline">
          <input
            className="hidden"
            type="checkbox"
            name={`completed${item.id}`}
            checked={item.completed}
            onChange={(event) => {
              alertSetter({
                text: `You've done [ ${item.title} ]. Great!`,
                color: "green"
              });
              methods.completeItem(item.id);
            }}
          />
          Mark as done
        </label>
        <button
          className="btn-underline"
          type="button"
          onClick={() => {
            alertSetter({
              text: `[ ${item.title} ] has been deleted.`,
              color: "red"
            });
            methods.deleteItem(item.id);
          }}
        >
          Delete
        </button>
      </span>
    </li>
  );
}
