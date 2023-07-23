"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ForwardModalAction, { PropsImperativeHandle } from "./SecondModal";

interface TodoLists {
  id: number;
  todo: string;
  status: boolean;
}

interface Props {
  data: TodoLists;
}

const EditButton: React.FunctionComponent<Props> = ({ data }: Props) => {
  const childRef = useRef<PropsImperativeHandle>(null);

  const [form, setForm] = useState({
    todo: data.todo,
  });

  const router = useRouter();
  const editTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/todoLists/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: form.todo }),
    });
    childRef.current?.setIsOpen(false);
    console.log(form.todo);
    router.refresh();
  };

  const closeModal = () => {
    if (childRef.current) {
      childRef.current?.setIsOpen(false);
    }
  };

  return (
    <ForwardModalAction
      buttonName="edit"
      ref={childRef}
      className="hover:underline px-3"
    >
      <form className="grid grid-cols-1" onSubmit={editTodo}>
        <div className="px-4 py-2 border-1 border-black font-medium">
          Add New Todo
        </div>
        <input
          className="px-4 py-2 border-x-1 border-b-1 border-black"
          type="text"
          placeholder={data.todo}
          value={form.todo}
          onChange={(e) => setForm({ todo: e.target.value })}
        />
        <div className="grid grid-cols-2 border-x-1 border-b-1 border-black">
          <input
            type="button"
            value="cancel"
            className="px-4 py-2 cursor-pointer border-r-1 border-black hover:bg-black hover:text-white"
            onClick={closeModal}
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

export default EditButton;
