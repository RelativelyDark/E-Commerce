import React from 'react' 

const HomeCard = ({product}) => {
    return (
        <div className="bg-black rounded-2xl shadow-lg p-4 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg"
          />
          <h3 className="text-lg text-red-200 font-semibold mt-2">{product.name}</h3>
          <p className="text-yellow-600 text-sm">${product.price}</p>
        </div>
      );
}

export default HomeCard