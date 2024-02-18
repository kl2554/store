import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import '../App.css'; 
 
function ProductList() { 
const [products, setProducts] = useState([]); 
const [newProduct, setNewProduct] = useState({ 
name: '', 
price: 0, 
}); 
 
useEffect(() => { 
fetchProducts(); 
}, []); 
 
const fetchProducts = () => { 
axios.get('/api/products', { baseURL: 'http://localhost:3000' }) 
.then(response => setProducts(response.data)) 
.catch(error => console.error('Error fetching products:', 
error.response)); 
}; 
 
const handleInputChange = (e) => { 
const { name, value } = e.target; 
setNewProduct({ ...newProduct, [name]: value }); 
}; 
 
const addProduct = () => { 
axios.post('/api/products', newProduct, { baseURL: 'http://localhost:3000' 
}) 

 
.then(() => { 
fetchProducts(); 
setNewProduct({ 
name: '', 
price: 0, 
}); 
}) 
.catch(error => console.error('Error adding product:', error.response)); 
}; 
 
const deleteProduct = (productId) => { 
axios.delete(`/api/products/${productId}`, { baseURL: 
'http://localhost:3000' }) 
.then(() => fetchProducts()) 
.catch(error => console.error('Error deleting product:', error.response)); 
}; 
 
return ( 
<div className="product-list-container"> 
<h1>Product List</h1> 
<ul className="product-list"> 
{products.map(product => ( 
<li key={product.id} className="product-item"> 
<strong>ID:</strong> {product.id}<br /> 
<strong>Name:</strong> {product.name}<br /> 
<strong>Price:</strong> {product.price}<br /> 
<button onClick={() => deleteProduct(product.id)}>Delete</button> 
</li> 
))} 
</ul> 
 
<div> 
<h2>Add New Product</h2> 
<label>Name: </label> 
<input type="text" name="name" value={newProduct.name} 
onChange={handleInputChange} /><br /> 
<label>Price: </label> 
<input type="number" name="price" value={newProduct.price} 
onChange={handleInputChange} /><br /> 
<button onClick={addProduct}>Add Product</button> 
</div> 
</div> 
); 
} 
 
export default ProductList; 
