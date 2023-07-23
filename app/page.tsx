import AddButton from "@/components/AddButton";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";

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

export default async function Home() {
  const data: TodoLists[] = await getData();
  return (
    <main>
      <h1>Remaining TodoLists:</h1>
      <AddButton />
      {data.map((v, i, a) => {
        return (
          <li>
            {v.todo}
            <DeleteButton data={v} />
            <EditButton data={v} />
          </li>
        );
      })}
    </main>
  );
}
