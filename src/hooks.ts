import { useMemo } from "react";
import type { Filter, User } from "./types";

export function useFilterUsers(users: User[], filters: Filter) {
  const filterPorPaisUsers = useMemo(() => {
    console.log("memo filter");
    return users.filter((u) =>
      u.location.country
        .toLowerCase()
        .includes(filters.nombrePais?.toLowerCase() || "")
    );
  }, [users, filters.nombrePais]);

  const sortedUsers = useMemo(() => {
    console.log("memo sorted");
    let filterUsers = filterPorPaisUsers.map((u) => u);
    if (filters.nombre !== undefined) {
      filterUsers = filterUsers.sort((a, b) => {
        if (filters.nombre) return a.name.first.localeCompare(b.name.first);
        return b.name.first.localeCompare(a.name.first);
      });
    }
    if (filters.apellido !== undefined) {
      filterUsers = filterUsers.sort((a, b) => {
        if (filters.apellido) return a.name.last.localeCompare(b.name.last);
        return b.name.last.localeCompare(a.name.last);
      });
    }
    if (filters.pais !== undefined) {
      filterUsers = filterUsers.sort((a, b) => {
        if (filters.pais)
          return a.location.country
            .toLowerCase()
            .localeCompare(b.location.country.toLowerCase());
        return b.location.country
          .toLowerCase()
          .localeCompare(a.location.country.toLowerCase());
      });
    }
    return filterUsers;
  }, [filterPorPaisUsers, filters.nombre, filters.apellido, filters.pais]);

  return sortedUsers;
}
