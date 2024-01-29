"use client";
import Link from "next/link";
import { borrarSesion } from "../hook/SesionUtilClient";
import mensajes from "./Mensajes";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const salir = async () => {
    // Cookie.remove("my-token");
    await borrarSesion();
    mensajes("Gracias", "Hasta la proxima");
    router.push('/');
    router.refresh();
  }
  
  return (
    <nav className="navbar">
      <div>
        <h3>Panel de control</h3>
        <ul>
          <li>
            {/* ícono */}
            <Link href={"/"}>
              Dashboard
            </Link>
          </li>
          <li>
            {/* ícono */}
            <Link href={"/user"}>
              Administración
            </Link>
          </li>
          <li>
            <Link href={"/mota"}>
              Gestionar motas
            </Link>
          </li>
          <li>
            <Link href={"/history"}>
              Historial
            </Link>
          </li>
        </ul>
      </div>
      <button type="button" onClick={salir}>
        
        {/* ícono */}
        Cerrar sesión
      </button>
    </nav>
  );
}