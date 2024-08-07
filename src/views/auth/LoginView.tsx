import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: authUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      reset();
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-black text-white">Inicia Sesión</h1>
      <p className="text-xl font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold">Acceder a tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6 p-6 bg-white mt-5 rounded-md"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-5 flex justify-around">
        <Link to={"/auth/register"} className="text-white">
          ¿Aún no tienes cuenta?
          <span className="text-fuchsia-400 hover:text-fuchsia-500">
            {" "}
            Crea Una
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
