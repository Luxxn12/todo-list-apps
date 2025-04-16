"use client";

import TodoContainer from "@/components/todo-container";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

export default function TodoApp() {
  return (
    <Provider store={store}>
      <TodoContainer />
    </Provider>
  );
}
