import React from 'react'

const CartProduct = ({id,name,image,category,qty,total,price}) => {
  return (
    <div className='bg-slate-200 p-2 flex'>
      <div className='p-3 bg-white rounded overflow-hidden'>
        <img src={image} className='h-28 w-36 object-cover'/>
      </div>

    </div>
  )
}

export default CartProduct