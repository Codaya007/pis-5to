const NotData = ({ volverFunction }) => {

    return (
        <div className="accentColor" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
            <h2>No hay datos que mostrar</h2>
            <button className="button simple-button" onClick={volverFunction}>Volver</button>
        </div>
    );
};

export default NotData;
