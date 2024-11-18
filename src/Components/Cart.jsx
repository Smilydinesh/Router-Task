import React from 'react';

function Cart({ cartItems, setCartItems }) {
    const handleQuantityChange = (id, operation) => {
        setCartItems(cartItems.map((item) => {
            if(item.product.id === id) {
                if(operation === 'increase') {
                    return {...item, quantity: item.quantity+1};
                } 
                if(operation === 'decrease' && item.quantity >1) {
                    return {...item, quantity: item.quantity-1};
                }
            }
            return item;
        }));
    };

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.product.id !== id));
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0) || 0;
    const discountedPrice = totalPrice - (totalPrice * 0.1);

    return(
        <>
            <h1 className='bg-blue-300 w-full text-black text-xl font-semibold p-2 text-center Your-Cart'>Your Cart</h1>
                <div>
                    {cartItems.length === 0 ? (
                        <p className='p-2 text-xl font-bold'>Your Cart is Empty</p>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.id} className='flex justify-between Cart'>
                                    <div className='flex gap-4 Cart-img'>
                                        <img src={item.product.image} alt={item.product.title} className='w-48 h-36 p-2 border-2 border-black m-5 rounded-md Image'></img>
                                        <h2 className='p-12 w-60 Title'>{item.product.title}</h2>
                                        <p className='p-12 font-semibold Price'>${item.product.price} * {item.quantity}</p> 
                                    </div>
                                    <div className='Cart-Data'>
                                    <div className='p-10 Cart-Quantity'>
                                        <button onClick={() => handleQuantityChange(item.product.id, 'decrease')} className='p-2 border-2 border-black h-12 rounded-lg font-bold'>-</button>
                                        <span className='p-2 font-semibold text-lg'>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.product.id, 'increase')} className='p-2 border-2 border-black h-12 rounded-lg font-bold'>+</button>    
                                    </div> 
                                    <div className='p-10 Cart-Remove'>
                                        <button onClick={() => handleRemove(item.product.id)} className='bg-red-500 p-2 font-semibold text-white text-md rounded-full hover:bg-red-600'>Remove</button>
                                    </div>
                                    </div>
                                </div>
                            ))}
                                <div className='p-10 font-semibold'>
                                    <h3 className='flex justify-end'>TotalPrice: ${totalPrice.toFixed(2)}</h3>
                                    <h3 className='flex justify-end'>DiscountedPrice: ${discountedPrice.toFixed(2)}</h3>
                                </div>
                        </div>
                    )}
                </div>
        </>
    );
}

export default Cart