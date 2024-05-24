"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Loading from './Loading'
import FilterProducts from '../components/FilterProducts'

const Products = () => {
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const pathname = usePathname();
    const splitPathname = pathname.split('/');
    const productCategory = splitPathname[2];

    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products?page=1&limit=15`);
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section>
            {loading && <Loading />}
            {!loading && (
                <div>
                    <FilterProducts />
                    <div className='grid grid-cols-3 gap-4'>
                        {products?.map((product: any) => (
                            <Card shadow='sm' key={product.id} className='flex flex-col gap-3 items-center justify-between p-3'>
                                <Link href={`/products/${product.category}/${product.id.toString()}`}>
                                    <Image src={product.image} alt={product.title} width={200} />
                                </Link>
                                <Link href={`products/${product.id.toString()}`} className='text-center'>{product.title.length > 100 ? product.title.substring(0, 100) + '...' : product.title}</Link>
                                <p className='font-bold'>${product.price.toFixed(2)}</p>
                                <Button color="primary" size='lg'>
                                    Añadir al Carrito
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Products;