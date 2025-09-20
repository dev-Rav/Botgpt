import React from 'react'
import { FaRobot, FaUser } from "react-icons/fa6";

function Navbar() {
  return (
    <div className='nav flex items-center justify-between p-2 text-white bg-black h-16'>
        <div className="logo flex items-center gap-2">
            <FaRobot className='text-3xl text-purple-400' />
            <h3 className='text-white text-lg font-bold'><span className='text-blue-500'>GPT</span> Bot</h3>
        </div>
        <div className="user">
            <FaUser className='text-lg text-gray-300' />
        </div>
    </div>
  )
}

export default Navbar
