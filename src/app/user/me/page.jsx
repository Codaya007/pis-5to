"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const STATUS_COLOR_DICTIONARY = {
  "ACTIVA": "green",
  "BLOQUEADA": "red",
  "INACTIVA": "gray",
}

// "ACTIVA", "BLOQUEADA", "INACTIVA"
export const FORMAT_STATUS_DICTIONARY = {
  ACTIVA: "Activo",
  INACTIVA: "Inactivo",
  BLOQUEADA: "Bloqueado"
};

export default function Profile() {
  const { user } = useAuth()


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
          <input type="text" value={user?.name} readOnly contentEditable={false} />
        </div>
        <div className="form-item">
          <label>Apellido</label>
          <input type="text" value={user?.lastname} readOnly contentEditable={false} />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input type="text" value={user?.email} readOnly contentEditable={false} />
        </div>
        <div>
          <label>Estado</label>
          <div className="container-dot">
            <span
              className={"dot"}
              style={{ backgroundColor: STATUS_COLOR_DICTIONARY[user?.state] }}
            ></span>
            {user ? FORMAT_STATUS_DICTIONARY[user?.state] : ""}
          </div>
        </div>

        <div>
          <Link className="link-primary" style={{ textAlign: "right" }} href={"/user/change-password"}>¿Desea cambiar su contraseña?</Link>
        </div>
      </section>
    </div>
  );
}