import React, { useEffect, useState, useMemo, useRef } from "react";
import { UsersList } from "./UsersList";
import { useFilterUsers } from "./hooks";
import type { ApiResult, Filter, User } from "./types.d";

import "./styles.css";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [colors, setColors] = useState(false);
  const [filters, setFilters] = useState({} as Filter);

  const staticUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((json: ApiResult) => {
        staticUsers.current = json.results || [];
        setUsers(json.results || []);
      });
  }, []);

  const handleChangePais = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFilters((prev) => {
      return {
        ...prev,
        nombrePais: text
      };
    });
  };

  const handleHeadFilter = (f: string) => {
    if (f === "foto" || f === "acciones") return;
    const used = filters[f] as boolean;
    const change = {
      [f]: !used,
      nombrePais: filters.nombrePais
    };
    setFilters(change);
  };

  const handleDelete = (user: User) => {
    setUsers((prev) => {
      return prev.filter((u) => u !== user);
    });
  };

  const handleRestore = () => {
    setUsers(staticUsers.current);
  };

  return (
    <div className="App">
      <h1>List of users</h1>
      <p>{JSON.stringify(filters)}</p>
      <header>
        <div>
          <button onClick={() => setColors(!colors)}>Colorear</button>
          <button onClick={handleRestore}>Restaurar</button>
          <input type="text" placeholder="pais" onChange={handleChangePais} />
        </div>
      </header>
      <main>
        <UsersList
          users={useFilterUsers(users, filters)}
          handleHeadFilter={handleHeadFilter}
          handleDelete={handleDelete}
          colors={colors}
        />
      </main>
    </div>
  );
}
