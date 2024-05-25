import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div
      className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    "
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-2xl font-semibold">Li mna iji lina limnhom ib9a tm ✍🏼</h1>
        </div>
        <div className="
        grid 
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-3
        mt-4
        ">
          <ListItem/>
        </div>
      </Header>
    </div>
  );
}
