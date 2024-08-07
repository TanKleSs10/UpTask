import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPasswordToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-black text-white">
        Restablece tu contraseña
      </h1>
      <p className="text-xl font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold">
          Restablecer tu contraseña
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-white mt-5"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-5 flex justify-around">
        <Link to={"/auth/login"} className="text-white">
          ¿Ya tienes cuenta?
          <span className="text-fuchsia-400 hover:text-fuchsia-500">
            {" "}
            Inicia Sesión
          </span>
        </Link>
        <Link to={"/auth/register"} className="text-white">
          ¿Aún no tienes cuenta?
          <span className="text-fuchsia-400 hover:text-fuchsia-500">
            {" "}
            Crea Una
          </span>
        </Link>
      </nav>
    </>
  );
}
