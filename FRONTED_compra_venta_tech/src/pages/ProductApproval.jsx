import { useEffect, useState } from "react";
import { getPendingProducts, approveProduct, rejectProduct } from "../services/ProductServices";

function ProductApproval() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Trae productos con is_accepted = false
    (async () => {
      const list = await getPendingProducts();
      setProducts(list);
    })();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos pendientes de aprobación</h2>
      {products.length === 0 ? (
        <p>No hay productos por aprobar.</p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button onClick={async () => {
              await approveProduct(p.id);
              setProducts(products.filter((x) => x.id !== p.id));
            }}>
              Aprobar
            </button>
            <button
              onClick={async () => {
                await rejectProduct(p.id);
                setProducts(products.filter((x) => x.id !== p.id));
              }}
              style={{ marginLeft: "10px" }}
            >
              Rechazar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductApproval;
