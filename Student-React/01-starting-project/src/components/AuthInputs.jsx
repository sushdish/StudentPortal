import React from "react";
import { useState } from "react";
import { API } from "../backend";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";

export default function AuthInputs() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  function handleInputChange(identifier, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  const handleLogin = async () => {
    setSubmitted(true);
    await axios
      .post(
        `${API}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data;

        if (data === "Invalid login credentials") {
          alert("Invalid login credentials. Please try again.");
          return;
        } else {
          const userId = data.user._id;
          const userName = data.user.name;
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", userName);

          setValues({ ...values, email: "", password: "" });
          navigate("/profilePage");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label>Email</label>
          <input
            type="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </div>
      <div className="actions">
        <button className="button" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}
