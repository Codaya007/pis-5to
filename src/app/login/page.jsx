"use client";
import Image from "next/image";
import Link from "next/link";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { enviar } from "../hook/conexion";
import mensajes from "../components/Mensajes";
import { inicio_sesion } from "../hook/Autentication";
import { useRouter } from "next/navigation";
import { estaSesion } from "../hook/SesionUtilClient";

export default function Login() {
  const router = useRouter();
  const validationScheme = Yup.object().shape({
    email: Yup.string().required("Ingrese su email"),
    password: Yup.string().required("Ingrese su contraseña"),
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = async(data) => {
    var data = { email: data.email, password: data.password };
    await enviar("auth/login", data);

    inicio_sesion(data).then((res) => {
      // console.log(res);
      if (!estaSesion()) {
        const errorObtained = res.errorMessage != undefined ? res.errorMessage : res.message;
        mensajes("Error en inicio de sesion", errorObtained, "error");
      } else {
        mensajes("Has ingresado al sistema", "Bienvenido usuario");
        router.push("/");
      }
    });
  };

  return (
    <div className="normal-form">
      <section>
        <Image src={"/TempLogo.png"} width={120} height={70} />
      </section>
      <form onSubmit={handleSubmit(sendData)}>
        <h1 className="title-form">Iniciar sesión</h1>
        <div className="form-item">
          <label className="form-label">Email</label>
          <input
            {...register("email")}
            name="email"
            id="email"
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="alert alert-danger invalid-feedback">
            {errors.email?.message}
          </div>
          {/* <input type="text" key={"user"} /> */}
        </div>
        <div className="form-item">
          <label className="form-label">Contrasenia</label>
          <input
            {...register("password")}
            name="password"
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="alert alert-danger invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <input
          className="button-primary"
          type="submit"
          value="Iniciar sesión"
        />
        <div>
          <Link className="link-primary" href={"forgot-password"}>
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}
