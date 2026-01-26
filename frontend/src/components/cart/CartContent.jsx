import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri';
export const CartContent = () => {
    const cartProducts = [{
        productId: 1, name: "Abstract Art Canvas", price: 49.99, size: "12x18", quantity: 1, image: "https://picsum.photos/200?random=1/"
    },
    {
        productId: 2, name: "Abstract Art Canvas", price: 49.99, size: "12x18", quantity: 1, image: "https://picsum.photos/200?random=1/"
    },
{
        productId: 3, name: "Abstract Art Canvas", price: 49.99, size: "12x18", quantity: 1, image: "https://picsum.photos/200?random=1/"
    }
];
  return (
    <div>
        {cartProducts.map((product, index) => (
            <div key={index} className='flex items-center justify-between mb-4 gap-4 border-b pb-4'>
                <div className='flex items-start gap-4 flex-1'>
                    <img src={product.image} alt={product.name} className='w-16 h-16 object-cover rounded'/>
                    <div className='flex-1'>
                        <h3 className='font-semibold text-gray-800'>{product.name}</h3>
                        <p className='text-sm text-gray-600'>Size: {product.size}</p>
                        <div className='flex items-center gap-4 mt-3'>
                            <div className='flex items-center border border-gray-300 rounded'>
                                <button className='px-2 py-1 text-lg font-medium hover:bg-gray-100'>-</button>
                                <span className='px-3 py-1 text-sm font-medium'>{product.quantity}</span>
                                <button className='px-2 py-1 text-lg font-medium hover:bg-gray-100'>+</button>
                            </div>
                            <p className='text-sm text-gray-800 font-medium'>${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <button className='p-2 hover:bg-red-50 rounded transition-colors'>
                    <RiDeleteBin3Line className='w-5 h-5 text-gray-600 hover:text-red-600'/>
                </button>
            </div>
        ))}
    </div>
  )
}
