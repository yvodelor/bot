import React, { useEffect, useMemo, useState } from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

type Props<T> = {
  data?: T[];
  columns: Column<T>[];
  searchable?: boolean;
  pageSize?: number;
  loading?: boolean;
  rowKey?: keyof T;
  actions?: (row: T) => React.ReactNode;
};

export function DynamicTable<T extends Record<string, any>>({
  data = [],
  columns,
  searchable = true,
  pageSize = 10,
  loading = false,
  rowKey = "id" as keyof T,
  actions,
}: Props<T>) {
  // ============================================================
  // SAFE DATA
  // ============================================================

  const safeData = Array.isArray(data) ? data : [];

  // ============================================================
  // STATES
  // ============================================================

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ============================================================
  // FILTER
  // ============================================================

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return safeData;
    }

    return safeData.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];

        if (value === null || value === undefined) {
          return false;
        }

        return String(value).toLowerCase().includes(query);
      })
    );
  }, [safeData, search, columns]);

  // ============================================================
  // SORT
  // ============================================================

  const sorted = useMemo(() => {
    if (!sortKey) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      // null / undefined
      if (valA == null && valB == null) {
        return 0;
      }

      if (valA == null) {
        return 1;
      }

      if (valB == null) {
        return -1;
      }

      // numbers
      if (
        typeof valA === "number" &&
        typeof valB === "number"
      ) {
        return sortDir === "asc"
          ? valA - valB
          : valB - valA;
      }

      // strings
      const comparison = String(valA).localeCompare(
        String(valB),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );

      return sortDir === "asc"
        ? comparison
        : -comparison;
    });
  }, [filtered, sortKey, sortDir]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / pageSize)
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;

    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // ============================================================
  // RESET PAGE SI NECESSAIRE
  // ============================================================

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ============================================================
  // HANDLE SORT
  // ============================================================

  const handleSort = (key: keyof T) => {
    setPage(1);

    if (sortKey === key) {
      setSortDir((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chargement...
        </p>
      </div>
    );
  }

  // ============================================================
  // TABLE
  // ============================================================

  return (
    <div className="w-full">
      {/* ========================================================
          SEARCH
      ======================================================== */}

      {searchable && (
        <div className="mb-4 px-4 pt-4 sm:px-6">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="
              h-10
              w-full
              max-w-sm
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              text-sm
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/10
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
              dark:placeholder:text-gray-500
            "
          />
        </div>
      )}

      {/* ========================================================
          RESPONSIVE TABLE CONTAINER
      ======================================================== */}

      <div
        className="
          w-full
          overflow-x-auto
          overscroll-x-contain
        "
      >
        <table
          className="
            w-full
            min-w-[620px]
            border-collapse
            text-sm
          "
        >
          {/* ====================================================
              HEAD
          ==================================================== */}

          <thead>
            <tr className="border-y border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/60">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  onClick={() =>
                    col.sortable &&
                    handleSort(col.key)
                  }
                  className={`
                    whitespace-nowrap
                    px-4
                    py-3.5
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-600
                    dark:text-gray-300

                    ${
                      col.sortable
                        ? `
                          cursor-pointer
                          select-none
                          transition-colors
                          hover:bg-gray-100
                          dark:hover:bg-gray-700
                        `
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>

                    {sortKey === col.key && (
                      <span
                        className="
                          text-sm
                          font-bold
                          text-blue-600
                          dark:text-blue-400
                        "
                      >
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}

              {actions && (
                <th
                  scope="col"
                  className="
                    w-[80px]
                    whitespace-nowrap
                    px-4
                    py-3.5
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* ====================================================
              BODY
          ==================================================== */}

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row) => (
                <tr
                  key={String(row[rowKey])}
                  className="
                    border-b
                    border-gray-100
                    transition-colors
                    hover:bg-gray-50
                    dark:border-gray-800
                    dark:hover:bg-gray-800/50
                  "
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="
                        max-w-[280px]
                        px-4
                        py-3.5
                        text-sm
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      <div className="truncate">
                        {col.render
                          ? col.render(
                              row[col.key],
                              row
                            )
                          : String(
                              row[col.key] ?? "-"
                            )}
                      </div>
                    </td>
                  ))}

                  {actions && (
                    <td
                      className="
                        px-4
                        py-3.5
                        text-right
                        align-middle
                      "
                    >
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (actions ? 1 : 0)
                  }
                  className="
                    px-4
                    py-12
                    text-center
                  "
                >
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aucune donnée trouvée
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          MOBILE SCROLL INDICATOR
      ======================================================== */}

      <div className="px-4 pt-2 sm:hidden">
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Faites glisser horizontalement pour voir les autres colonnes.
        </p>
      </div>

      {/* ========================================================
          PAGINATION
      ======================================================== */}

      {totalPages > 1 && (
        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-100
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
            dark:border-gray-800
          "
        >
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Page {page} sur {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-3
                py-2
                text-xs
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-300
                dark:hover:bg-gray-700
              "
            >
              Précédent
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              disabled={page === totalPages}
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-3
                py-2
                text-xs
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-300
                dark:hover:bg-gray-700
              "
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}