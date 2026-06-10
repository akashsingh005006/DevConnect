import { useState } from "react";
import { loginUser } from "../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      window.location.reload();
    } catch (error) {
      alert("Invalid credentials");
      console.error(error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <div className="logo-dot"></div>
          <h2>DevConnect</h2>
        </div>

        <p className="login-subtitle">
          Real-time team communication
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <div className="demo-info">
          Demo Account<br />
          akash5@gmail.com<br />
          1234567
        </div>

      </div>

    </div>
  );
}

export default LoginPage;