type ProductCardProps = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productStock: number;
  onEliminar: () => void;
};

export const ProductCard = ({
  productName,
  productDescription,
  productPrice,
  productImage,
  productStock,
  onEliminar,
}: ProductCardProps) => {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={productImage}
          alt={productName}
          className="product-image"
          loading="lazy"
        />
        <span className="product-stock-badge">
          {productStock} en stock
        </span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{productName}</h3>
        <p className="product-description">{productDescription}</p>
        <div className="product-footer">
          <span className="product-price">
            ${productPrice.toLocaleString("es", { minimumFractionDigits: 2 })}
          </span>
          <button
            type="button"
            className="btn-eliminar"
            onClick={onEliminar}
            aria-label="Eliminar producto"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};
