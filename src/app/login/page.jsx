"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const validationSchema = object().shape({
    email: string()
      .email("Ingrese un email válido")
      .required("Ingrese un email"),
    password: string()
      .required("Contraseña requerida"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    // mode: "onBlur",
    mode: "onChange",
  };
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState;

  const handleLogin = (data) => {
    console.log({ data });
  }

  return (
    <div className="normal-form">
      <section>
        <Image
          src={"/TempLogo.png"}
          width={120}
          height={70}
        />
      </section>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1 className="title-form">Iniciar sesión</h1>
        <div className="form-item">
          <label>Email</label>
          <input {...register("email")} type="text" key={"email"} />
          {errors.email && <span className="validation-error">{errors.email.message}</span>}
        </div>
        <div className="form-item">
          <label>Contraseña</label>
          <input {...register("password")} type="password" key={"password"} />
          {errors.password && <span className="validation-error">{errors.password.message}</span>}
        </div>
        <input className="button-primary" type="submit" value="Iniciar sesión" />
        <div><Link className="link-primary" href={"forgot-password"}>¿Has olvidado tu contraseña?</Link></div>
      </form>
    </div>
  );
}