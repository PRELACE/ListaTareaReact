import { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import type { Producto } from "./ProductList";

const productosIniciales: Producto[] = [
  {
    productName: "Laptop Pro 15",
    productDescription: "Portátil de alto rendimiento con pantalla 4K y 16GB RAM",
    productPrice: 1299.99,
    productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    productStock: 12,
  },
  {
    productName: "Auriculares Bluetooth",
    productDescription: "Cancelación de ruido activa, 30h de batería",
    productPrice: 89.99,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    productStock: 45,
  },
  {
    productName: "Smartwatch Sport",
    productDescription: "Monitor de ritmo cardíaco, GPS y resistencia al agua",
    productPrice: 199.99,
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    productStock: 28,
  },
];

export const CatalogApp = () => {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: "",
    productStock: "",
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(nuevoProducto.productPrice);
    const stock = parseInt(nuevoProducto.productStock, 10);
    if (!nuevoProducto.productName.trim() || isNaN(price) || isNaN(stock)) return;

    const producto: Producto = {
      productName: nuevoProducto.productName.trim(),
      productDescription: nuevoProducto.productDescription.trim(),
      productPrice: price,
      productImage: nuevoProducto.productImage.trim() || "https://placehold.co/400x300?text=Sin+imagen",
      productStock: stock,
    };

    setProductos((prev) => [...prev, producto]);
    setNuevoProducto({
      productName: "",
      productDescription: "",
      productPrice: "",
      productImage: "",
      productStock: "",
    });
    setPreviewError(false);
    setModalAbierto(false);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNuevoProducto({
      productName: "",
      productDescription: "",
      productPrice: "",
      productImage: "",
      productStock: "",
    });
    setPreviewError(false);
  };

  const handleEliminarProducto = (index: number) => {
    setProductos((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarModal();
    };
    if (modalAbierto) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [modalAbierto]);

  return (
    <div className="app-container">
      <div className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <button
          type="button"
          className="btn-add-product"
          onClick={() => setModalAbierto(true)}
        >
          Agregar producto
        </button>
      </div>

      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 id="modal-title">Nuevo producto</h2>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={cerrarModal}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            <form className="product-form modal-form" onSubmit={handleAddProduct}>
              <div className="form-section">
                <span className="form-section-title">Información básica</span>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="product-name">Nombre</label>
                    <input
                      id="product-name"
                      type="text"
                      value={nuevoProducto.productName}
                      onChange={(e) => setNuevoProducto((p) => ({ ...p, productName: e.target.value }))}
                      placeholder="Ej: Laptop Pro 15"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-price">Precio ($)</label>
                    <input
                      id="product-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={nuevoProducto.productPrice}
                      onChange={(e) => setNuevoProducto((p) => ({ ...p, productPrice: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="product-description">Descripción</label>
                  <input
                    id="product-description"
                    type="text"
                    value={nuevoProducto.productDescription}
                    onChange={(e) => setNuevoProducto((p) => ({ ...p, productDescription: e.target.value }))}
                    placeholder="Breve descripción del producto"
                  />
                </div>
                <div className="form-group form-group-sm">
                  <label htmlFor="product-stock">Stock</label>
                  <input
                    id="product-stock"
                    type="number"
                    min="0"
                    value={nuevoProducto.productStock}
                    onChange={(e) => setNuevoProducto((p) => ({ ...p, productStock: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <span className="form-section-title">Imagen del producto</span>
                <div className="form-row form-row-image">
                  <div className="form-group form-group-flex">
                    <label htmlFor="product-image-url">URL de imagen</label>
                    <input
                      id="product-image-url"
                      type="url"
                      value={nuevoProducto.productImage}
                      onChange={(e) => {
                        setNuevoProducto((p) => ({ ...p, productImage: e.target.value }));
                        setPreviewError(false);
                      }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="form-image-url"
                    />
                  </div>
                  <div className="form-group form-group-upload">
                    <label>O subir archivo</label>
                    <label className="btn-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setNuevoProducto((p) => ({ ...p, productImage: reader.result as string }));
                              setPreviewError(false);
                            };
                            reader.readAsDataURL(file);
                          }
                          e.target.value = "";
                        }}
                      />
                      Elegir imagen
                    </label>
                  </div>
                </div>
                {nuevoProducto.productImage && !previewError ? (
                  <div className="image-preview-wrap">
                    <span className="preview-label">Vista previa</span>
                    <img
                      src={nuevoProducto.productImage}
                      alt="Vista previa"
                      className="image-preview"
                      onError={() => setPreviewError(true)}
                    />
                  </div>
                ) : (
                  <div className="image-placeholder">
                    <span className="image-placeholder-icon"></span>
                    <span>Agrega una URL o sube una imagen</span>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-add">
                  Agregar al catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ProductList
        productos={productos}
        onEliminarProducto={handleEliminarProducto}
      />
    </div>
  );
};
