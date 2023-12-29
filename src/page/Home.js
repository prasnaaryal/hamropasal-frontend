import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Homecard from '../component/Homecard'
import CardFeature from '../component/CardFeature'
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';



const Home = () => {
  const productData=useSelector((state)=>state.product.productList
  )
  console.log(productData)
  const homeProductCartList=productData.slice(1,5);
  const homeProductCartListvegetables=productData.filter(el=>el.category === "Vegetable",[])
  console.log(homeProductCartListvegetables)


  const loadingArray=new Array(4).fill(null)
  const loadingArrayFeature=new Array(4).fill(null)

  const slideProductRef=useRef()

  const nextProduct=()=>{

    slideProductRef.current.scrollLeft += 200

  }
  const preveProduct=()=>{
    slideProductRef.current.scrollLeft -= 200
  }

  const categoryList=[...new Set(productData.map(el=>el.category))]
  console.log(categoryList)

  //to display filtered data
  const [filterby,setFilterBy]=useState("")
  const [dataFilter,setDataFilter]=useState([])
  useEffect(()=>{
    
    setDataFilter(productData)
    
    
  },[productData])

  

  //when function is called ,data will be filtered
  const handleFilterProduct=(category)=>{
    const filter=productData.filter(el=>el.category.toLowerCase() ===category.toLowerCase())
    setDataFilter(()=>{
      return[
        ...filter

      ];})
    
  }


  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"/>

          </div>
        <h2 className='text-4xl md:text-7xl font-bold py-3'>The fastest Delivery in{''} <span className='text-red-900'>Your home </span></h2>
        <p className='py-3 text-base'>
        Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
        </p>
        <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md '>Order Now</button>
    
        </div>
      {/* right section */}

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          <Homecard/>
          {
            homeProductCartList[0] ?
             homeProductCartList.map(el=>{
              return(
                <Homecard
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                
                />
              );
            }):
            loadingArray.map((el,index)=>{
              return(
                <Homecard
                key={index}
                loading={"Loading..."}
                />
              )
            })
          }
     

        </div>


      </div>

      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>fresh vegetable</h2>
        </div>
        <div className='ml-auto flex gap-4'>
          <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
          <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg'><GrNext/></button>
        </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListvegetables[0] ?
           homeProductCartListvegetables.map(el=>{
            return(
              <CardFeature
              key={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}

              />


            );
           }) :
           loadingArrayFeature.map(el=><CardFeature loading="loading..."/>)
           
           
           


          }
        </div>

        <div className='my-5'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Your Product
          </h2>

          <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
            {
              categoryList[0] && categoryList.map(el=>{
                return(
                  <FilterProduct category={el} onClick={()=>handleFilterProduct(el)}/>


                )
              })
            }
        
          </div>

          <div className='flex flex-wrap justify-center gap-4 my-4'>

            {
              dataFilter.map(el=>{
                return(
                  <CardFeature
                  key={el.id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}

                  />
                )

              })
}
            </div>



        </div>

      </div>



    
  )
}

export default Home