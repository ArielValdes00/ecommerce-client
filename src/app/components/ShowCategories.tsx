import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/category`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
const ShowCategories = async () => {
    const data = await getCategories();

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
            {data.categories.map((category: string, index: number) => (
                <div className='flex flex-col gap-2' key={index}>
                    <Link href={`/products/${category}`} className='rounded-md h-[250px] bg-gray-100 flex items-center justify-center p-5 hover:bg-gray-200 trasition duration-200'>
                        <Image src={`/${category}.webp`} alt={category} width={150} height={210}/>
                    </Link>
                    <Link className='font-semibold text-xl capitalize hover:underline' href={`/products/${category}`}>{category}</Link>
                </div>
            ))}
        </div>
    )
}

export default ShowCategories