function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="glass-card mb-5 grid gap-3 rounded-2xl p-4 md:grid-cols-3">
      <select
        className="rounded-lg border border-slate-200 bg-white px-3 py-2"
        value={filters.difficulty}
        onChange={(event) => setFilters((prev) => ({ ...prev, difficulty: event.target.value }))}
      >
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <select
        className="rounded-lg border border-slate-200 bg-white px-3 py-2"
        value={filters.status}
        onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
      >
        <option value="">All Status</option>
        <option value="Solved">Solved</option>
        <option value="Attempted">Attempted</option>
        <option value="Unsolved">Unsolved</option>
      </select>

      <input
        className="rounded-lg border border-slate-200 bg-white px-3 py-2"
        placeholder="Filter by tag e.g. Arrays"
        value={filters.tag}
        onChange={(event) => setFilters((prev) => ({ ...prev, tag: event.target.value }))}
      />
    </div>
  );
}

export default ProblemFilters;
