import React from "react";

const Home = () => {
  return (
    <div>
      <header style={{ textAlign: "center", padding: "20px", background: "#f4f4f4" }}>
        <h1>Welcome to EcoHarvest</h1>
        <p>Your one-stop shop for organic products</p>
      </header>

      <main style={{ padding: "20px" }}>
        <h2>Featured Products</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
            <h3>Product 1</h3>
            <p>Product description...</p>
          </div>
          <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
            <h3>Product 2</h3>
            <p>Product description...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
