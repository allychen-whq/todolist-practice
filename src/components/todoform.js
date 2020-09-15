import React, { useState, useEffect, useContext } from "react";
import todoContext from "./../contexts/todoContext";

export default function TodoForm(props) {
  const { alert, methods } = useContext(todoContext);
  const validate = function (e) {
    e.preventDefault();
    if (!props.todoInput) {
      alert.setter({
        text: "Please write down your task description.",
        color: "red"
      });
      return false;
    }
    methods.addItem();
  };
  return (
    <form className="input-wrap" onSubmit={(e) => validate(e)}>
      <input
        className="input-underline"
        type="text"
        name="todoInput"
        value={props.todoInput}
        onChange={(event) => props.handleInput(event)}
        placeholder="Add your task here..."
      />
      <button type="button" className="btn-add" onClick={(e) => validate(e)}>
        Add
      </button>
    </form>
  );
}
