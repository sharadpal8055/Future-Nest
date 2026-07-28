export default function CourseFilters({ filters, setFilters }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Categories</option>
        <option value="Backend">Backend</option>
        <option value="Frontend">Frontend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      {/* Difficulty */}
      <select
        value={filters.difficulty}
        onChange={(e) =>
          setFilters({ ...filters, difficulty: e.target.value })
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* Price */}
      <select
        value={filters.price}
        onChange={(e) =>
          setFilters({ ...filters, price: e.target.value })
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Any Price</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </div>
  );
}
