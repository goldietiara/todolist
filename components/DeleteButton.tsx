"use client";
import React, { useRef } from "react";
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

const DeleteButton: React.FunctionComponent<Props> = ({ data }: Props) => {
  const childRef = useRef<PropsImperativeHandle>(null);

  const router = useRouter();
  const deleteTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/todoLists/${data.id}`, {
      method: "DELETE",
    });

    childRef.current?.setIsOpen(false);
    console.log(`todo "${data.todo}" is deleted`);
    router.refresh();
  };

  const closeModal = () => {
    if (childRef.current) {
      childRef.current?.setIsOpen(false);
    }
  };

  return (
    <ForwardModalAction
      buttonName="delete"
      ref={childRef}
      className="hover:underline px-3"
    >
      <div className="px-4 py-2 border-1 border-black">
        <p>Are you sure want to delete:</p>
      </div>
      <div className="px-4 py-2 border-x-1 border-b-1 border-black font-medium">
        {data.todo}
      </div>
      <div className="grid grid-cols-2 border-x-1 border-b-1 border-black">
        <input
          type="button"
          value="cancel"
          className="px-4 py-2 cursor-pointer border-r-1 border-black hover:bg-black hover:text-white"
          onClick={closeModal}
        />
        <button
          className="px-4 py-2 border-r-1 border-black hover:bg-black hover:text-white"
          onClick={deleteTodo}
        >
          delete
        </button>
      </div>
    </ForwardModalAction>
  );
};

export default DeleteButton;
