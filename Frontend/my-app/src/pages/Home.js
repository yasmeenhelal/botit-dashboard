// import { useEffect,useState} from "react"
// import OrderDetails from '../components/OrderDetails';
// import SearchBar from '../components/SearchBar';

// const Home=()=>{
//     const [orders,setOrders]=useState(null)
    
    
    
//     useEffect(()=>{
//       const fetchOrders= async()=>{
 
//       const response = await fetch ('/orders')
//       const json= await response.json()

//     if(response.ok){
//         setOrders(json)

//     }
// }

//      fetchOrders()

//     },[])
    
//     return (
//         <div className="home">
//             <div className="orders">
//         {orders && orders.map((order)=>(

//             <OrderDetails order={order} key={order._id} />

//         ))}
//         </div>
        
//         </div>
//     )
// }

// export default Home

import { useEffect, useState } from "react";
import OrderDetails from '../components/OrderDetails';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [orders, setOrders] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/orders');
            const json = await response.json();

            if (response.ok) {
                setOrders(json);
                setFilteredOrders(json); // Initialize filtered orders with all orders
            }
        }

        fetchOrders();
    }, []);

    const handleSearch = async ({ minPrice, maxPrice, startDate, endDate }) => {
        try {
            const response = await fetch('/filter-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    minPrice,
                    maxPrice,
                    startDate,
                    endDate,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                setFilteredOrders(json);
            } else {
                // Handle error
                console.error('Error filtering orders');
            }
        } catch (error) {
            console.error('Error filtering orders', error);
        }
    };

    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} />
            <div className="orders">
                {filteredOrders && filteredOrders.map((order) => (
                    <OrderDetails order={order} key={order._id} />
                ))}
            </div>
        </div>
    );
}

export default Home;