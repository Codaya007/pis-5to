import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <header className="app-header">
      <Link href={"/"} className="logo">
        <Image
          src="/TempLogo.png"
          width={160}
          height={75}
          alt="Logo"
        />
      </Link>
      <Link
        href={"/user/me"} className="user-header">
        <div>
          <h2>Viviana Calva</h2>
          <h3>Administrador</h3>
        </div>
        <img src={"https://avatars.githubusercontent.com/u/68254166?v=4"} alt="User photo" />
      </Link>
    </header>
  );
}