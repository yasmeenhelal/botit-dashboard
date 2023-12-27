const OrderDetails = ({ order }) => {
  return (
    <div className="order-details">
      <h4>Order Number: {order.refNumber}</h4>
      {/* <p><strong>Order Date: </strong>{formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })}</p> */}
      <p><strong>Order Date: </strong>{order.orderDate}</p>
      <p><strong>Customer Name: </strong>{order.customerName}</p>
      <p><strong>Order Total Amount: </strong>{order.totalAmount}</p>
      <p><strong>Order Products: </strong></p>
      <ul>
        {order.products.map((product, index) => (
          <li key={index}>
            <p><strong>Name: </strong>{product.name}</p>
            <p><strong>Category: </strong>{product.category}</p>
            <p><strong>Price: </strong>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;

  