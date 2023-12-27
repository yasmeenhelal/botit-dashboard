const ProductDetails = ({ product }) => {
    return (
      <div className="order-details">
        <h4>Product ID: {product.productID}</h4>
        <p><strong>Name: </strong>{product.name}</p>
        <p><strong>Category: </strong>{product.category}</p>
        <p><strong>Price: </strong>{product.price}</p>
      </div>
    );
  };
  
  export default ProductDetails;
  
    