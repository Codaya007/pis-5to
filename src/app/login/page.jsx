import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <div className="normal-form">
      <section>
        <Image
          src={"/TempLogo.png"}
          width={120}
          height={70}
        />
      </section>
      <form>
        <h1 className="title-form">Iniciar sesión</h1>
        <div className="form-item">
          <label>Usuario</label>
          <input type="text" key={"user"} />
        </div>
        <div className="form-item">
          <label>Contraseña</label>
          <input type="password" key={"password"} />
        </div>
        <input className="button-primary" type="submit" value="Iniciar sesión" />
        <div><Link className="link-primary" href={"forgot-password"}>¿Has olvidado tu contraseña?</Link></div>
      </form>
    </div>
  );
}