import React, { useState, useEffect } from "react";
import TodoList from "./components/todolist";
import TodoForm from "./components/todoform";
import todoContext from "./contexts/todoContext";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [newItemId, setNewItemId] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    text: "",
    color: "red"
  });

  useEffect(() => {
    if (alert.text) {
      setShowAlert(true);
      const reset = setTimeout(() => {
        setShowAlert(false);
        setAlert({ text: "", color: "" });
      }, 1500);
      return () => clearTimeout(reset);
    }
  }, [alert.text]);

  const completeItem = (id) => {
    setData((prev) => {
      const updatedData = prev.map((n) => {
        if (n.id === id) {
          const today = new Date();
          return {
            ...n,
            completed: !n.completed,
            completedDate:
              today.toLocaleDateString("zh-TW") +
              " " +
              today.toLocaleTimeString("zh-TW", { hour12: false })
          };
        }
        return n;
      });
      return updatedData;
    });
  };
  const addItem = () => {
    setData((prev) => {
      const newItem = {
        id: newItemId,
        title: todoInput,
        completed: false,
        completedDate: ""
      };
      const updatedData = prev;
      updatedData.push(newItem);
      return updatedData;
    });
    setNewItemId(newItemId + 1);
    setTodoInput("");
  };
  const deleteItem = (id) => {
    setData((prev) => {
      const updatedData = prev.filter((n) => n.id !== id);
      return updatedData;
    });
  };

  return (
    <todoContext.Provider
      value={{
        data: data,
        alertSetter: setAlert,
        methods: {
          deleteItem: deleteItem,
          completeItem: completeItem
        }
      }}
    >
      <main className="container">
        <h1 className="text-center">
          TODO<b>LIST</b>
        </h1>
        <h4 className="text-center">
          A Simple todolist built react hooks & context
        </h4>
        <TodoForm
          todoInput={todoInput}
          addItem={addItem}
          handleInput={(e) => {
            setTodoInput(e.target.value);
          }}
        />
        <TodoList />

        <div
          className={`error ${showAlert ? "visible" : ""}`}
          style={{ color: alert.color }}
        >
          {alert.text}
        </div>
      </main>
    </todoContext.Provider>
  );
}
