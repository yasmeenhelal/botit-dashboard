import { useEffect,useState} from "react"
import ProductDetails from '../components/ProductDetails';

const Products=()=>{
    const [products,setProducts]=useState(null)
    
    
    
    useEffect(()=>{
      const fetchProducts= async()=>{
 
      const response = await fetch ('/products')
      const json= await response.json()

    if(response.ok){
        setProducts(json)

    }
}

   fetchProducts()

    },[])
    
    return (
        <div className="home">
            <div className="products">
        {products && products.map((product)=>(

            <ProductDetails product={product} key={product._id} />

        ))}
        </div>
        
        </div>
    )
}

export default Products