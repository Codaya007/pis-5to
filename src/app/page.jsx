'use client';
import { useState, useEffect } from 'react';
import { obtener } from '../hooks/Api';
import { ERROR, LIMIT_PAGINATOR, SUCCESS } from '../hooks/Constants';
import { alertMessage } from './components/Message';
import { useAuth } from '@/context/AuthContext';

const moment = require('moment-timezone');

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
  const { loginUser, user } = useAuth();
  const [pronosticos, setPronosticos] = useState({});

  const fechaActual = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const getPronostics = async () => {
      // ! token, recordar obtener el token del localstorage
      let tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjcxMWIyYjYyMmYzNzNiODJlMjRjMiIsImlhdCI6MTcwODA5MDkxNywiZXhwIjoxNzA4Njk1NzE3fQ.ZW0g0OtTCl2dYjROMatZ3ysELAG916K0qr3Iu29XTJM"

      let response = await obtener(`pronostics/${fechaActual}/${fechaActual}?limit=${LIMIT_PAGINATOR}&page=${1}&populate=${true}`, tkn);

      if (response.msg !== "OK") {
        alertMessage('Ocurrio un error', pronosticos.msg, ERROR)
      } else if (response.totalCount == 0) {
        alertMessage('No hay pronósticos', 'No existen pronósticos en el rango de fechas seleccionado', SUCCESS)
      } else {
        //* Formateo de la fecha
        response.results.map((element) => {
          // element.dateTime = moment(element.dateTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
          element.dateTime = moment(element.dateTime).add(2, 'hours').add(28, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
          return element;
        })

        let diccionario = {}

        response.results.forEach(e => {
          const fecha = e.dateTime.split('T')[0]
          diccionario[fecha] = diccionario[fecha] ? [...diccionario[fecha], e] : [e];
        });

        response.results = diccionario

        console.log({ response });

        setPronosticos(response);
      }
    }

    getPronostics()
  }, []);

  useEffect(() => {
    if (!user) {
      const userData = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      loginUser(JSON.parse(userData), token)
    }
  }, [localStorage.user]);

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
      {pronosticos && pronosticos.results != null && (
        <section className="cards-by-hour">
          {Object.keys(pronosticos.results).map((fecha) => {
            const data = [...pronosticos.results[fecha]];
            data.reverse();
            return (
              data.map((element, i) => {
                const hour = element.dateTime.split('T')[1].slice(0, 5);
                const img = element.pronostic.image;

                return <CardByHour hour={hour} img={img} key={i} />;
              })
            )
          })
          }
        </section>
      )}
    </main>
  );
}
