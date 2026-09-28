import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import {
  PROJECT_LAB_CATEGORIES,
  PROJECT_LAB_SORTS,
  type ProjectLabQuery,
} from "@/lib/project-lab";

const SORT_LABEL: Record<(typeof PROJECT_LAB_SORTS)[number], string> = {
  featured: "Featured",
  recent: "Recent",
  active: "Active",
  completed: "Completed",
};

interface ProjectFiltersProps {
  query: ProjectLabQuery;
  resultCount: number;
}

export function ProjectFilters({ query, resultCount }: ProjectFiltersProps) {
  return (
    <form
      method="get"
      action="/projects"
      className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end"
    >
      <div>
        <label htmlFor="project-lab-q" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Search
        </label>
        <input
          id="project-lab-q"
          name="q"
          type="search"
          defaultValue={query.q}
          placeholder="Suraksha, healthcare, Python…"
          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="project-lab-category" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Filter
        </label>
        <select
          id="project-lab-category"
          name="category"
          defaultValue={query.category}
          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
        >
          {PROJECT_LAB_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All" : PROJECT_CATEGORY_LABEL[category]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="project-lab-sort" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Sort
        </label>
        <select
          id="project-lab-sort"
          name="sort"
          defaultValue={query.sort}
          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
        >
          {PROJECT_LAB_SORTS.map((sort) => (
            <option key={sort} value={sort}>
              {SORT_LABEL[sort]}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="min-h-10 rounded-[var(--radius-md)] bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--bg)]"
      >
        Apply
      </button>
      <p className="font-mono text-xs text-[var(--muted)] md:col-span-4">
        {resultCount} {resultCount === 1 ? "system" : "systems"}
      </p>
    </form>
  );
}
