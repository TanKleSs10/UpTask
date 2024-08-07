import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      {" "}
      <h1 className="text-3xl font-black text-white">
        Reestablece tu Contraseña
      </h1>
      <p className="text-xl font-light text-white mt-5">
        Llena el formulario con el codigo que recibiste para {""}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
