import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/CartProduct'

const Cart = () => {
    const productCartItem=useSelector((state)=>state.product.cartItem)
    console.log(productCartItem)

  return (
    <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Your Cart items</h2>

        <div className=''>
            {/* displaying cart items */}
            <div className=''>
                {
                    productCartItem.map(el=>{
                      return(
                        <CartProduct

                        key={el._id}
                        id={el._id}
                        name={el.name}
                        image={el.image}
                        category={el.category}
                        qty={el.qty}
                        total={el.total}
                        price={el.price}

                         />
                      )
                    })
                }
            </div>

         {/* total cart items */}

            <div className=''></div>
        </div>

    </div>
  )
}

export default Cart