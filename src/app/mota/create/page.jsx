"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IP_REGEX } from "@/constants";
import { useState } from "react";

export default function () {
  const [loading, setLoading] = useState(false);
  const validationSchema = object().shape({
    title: string()
      .required("Título requerido"),
    description: string().max(200, "Máximo 200 caracteres"),
    IP: string()
      .matches(IP_REGEX, "Ip no válida")
      .required("IP requerida"),
    // state: boolean().default(false)
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    // mode: "onBlur",
    mode: "onChange",
  };
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState;

  const handleCreateMota = (data) => {
    console.log({ data });
  }

  const handleClickRefresh = () => {
    setLoading(!loading)
  }

  const connected = true;
  // const loading = false;

  return (
    <div className="normal-form">
      {/* <div className="buttons">
        <button>Volver</button>
        <button>Editar</button>
      </div> */}

      <form onSubmit={handleSubmit(handleCreateMota)}>
        <h1 className="title-form">Detalles</h1>
        <div className="form-item">
          <label>Título</label>
          <input {...register("title")} type="text" />
          {
            errors.title &&
            <span className="validation-error">{errors.title.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Descripción</label>
          <textarea  {...register("description")} cols="30" rows="10"></textarea>
          {
            errors.description &&
            <span className="validation-error">{errors.description.message}</span>
          }
        </div>
        <div className="form-item">
          <label>IP</label>
          <input  {...register("IP")} type="text" />
          {
            errors.IP &&
            <span className="validation-error">{errors.IP.message}</span>
          }
        </div>
        <div className="form-item mota-form-state">
          <div>
            <label>Estado</label>
            <div className="container-dot">
              <div
                className={"dot"}
                style={{ backgroundColor: connected ? "green" : "red" }}
              ></div>
              {connected ? "Conectado" : "Desconectado"}
            </div>
          </div>
          <button onClick={handleClickRefresh}>{
            loading ? "Cargando..." : "Refrescar"}</button>
        </div>
        <input className="button-primary" type="submit" value="Crear" />
      </form>
    </div>
  );
}