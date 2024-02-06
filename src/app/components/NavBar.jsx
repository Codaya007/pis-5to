import Link from "next/link";

export default function () {
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
          <li>
            <Link href={"/pronosticos"}>
              Pronóstico
            </Link>
          </li>
        </ul>
      </div>
      <button>
        {/* ícono */}
        Cerrar sesión
      </button>
    </nav>
  );
}