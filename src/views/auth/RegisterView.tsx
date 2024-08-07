import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      reset();
      toast.success(data);
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-black text-white">Crear Cuenta</h1>
      <p className="text-xl font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-6 bg-white mt-6 flex flex-wrap gap-8 justify-center rounded-md"
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
            className="w-full p-2  border-gray-300 border"
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

        <div className="flex flex-col gap-5">
          <label className="font-normal text-xl">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-2  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-2 border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-xl">Repetir Password</label>

          <input
            id="password_confirm"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-2  border-gray-300 border"
            {...register("password_confirm", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirm && (
            <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
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
        <Link to={"/auth/forgot-password"} className="text-white">
          ¿Olvidaste tu contraseña?
          <span className="text-fuchsia-400 hover:text-fuchsia-500">
            {" "}
            Restablecer
          </span>
        </Link>
      </nav>
    </>
  );
}
