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
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = async(data) => {
    var data = { email: data.email };
    enviar("auth/forgot-password", data).then(
      (res) => {
        if(res.status == 400){
          const errorObtained = res.errorMessage != undefined ? res.errorMessage : res.message;
          mensajes("Información incorrecta", errorObtained, "error");
        }else{
          mensajes("Se ha enviado un link para recuperar su contraseña", "Mensaje enviado");
          router.push("/");
        }
      }
    );

  };

  return (
    <div className="normal-form">
      <section>
        <Image src={"/TempLogo.png"} width={120} height={70} />
      </section>
      <form onSubmit={handleSubmit(sendData)}>
        <h1 className="title-form">Recuperar Contraseña</h1>
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
        </div>
        <input
          className="button-primary"
          type="submit"
          value="Recuperar contraseña"
        />
      </form>
    </div>
  );
}
