export default function () {
  return (
    <div className="normal-form">
      <div className="buttons">
        <button>Volver</button>
        {/* <button>Editar</button> */}
      </div>

      <form>
        <h1 className="title-form">Nuevo usuario</h1>
        <div className="form-item">
          <label>Nombre</label>
          <input type="text" />
        </div>
        <div className="form-item">
          <label>Apellido</label>
          <input type="text" />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="form-item">
          <label>Contraseña</label>
          <input type="password" />
        </div>
        <div className="form-item">
          <label>Estado</label>
          <select>
            <option value="active" key="active">Activo</option>
            <option value="inactive" key="inactive">Inactivo</option>
            <option value="blocked" key="blocked">Bloqueado</option>
          </select>
        </div>
        <input className="button-primary" type="submit" value="Crear" />
      </form>
    </div>
  );
}