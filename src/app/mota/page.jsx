import Link from "next/link";

export const motasExample = [
  {
    id: 1,
    title: "Mota 1",
    description: "Mota de temperatura",
    ip: "129.1.1.122",
    connected: true
  },
  {
    id: 2,
    title: "Mota 2",
    description: "Mota de humedad",
    ip: "129.1.1.128",
    connected: true
  },
  {
    id: 3,
    title: "Mota 3",
    description: "Mota de viento",
    ip: "129.1.1.90",
    connected: false
  },
];

const MotaCard = ({ title, description, connected }) => {
  return <article className="user-card">
    <h2>{title}</h2>
    <p className="text-primary">{description}</p>
    <div className="container-dot">
      <span className="dot" style={{ backgroundColor: connected ? "green" : "red" }}></span>
      <p>{connected ? "Conectado" : "Desconectado"}</p>
    </div>
  </article>
}

export default function MotaDashboard() {
  return (
    <div className="main-container vertical-top">
      <section className="buttons">
        <button className="button-primary">
          <Link href={"mota/create"}>+ Nueva conexión</Link>
        </button>
      </section>
      <section className="items-container">
        {
          motasExample.map(mota => <MotaCard {...mota} key={mota.id} />)
        }
      </section>
    </div>
  );
}