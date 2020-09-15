import React, { useContext } from "react";
import todoContext from "./../contexts/todoContext";

export default function TodoForm(props) {
  const { addItem, todoInput, handleInput } = props;
  const { alertSetter } = useContext(todoContext);
  const validate = function (e) {
    e.preventDefault();
    if (!todoInput.trim()) {
      alertSetter({
        text: "Please write down your task description.",
        color: "red"
      });
      return false;
    }
    addItem();
  };
  return (
    <form className="input-wrap" onSubmit={(e) => validate(e)}>
      <input
        className="input-underline"
        type="text"
        name="todoInput"
        value={todoInput}
        onChange={(event) => handleInput(event)}
        placeholder="Add your task here..."
      />
      <button type="button" className="btn-add" onClick={(e) => validate(e)}>
        Add
      </button>
    </form>
  );
}
