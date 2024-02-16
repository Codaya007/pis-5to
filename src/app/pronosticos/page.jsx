'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import PaginationControls from "../components/PaginationControls";
import { LIMIT_PAGINATOR, BTN_FILTER, BTN_LAST_3_DAYS, ERROR, FIRST_PAG, SUCCESS, BTN_ALL, TIME_OUT, FIXED } from "../hooks/Constants";
import { obtener } from '@/app/hooks/Api';
import Loader from '../components/Loader';
import { alertMessage } from '../components/Message';
import NotData from '../components/NotData';

const moment = require('moment-timezone');

export default function ({ searchParams }) {
    const router = useRouter();

    const [pronosticos, setPronosticos] = useState({});
    const [toDate, setToDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [current_active_button, setCurrent_active_button] = useState(BTN_ALL);
    const [hasData, setHasData] = useState(false);

    const page = searchParams['page'] < 1 ? '1' : searchParams['page'];
    const limit = LIMIT_PAGINATOR
    const populate = 'true'

    const todayDate = moment().format('YYYY-MM-DD');
    const dateInit = '2024-01-21'
    const fechainicio = searchParams['inicio'] ?? dateInit
    const fechafin = searchParams['fin'] ?? todayDate

    const start = (parseInt(page) - 1) * limit
    const end = start + limit


    const handleGetLast3Days = () => {
        const threeDaysAgoDate = moment().subtract(3, 'days').format('YYYY-MM-DD');

        router.push(`pronosticos?inicio=${threeDaysAgoDate}&fin=${fechafin}&page=${FIRST_PAG}`);
    }

    const setDefaultURL = () => {
        router.push(`pronosticos?inicio=${dateInit}&fin=${todayDate}&page=${FIRST_PAG}`);
    }

    const handleClearFields = () => {
        if (fromDate != '' || toDate != '') {
            setDefaultURL()
        }
        setFromDate('');
        setToDate('');
    };

    const handleApplyFilter = () => {
        if (fromDate == '' || toDate == '') {
            alertMessage('Los campos están vacios', 'Los campos de fecha están vacios', ERROR)
        } else if (moment(toDate) < moment(fromDate) || moment().isBefore(moment(toDate))) {
            alertMessage('Rango de fecha inválido', 'El rango de fechas debe ser válido. La fecha de inicio debe ser anterior a la fecha de fin.', ERROR)
        } else {
            router.push(`pronosticos?inicio=${fromDate}&fin=${toDate}&page=${1}`);
        }
    };

    useEffect(() => {
        const getPronostics = async () => {
            //* Si no existen los parametros, se setea la URL
            if (!searchParams['page'] || !searchParams['inicio'] || !searchParams['fin']) {
                setDefaultURL()
            }

            // ! token, recordar obtener el token del localstorage
            let tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWIxYTRjOWY3ZGJiMjVjMTVmNDk1OSIsImlhdCI6MTcwNzg3MDM3NiwiZXhwIjoxNzA4NDc1MTc2fQ.EXNDB-qiFyCvNLzQduSp6PyKvaZQnH4YvZV9tkfhvew"

            let response = await obtener(`pronostics/${fechainicio}/${fechafin}?limit=${LIMIT_PAGINATOR}&page=${page}&populate=${populate}`, tkn);
            console.log({ response });

            if (response.msg !== "OK") {
                alertMessage('Ocurrio un error', pronosticos.msg, ERROR)
                setHasData(true)
            } else {
                if (response.totalCount == 0) {
                    alertMessage('No hay pronósticos', 'No existen pronósticos en el rango de fechas seleccionado', SUCCESS)
                }
                //? Formateo de los elementos
                //* Correción de la fecha
                response.results.map((element) => {
                    element.dateTime = moment(element.dateTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
                    // element.dateTime = moment(element.dateTime).add(2, 'hours').add(28, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
                    element.temperature = element.temperature.toFixed(FIXED);
                    element.humidity = element.humidity.toFixed(FIXED);
                    element.barometricPressure = element.barometricPressure.toFixed(FIXED);
                    return element;
                })

                setHasData(true)

                // Agrupar los elementos por fecha
                let diccionario = {}
                response.results.forEach(e => {
                    const fecha = e.dateTime.split('T')[0]
                    diccionario[fecha] = diccionario[fecha] ? [...diccionario[fecha], e] : [e];
                });

                // Ordenar los elementos descendentemente
                for (let clave in diccionario) {
                    diccionario[clave] = diccionario[clave].reverse()
                }

                response.results = diccionario

                // console.log({response});

                setPronosticos(response);
            }
        }

        getPronostics()
        console.log('Se ejecuto el use effect');
    }, [page, fechainicio, fechafin]);


    return (
        <div className="main-container vertical-top history-page">
            {pronosticos && pronosticos.results && (
                <section>
                    <section className="history">
                        <h1>Historial de pronósticos</h1>
                        {
                            Object.keys(pronosticos.results).map((fecha, i) => {
                                return (
                                    <section className="history-by-day" key={i}>
                                        <h2>{fecha}</h2>
                                        {pronosticos.results[fecha].map((pronostico, j) => {
                                            return (
                                                <table key={j}>
                                                    <tbody key={j}>
                                                        {
                                                            <tr key={j}>
                                                                <td>{pronostico.dateTime.split('T')[1].slice(0, 5)}</td>
                                                                <td className="align-image">
                                                                    {/* Colocar IMAGEN */}
                                                                    {/* <img src={pronostico.pronostic.image} alt={pronostico.pronostic.weatherType} />
                                                                    <p>
                                                                        {pronostico.pronostic.weatherType}
                                                                    </p> */}
                                                                </td>
                                                                <td>{pronostico.humidity}%</td>
                                                                <td>{pronostico.temperature} °C</td>
                                                                {/* <td>{pronostico.windSpeed} Km/h</td> */}
                                                                <td>{pronostico.barometricPressure} hPa</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            );
                                        })}

                                    </section>
                                )
                            })
                        }
                    </section>
                    < PaginationControls
                        totalCount={pronosticos.totalCount}
                        searchParams={searchParams}
                        hasNextPage={end < pronosticos.totalCount}
                        hasPrevPage={start > 0}
                    />

                </section>
            )}

            {pronosticos && pronosticos.results && (
                <section className={`card search ${current_active_button === BTN_LAST_3_DAYS || current_active_button === BTN_ALL ? 'form-hidden' : ''}`}>
                    <h2>Búsqueda</h2>
                    <div className="buttons">
                        <button className={current_active_button === BTN_ALL ? 'active' : ''} onClick={() => {
                            setDefaultURL()
                            setCurrent_active_button(BTN_ALL)
                        }}>{BTN_ALL}</button>
                        <button className={current_active_button === BTN_LAST_3_DAYS ? 'active' : ''} onClick={() => {
                            handleGetLast3Days()
                            setCurrent_active_button(BTN_LAST_3_DAYS)
                        }}>{BTN_LAST_3_DAYS}</button>
                        <button className={current_active_button === BTN_FILTER ? 'active' : ''} onClick={() => {
                            setCurrent_active_button(BTN_FILTER)
                        }}>{BTN_FILTER}</button>
                    </div>
                    {current_active_button == BTN_FILTER && (
                        <form className="filters">
                            <div>
                                <div className="form-item">
                                    <label>Desde</label>
                                    <input
                                        type="date"
                                        name="from"
                                        id="from"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-item">
                                    <label>Hasta</label>
                                    <input
                                        type="date"
                                        name="to"
                                        id="to"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="filters-buttons">
                                <button type="button" className="round-button" onClick={handleApplyFilter}>
                                    Aplicar
                                </button>
                                <button type="button" className="round-button" onClick={handleClearFields}>Limpiar</button>
                            </div>
                        </form>
                    )}
                </section>
            )}
            {/* Componente del loader  */}
            {pronosticos.results == null && hasData == false && (
                <Loader></Loader>
            )}
            {pronosticos.results == null && hasData == true && (
                <NotData volverFunction={setDefaultURL}></NotData>
            )}

        </div >
    );
}