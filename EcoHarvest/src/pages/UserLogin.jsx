import React from "react";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("User logged in");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          required
        />
        <button
          type="submit"
          style={{
            background: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
