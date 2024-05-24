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
        <div>
            {data.categories.map((category: string, index: number) => (
                <div key={index}>
                    <Link href={`/products/${category}`}>{category}</Link>
                </div>
            ))}
        </div>
    )
}

export default ShowCategories