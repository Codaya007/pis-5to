export default function () {

  const connected = true;
  const loading = false;

  return (
    <div className="normal-form">
      <div className="buttons">
        <button>Volver</button>
        <button>Editar</button>
      </div>

      <form>
        <h1 className="title-form">Detalles</h1>
        <div className="form-item">
          <label>Título</label>
          <input type="text" />
        </div>
        <div className="form-item">
          <label>Descripción</label>
          <textarea cols="30" rows="10"></textarea>
        </div>
        <div className="form-item">
          <label>IP</label>
          <input type="text" />
        </div>
        <div className="form-item mota-form-state">
          <div>
            <label>Estado</label>
            <div className="container-dot">
              <div
                className={"dot"}
                style={{ backgroundColor: connected ? "green" : "red" }}
              ></div>
              {connected ? "Conectado" : "Desconectado"}
            </div>
          </div>
          <button>{
            loading ? "Cargando..." : "Refrescar"}</button>
        </div>
        <input className="button-primary" type="submit" value="Eliminar" />
      </form>
    </div>
  );
}