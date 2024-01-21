'use client';

import { React, useState, useEffect } from "react";
import { obtener } from "../hooks/Api";
import { LIMIT_PAGINATOR, FIRST_PAG } from "../hooks/Constants"

const moment = require('moment-timezone');

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

const obtenerFechaFormateada = (fecha) => {
    const fechaActual = moment().toDate().getUTCDate();
    const fechaTemp = moment(fecha).toDate().getUTCDate();

    return FORMAT_INDEX_DAY[fechaActual - fechaTemp] || fecha.split('T')[0];
}

function redondearHaciaArriba(totalCount, numero) {
    console.log({ numero });
    console.log({ totalCount });
    console.log(totalCount / numero);
    const parteEntera = Math.floor(numero);
    const parteDecimal = numero - parteEntera;

    if (parteDecimal > 0) {
        return parteEntera + 1;
    } else {
        return parteEntera;
    }
}

export default function () {

    const [pronostics, setPronostics] = useState([]);
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    // TODO que se hace si no hubo un error al obtener los pronosticos?? como se lanza el error?
    useEffect(() => {
        const getPronostics = async () => {
            let response = await obtener(`pronostic/list?limit=${LIMIT_PAGINATOR}&page=${currentPage}&populate=true`);
            // Se modidifica la fecha, porque en bd se guarda con otra zona horaria
            response.data.map((element) => {
                element.dateTime = moment(element.dateTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
                return element;
            })
            setPronostics(response.data);
            setTotalCount(response.totalCount);
            // console.log({ response });
        }

        getPronostics()
    }, [currentPage]);

    return (
        <div className="main-container vertical-top history-page">
            <section>
                <section className="history">
                    <h1>Historial de pronósticos</h1>
                    {
                        pronostics.map((pronostic, i) => {
                            return (
                                <section className="history-by-day" key={i}>
                                    <h2>{obtenerFechaFormateada(pronostic.dateTime)}</h2>
                                    <table>
                                        <tbody>
                                            {
                                                <tr key={i}>
                                                    <td>{pronostic.dateTime.split('T')[1].slice(0, 5)}</td>
                                                    <td className="align-image">
                                                        <img src={pronostic.pronostic.image} alt={pronostic.pronostic.weatherType} />
                                                        <p>
                                                            {pronostic.pronostic.weatherType}
                                                        </p>
                                                    </td>
                                                    <td>{pronostic.humidity}%</td>
                                                    <td>{pronostic.temperature} °C</td>
                                                    <td>{pronostic.windSpeed} Km/h</td>
                                                    <td>{pronostic.barometricPressure} hPa</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </section>
                            )
                        })
                    }
                </section>

                <section className="paginator">
                    <div>
                        <button style={{ cursor: (currentPage == FIRST_PAG) ? 'not-allowed' : 'pointer' }}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                            }}
                        ><img style={{ transform: 'rotate(180deg)' }} src="navigate_next.svg" alt="navigate next" /></button>
                        <span style={{ textAlign: 'center' }}> {currentPage} / {Math.ceil(totalCount / LIMIT_PAGINATOR)} </span>
                        <button style={{ cursor: (currentPage == Math.ceil(totalCount / LIMIT_PAGINATOR)) ? 'not-allowed' : 'pointer' }}
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                        ><img src="navigate_next.svg" alt="navigate next" /></button>
                    </div>
                </section>
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
        </div >
    );
}