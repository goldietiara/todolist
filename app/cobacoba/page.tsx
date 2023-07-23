import AddButton from "@/components/AddButton";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import TestButton from "@/components/TestButton";

type TodoLists = {
  id: number;
  todo: string;
  status: boolean;
};

const getData = async () => {
  const res = await fetch(`http://localhost:4000/todoLists`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function cobacoba() {
  const data: TodoLists[] = await getData();
  return (
    <main>
      <h1>COBA COBA TodoLists:</h1>
      <TestButton></TestButton>
      <DeleteButton></DeleteButton>

      {/* {data.map((v, i, a) => {
        return (
          <li>
            {v.todo}
            <EditButton data={v} />
          </li>
        );
      })} */}
    </main>
  );
}
