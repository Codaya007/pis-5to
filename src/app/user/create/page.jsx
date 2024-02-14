"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PASSWORD_REGEX } from "@/constants";

export default function UserForm() {
  const validationSchema = object().shape({
    name: string()
      .required("Nombre requerido"),
    lastname: string().required("Apellido requerido"),
    email: string()
      .email("Ingrese un email válido")
      .required("Email requerido"),
    password: string()
      .required("Contraseña requerida")
      .matches(PASSWORD_REGEX, "La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)"),
    status: string().is(["active", "inactive", "blocked"], "Estado no válido")
      .required("Estatus requerido")
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState;

  const handleCreateUser = (data) => {
    console.log({ data });
  }

  return (
    <div className="normal-form">
      {/* <div className="buttons">
        <button>Volver</button>
     <button>Editar</button> 
    </div> */}

      < form onSubmit={handleSubmit(handleCreateUser)} >
        <h1 className="title-form">Nuevo usuario</h1>
        <div className="form-item">
          <label>Nombre</label>
          <input {...register("name")} type="text" />
          {errors.name && <span className="validation-error">{errors.name.message}</span>}
        </div>
        <div className="form-item">
          <label>Apellido</label>
          <input {...register("lastname")} type="text" />
          {errors.lastname && <span className="validation-error">{errors.lastname.message}</span>}
        </div>
        <div className="form-item">
          <label>Email</label>
          <input  {...register("email")} type="email" />
          {errors.email && <span className="validation-error">{errors.email.message}</span>}
        </div>
        <div className="form-item">
          <label>Contraseña</label>
          <input  {...register("password")} type="password" />
          {errors.password && <span className="validation-error">{errors.password.message}</span>}
        </div>
        <div className="form-item">
          <label>Estado</label>
          <select {...register("status")} >
            <option value="active" key="active">Activo</option>
            <option value="inactive" key="inactive">Inactivo</option>
            <option value="blocked" key="blocked">Bloqueado</option>
          </select>
          {errors.status && <span className="validation-error">{errors.status.message}</span>}
        </div>
        <input className="button-primary" type="submit" value="Crear" />
      </ form>
    </div >
  );
}