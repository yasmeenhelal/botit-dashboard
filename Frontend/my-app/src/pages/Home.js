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
                setFilteredOrders(json);
            }
        }

        fetchOrders();
    }, []);

    const handleSearch = async ({ minPrice, maxPrice, startDate, endDate }) => {
        try {
            // Set default values if inputs are empty
            const defaultMinPrice = 0;
            const defaultMaxPrice = 10000;
    
            // Get today's date in the format YYYY-MM-DD
            const todayDate = new Date().toISOString().split('T')[0];
    
            const response = await fetch('/filter-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: startDate || '0001-01-01', // Set to the earliest possible date
                    endDate: endDate || todayDate,
                    minPrice: minPrice || defaultMinPrice,
                    maxPrice: maxPrice || defaultMaxPrice,
                }),
            });
    
            if (response.ok) {
                const json = await response.json();
                setFilteredOrders(json);
            } else {
                const errorText = await response.text();
                throw new Error(`Error filtering orders: ${errorText}`);
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