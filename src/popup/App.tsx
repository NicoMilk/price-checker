import "./App.css";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  urls: string[];
};

function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "iPhone 14", urls: [] },
    { id: "2", name: "PlayStation 5", urls: [] },
  ]);
  const [activeProduct, setActiveProduct] = useState<string>("1");
  const [newProductName, setNewProductName] = useState("");

  const addProduct = () => {
    if (newProductName.trim() === "") return;

    const newId = Date.now().toString();
    const newProduct: Product = {
      id: newId,
      name: newProductName.trim(),
      urls: [],
    };

    setProducts([...products, newProduct]);
    setActiveProduct(newId);
    setNewProductName("");
  };

  const [newUrl, setNewUrl] = useState("");

  const addUrlToProduct = (productId: string) => {
    if (newUrl.trim() === "") return;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, urls: [...product.urls, newUrl.trim()] }
          : product
      )
    );

    setNewUrl("");
  };

  return (
    <>
      {/* Ajout de produit */}
      <div className="add-product-form">
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product name"
        />
        <button onClick={addProduct}>Add</button>
      </div>

      {/* Onglets */}
      <div className="tabs">
        {products.map((product) => (
          <button
            key={product.id}
            className={product.id === activeProduct ? "tab active" : "tab"}
            onClick={() => setActiveProduct(product.id)}
          >
            {product.name}
          </button>
        ))}
      </div>
      {/* Infos */}
      <div className="product-content">
        {products.map((product) =>
          product.id === activeProduct ? (
            <div key={product.id}>
              <h2>{product.name}</h2>

              <ul>
                {product.urls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>

              <input
                type="text"
                placeholder="Enter URL to track"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <button onClick={() => addUrlToProduct(product.id)}>
                Add URL
              </button>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

export default App;
