import { useState } from "react";
import { loginService } from "../services/UserServices.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function useLogin() {
  const { login } = useAuth();

  const navigate = useNavigate();
  let initalState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initalState);

  const [error, setError] = useState("");

  function handleChange({ target: { name, value } }) {
    setError("");
    setFormState({ ...formState, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginService(formState);

      console.log(data.token);
      login(data.token);

      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return { error, formState, handleSubmit, handleChange };
}
