export const historyByDay = [
  {
    date: "18/11/2023",
    history: [
      {
        hour: "13h00",
        state: "Nublado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "14h00",
        state: "Soleado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "15h00",
        state: "Tormenta",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
    ]
  },
  {
    date: "17/11/2023",
    history: [
      {
        hour: "13h00",
        state: "Nublado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "14h00",
        state: "Soleado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "15h00",
        state: "Tormenta",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
    ]
  },
  {
    date: "16/11/2023",
    history: [
      {
        hour: "13h00",
        state: "Nublado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "14h00",
        state: "Soleado",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
      {
        hour: "15h00",
        state: "Tormenta",
        img: "/Weather.png",
        temperature: "21",
        humidity: "73",
        wind: "35"
      },
    ]
  },
]

const FORMAT_INDEX_DAY = {
  0: "Hoy",
  1: "Ayer",
}

export default function History() {
  return (
    <div className="main-container vertical-top history-page">
      <section className="history">
        <h1>Historial de pronósticos</h1>
        {
          historyByDay.map((historyDay, i) => {
            return (
              <section className="history-by-day" key={i}>
                <h2>{FORMAT_INDEX_DAY[i] || historyDay.date}</h2>
                <table>
                  <tbody>
                    {
                      historyDay.history.map((historyHour, i) => {

                        return <tr key={i}>
                          <td>{historyHour.hour}</td>
                          <td className="align-image">
                            <img src={historyHour.img} alt={historyHour.state} />
                            <p>
                              {historyHour.state}
                            </p>
                          </td>
                          <td>{historyHour.humidity}%</td>
                          <td>{historyHour.temperature} °C</td>
                          <td>{historyHour.wind} Km/h</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </section>
            )
          })
        }
      </section>
      <section className="card search">
        <h2>Búsqueda</h2>
        <div className="buttons">
          <button>Últimos 3 días</button>
          <button className="active">Filtrar</button>
        </div>
        <form className="filters">
          <div>
            <div className="form-item">
              <label>Desde</label>
              <input type="date" name="from" id="from" />
            </div>
            <div className="form-item">
              <label>Hasta</label>
              <input type="date" name="to" id="to" />
            </div>
          </div>
          <div className="filters-buttons">
            <button className="round-button">Aplicar</button>
            <button className="round-button">Limpiar</button>
          </div>
        </form>
      </section>
    </div>
  );
}