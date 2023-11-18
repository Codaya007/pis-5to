import Link from "next/link";
import { FORMAT_STATUS_DICTIONARY, STATUS_COLOR_DICTIONARY } from "./me/page";

export const usersExample = [
  {
    id: 1,
    name: "Viviana",
    lastname: "Calva",
    status: "active"
  },
  {
    id: 2,
    name: "Jorge",
    lastname: "Ortega",
    status: "active"
  },
  {
    id: 3,
    name: "Leo",
    lastname: "Maza",
    status: "inactive"
  },
  {
    id: 4,
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
      <p>{FORMAT_STATUS_DICTIONARY[user.status]}</p>
    </div>
  </article>
}

export default function () {
  return (
    <div className="main-container vertical-top">
      <section className="buttons">
        <button className="button-primary"><Link href={"/user/create"}>+ Nuevo usuario</Link></button>
      </section>
      <section className="items-container">
        {
          usersExample.map(user => <UserCard user={user} key={user.id} />)
        }
      </section>
    </div>
  );
}