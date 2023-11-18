import Image from "next/image";

const CardByHour = ({ hour, img }) => {
  return (
    <article>
      <img
        src={img || "../assets/Weather.png"}
        alt={`Weather icon at hour ${hour}`}
      />
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
    <main>
      <section>
        <article>
          <div>
            <h3>Loja</h3>
            <p>Mie, 8 de octubre, 19:00</p>
          </div>
          <img src="../assets/Weather.png" alt="Current weather icon" />
        </article>
        <div>
          <article>
            <h2>Temperatura</h2>
            <p>30 °C</p>
          </article>
          <article>
            <h2>Humedad</h2>
            <p>73%</p>
          </article>
          <article>
            <h2>Viento</h2>
            <p>8 km/h</p>
          </article>
        </div>
        <div>
          <h2>Historial</h2>
          <img src="../assets/Graph example.png" alt="Gráfica de temperatura" />
          <ul>
            <li>Temperatura</li>
            <li>Humedad</li>
            <li>Viento</li>
          </ul>
        </div>
      </section>
      <section>
        {hoursExample.map((element) => (
          <CardByHour {...element} />
        ))}
      </section>
    </main>
  );
}
