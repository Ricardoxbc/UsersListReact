import React from "react";
import type { User } from "./types.d";

interface Props {
  users: User[];
  colors: boolean;
  handleHeadFilter: (f: string) => void;
  handleDelete: (u: User) => void;
}

export function UsersList({
  users,
  colors,
  handleHeadFilter,
  handleDelete
}: Props) {
  return (
    <table width="100%" className={colors ? "colors" : ""}>
      <thead>
        <tr
          onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
            handleHeadFilter(
              e.target.textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
          }
        >
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.login.uuid}>
            <td>
              <img src={u.picture.thumbnail} alt={`${u.name.first}`} />
            </td>
            <td>{u.name.first}</td>
            <td>{u.name.last}</td>
            <td>{u.location.country}</td>
            <td>
              <button onClick={() => handleDelete(u)}> Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
