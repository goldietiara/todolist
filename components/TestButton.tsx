"use client";
import React, { useCallback, useRef, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import ForwardModalAction, { PropsImperativeHandle } from "./SecondModal";

const TestButton: React.FunctionComponent = () => {
  const childRef = useRef<PropsImperativeHandle>(null);

  const [form, setForm] = useState({
    todo: "",
    status: "",
  });
  const router = useRouter();
  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/todoLists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: form.todo, status: form.status }),
    });
    childRef.current?.setIsOpen((prefState) => !prefState);

    console.log(form.todo);
    router.refresh();
  };

  const forwardModalActionHandle = () => {
    if (childRef.current) {
      childRef.current?.setIsOpen((prefState) => (prefState = false));
    }
  };

  return (
    <ForwardModalAction buttonName="test" ref={childRef}>
      <form className="grid grid-cols-1" onSubmit={addTodo}>
        <div className="px-4 py-2 border-1 border-black font-medium">
          Add New Todo
        </div>
        <input
          className="px-4 py-2 border-x-1 border-b-1 border-black"
          type="text"
          placeholder="type here!"
          onChange={(e) => setForm({ todo: e.target.value, status: "false" })}
        />
        <div className="grid grid-cols-2 border-x-1 border-b-1 border-black">
          <input
            type="button"
            value="cancel"
            className="px-4 py-2 border-r-1 border-black hover:bg-black hover:text-white"
            onClick={forwardModalActionHandle}
          />
          <input
            className="px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </ForwardModalAction>
  );
};

export default TestButton;
