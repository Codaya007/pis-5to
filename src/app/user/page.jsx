import Link from "next/link";
import { STATUS_COLOR_DICTIONARY } from "./me/page";

export const usersExample = [
  {
    name: "Viviana",
    lastname: "Calva",
    status: "active"
  },
  {
    name: "Jorge",
    lastname: "Ortega",
    status: "active"
  },
  {
    name: "Leo",
    lastname: "Maza",
    status: "inactive"
  },
  {
    name: "Jhair",
    lastname: "Agila",
    status: "blocked"
  },
];

export const UserCard = ({ user }) => {
  return <article className="user-card">
    <h2 className="title">{user.name} {user.lastname}</h2>
    <div className="container-dot">
      <span className="dot" style={{ backgroundColor: STATUS_COLOR_DICTIONARY[user.status] || "white" }}></span>
      <p>{user.status}</p>
    </div>
  </article>
}

export default function () {
  return (
    <div className="main-container">
      <section className="buttons">
        <button className="button-primary"><Link href={"/user/create"}>+ Nuevo usuario</Link></button>
      </section>
      <section className="items-container">
        {
          usersExample.map(user => <UserCard user={user} />)
        }
      </section>
    </div>
  );
}