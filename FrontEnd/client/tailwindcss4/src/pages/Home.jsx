import React from 'react'
import { Carousel } from '../components';
import { iqoo, tecno } from '../assets';

const Home = () => {
  const products1 = [
    { name: "Product 1", price: 25, image: tecno },
    { name: "Product 2", price: 30, image: iqoo },
    { name: "Product 3", price: 45, image: tecno },
    { name: "Product 4", price: 60, image: iqoo },
    { name: "Product 5", price: 75, image: tecno},
  ];
  
  const products2 = [
    { name: "Product 6", price: 20, image: iqoo },
    { name: "Product 7", price: 35, image: tecno },
    { name: "Product 8", price: 50, image: iqoo },
    { name: "Product 9", price: 65, image: tecno },
    { name: "Product 10", price: 80, image: iqoo },
  ];
  
  const products3 = [
    { name: "Product 11", price: 22, image: iqoo },
    { name: "Product 12", price: 37, image: tecno },
    { name: "Product 13", price: 52, image: tecno },
    { name: "Product 14", price: 67, image: iqoo },
    { name: "Product 15", price: 85, image: tecno },
  ];

  return (
    <div className='flex flex-col mt-24 ml-8 mr-8'>
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <Carousel products={products1} />

      <h2 className="text-2xl font-bold">New Arrivals</h2>
      <Carousel products={products2} />

      <h2 className="text-2xl font-bold">Best Sellers</h2>
      <Carousel products={products3} />
    </div>
  )
}

export default Home