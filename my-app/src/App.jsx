import React, { useState, useMemo, useCallback } from "react";

function App() {
  // useState
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 },
  ]);

  const [cart, setCart] = useState([]);

  // useCallback - Add Product
  const addProduct = useCallback(() => {
    if (productName.trim() === "" || productPrice.trim() === "") {
      alert("Enter Product Name and Price");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: Number(productPrice),
    };

    setProducts((prev) => [...prev, newProduct]);

    setProductName("");
    setProductPrice("");
  }, [productName, productPrice]);

  // useCallback - Add to Cart
  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  // useCallback - Remove from Cart
  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // useMemo - Calculate Total Price
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  return (
    <div
      style={{
        width: "700px",
        margin: "30px auto",
        padding: "20px",
        border: "2px solid black",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Shopping Cart</h1>

      <hr />

      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button
        onClick={addProduct}
        style={{ marginLeft: "10px" }}
      >
        Add Product
      </button>

      <hr />

      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No Products Available</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid gray",
              paddingBottom: "5px",
            }}
          >
            <span>
              {product.name} - ₹{product.price}
            </span>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid gray",
              paddingBottom: "5px",
            }}
          >
            <span>
              {item.name} - ₹{item.price}
            </span>

            <button onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Total Cart Value : ₹{totalPrice}</h2>
    </div>
  );
}

export default App;