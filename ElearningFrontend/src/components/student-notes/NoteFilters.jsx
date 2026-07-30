import { Search } from "lucide-react";

export default function NoteFilters({
  search,
  setSearch,
  subject,
  setSubject,
}) {
  return (
    <div className="mb-8 rounded-2xl border bg-white p-5">

      <div className="grid gap-4 md:grid-cols-2">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search Notes"
            className="w-full rounded-xl border py-3 pl-11 pr-4"
          />

        </div>

        <input
          value={subject}
          onChange={e=>setSubject(e.target.value)}
          placeholder="Subject"
          className="rounded-xl border p-3"
        />

      </div>

    </div>
  );
}