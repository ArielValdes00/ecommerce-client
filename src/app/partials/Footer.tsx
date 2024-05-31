import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='py-10 flex flex-col items-center justify-center gap-4 bg-gray-100 text-sm'>
            <span className='text-3xl font-bold'>
                NexBuy
            </span>
            <div className='flex items-center justify-center gap-7'>
                <Link href={"/"} className='hover:underline'>Home</Link>
                <Link href={"/products"} className='hover:underline'>Products</Link>
                <Link href={"/contact"} className='hover:underline'>Contact</Link>
            </div>
            <p className='text-gray-500'>© 2024 NexBuy Inc. All rights reserved.</p>
        </footer>
    )
}

export default Footer