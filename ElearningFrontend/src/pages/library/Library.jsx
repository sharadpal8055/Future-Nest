import LibraryCard from "../../components/library/LibraryCard";
import { LIBRARY_ITEMS } from "../../constants/library";

function Library() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Library
        </h1>

        <p className="mt-2 text-gray-500">
          Learn, revise and prepare for interviews with
          curated learning resources.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {LIBRARY_ITEMS.map((item) => (
          <LibraryCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;