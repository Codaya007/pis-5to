import Image from "next/image";

const CardByHour = ({ hour, img }) => {
  return (
    <article className="card">
      <img src={img || "/Weather.png"} alt={`Weather icon at hour ${hour}`} />
      <h3>{hour}</h3>
    </article>
  );
};

const hoursExample = [
  {
    hour: "20:00 pm",
    image: "",
  },
  {
    hour: "21:00 pm",
    image: "",
  },
  {
    hour: "22:00 pm",
    image: "",
  },
  {
    hour: "23:00 pm",
    image: "",
  },
  {
    hour: "00:00 am",
    image: "",
  },
  {
    hour: "01:00 am",
    image: "",
  },
];

export default function Home() {
  return (
    <main className="main-container">
      <section className="items-container">
        <article className="card main-weather-card">
          <div>
            <h3>Loja</h3>
            <p>Mie, 8 de octubre, 19:00</p>
          </div>
          <img src="/Weather.png" alt="Current weather icon" />
        </article>
        <div className="params-cards">
          <article className="card">
            <h2>Temperatura</h2>
            <p>30 °C</p>
          </article>
          <article className="card">
            <h2>Humedad</h2>
            <p>73%</p>
          </article>
          <article className="card">
            <h2>Viento</h2>
            <p>8 km/h</p>
          </article>
        </div>
        <div className="card params-graph-container">
          <h2>Historial</h2>
          <img src="/GraphExample.png" alt="Gráfica de temperatura" />
          <ul>
            <li>
              <button className="active-item">Temperatura</button>
            </li>
            <li>
              <button>Humedad</button>
            </li>
            <li>
              <button>Viento</button>
            </li>
          </ul>
        </div>
      </section>
      <section className="cards-by-hour">
        {hoursExample.map((element, i) => (
          <CardByHour {...element} key={i} />
        ))}
      </section>
    </main>
  );
}
