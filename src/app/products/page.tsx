"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Image, Pagination } from '@nextui-org/react'
import Link from 'next/link'
import Loading from './Loading'
import FilterProducts from '../components/FilterProducts'
import { useCart } from '../context/CartContext'

const Products = () => {
    const [products, setProducts] = useState<any>(null);
    const [isPopularFilterActive, setIsPopularFilterActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [colorFilter, setColorFilter] = useState<string>('');
    const [productColors, setProductColors] = useState<any[]>([]);
    const [highestPrice, setHighestPrice] = useState<number>(0);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, highestPrice]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { dispatch } = useCart();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products?page=${currentPage}&limit=12`);
            const data = await res.json();
            setProducts(data.products);

            const uniqueColors = Array.from(new Set(data.products.map((product: any) => product.color)));
            setProductColors(uniqueColors);

            const maxPrice = Math.max(...data.products.map((product: any) => product.price));
            setHighestPrice(maxPrice);
            setPriceRange([0, maxPrice]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setColorFilter(event.target.value);
    };

    const handlePriceRangeChange = (value: number | number[]) => {
        if (Array.isArray(value) && value.length === 2) {
            setPriceRange(value as [number, number]);
        }
    };

    const handlePopularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPopularFilterActive(event.target.checked);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getData();
    };

    const handleAddToCart = (product: any) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const filteredProducts = products?.filter((product: any) => {
        const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesColor = !colorFilter || product.color === colorFilter;
        const isPopular = !isPopularFilterActive || product.popular;
        return isWithinPriceRange && matchesColor && isPopular;
    });

    return (
        <section className='py-10'>
            {loading && <Loading />}
            {!loading && (
                <div>
                    <FilterProducts
                        highestPrice={highestPrice}
                        handlePriceRangeChange={handlePriceRangeChange}
                        handleColorChange={handleColorChange}
                        productColors={productColors}
                        colorFilter={colorFilter}
                        handlePopularChange={handlePopularChange}
                    />
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filteredProducts?.map((product: any) => (
                            <Card shadow='sm' key={product.id} className='flex flex-col gap-3 items-center justify-between p-3'>
                                <Link href={`/products/${product.category}/${product.id.toString()}`}>
                                    <Image src={product.image} alt={product.title} width={200} />
                                </Link>
                                <Link href={`products/${product.category}/${product.id.toString()}`} className='text-center hover:underline'>{product.title.length > 100 ? product.title.substring(0, 100) + '...' : product.title}</Link>
                                <p className='font-bold'>${product.price.toFixed(2)}</p>
                                <Button color="primary" size='lg' onClick={() => handleAddToCart(product)}>
                                    Añadir al Carrito
                                </Button>
                            </Card>
                        ))}
                    </div>
                    <div className='flex items-center justify-center mt-10'>
                        <Pagination size='lg' showControls total={filteredProducts.length} initialPage={currentPage} onChange={handlePageChange} />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Products;