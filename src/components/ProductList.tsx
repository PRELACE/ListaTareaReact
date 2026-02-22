import { ProductCard } from "./ProductCard";

export type Producto = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productStock: number;
};

type ProductListProps = {
  productos: Producto[];
  onEliminarProducto: (index: number) => void;
};

export const ProductList = ({
  productos,
  onEliminarProducto,
}: ProductListProps) => {
  return (
    <div className="product-catalog">
      {productos.map((producto, index) => (
        <ProductCard
          key={index}
          productName={producto.productName}
          productDescription={producto.productDescription}
          productPrice={producto.productPrice}
          productImage={producto.productImage}
          productStock={producto.productStock}
          onEliminar={() => onEliminarProducto(index)}
        />
      ))}
    </div>
  );
};
