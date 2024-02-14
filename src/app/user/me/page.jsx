import Link from "next/link";

export const STATUS_COLOR_DICTIONARY = {
  "active": "green",
  "blocked": "red",
  "inactive": "gray",
}

export const FORMAT_STATUS_DICTIONARY = {
  active: "Activo",
  inactive: "Inactivo",
  blocked: "Bloqueado"
};

export default function Profile() {
  const user = {
    status: "active"
  };

  return (
    <div className="normal-form">
      <div className="buttons">
        <button>Volver</button>
        <button>Editar</button>
      </div>

      <section>
        <h1 className="title-form">Perfil</h1>
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
          <input type="text" />
        </div>
        <div>
          <label>Estado</label>
          <div className="container-dot">
            <span
              className={"dot"}
              style={{ backgroundColor: STATUS_COLOR_DICTIONARY[user?.status?.toLowerCase()] }}
            ></span>
            {FORMAT_STATUS_DICTIONARY[user.status]}
          </div>
        </div>

        <div>
          <Link className="link-primary" style={{ textAlign: "right" }} href={"user/change-password"}>¿Desea cambiar su contraseña?</Link>
        </div>
      </section>
    </div>
  );
}