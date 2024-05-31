"use client"
import FilterProducts from '@/app/components/FilterProducts';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Pagination, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Loading from './Loading';
import { useCart } from '@/app/context/CartContext';
import MaxWidth from '@/app/partials/MaxWidth';
import { capitalizeFirstLetter } from '@/app/utils/functions';

const Category = () => {
    const [products, setProducts] = useState<any>(null);
    const [isPopularFilterActive, setIsPopularFilterActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [colorFilter, setColorFilter] = useState<string>('');
    const [productColors, setProductColors] = useState<any[]>([]);
    const [highestPrice, setHighestPrice] = useState<number>(0);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, highestPrice]);
    const { dispatch, setPopupState } = useCart();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const pathname = usePathname();
    const splitPathname = pathname.split('/');
    const productCategory = splitPathname[2];

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/category?type=${productCategory}`);
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
    }, [productCategory]);

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

    const filteredProducts = products?.filter((product: any) => {
        const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesColor = !colorFilter || product.color === colorFilter;
        const isPopular = !isPopularFilterActive || product.popular;
        return isWithinPriceRange && matchesColor && isPopular;
    });

    const handleAddToCart = (product: any) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        setPopupState({ visible: true, product });

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setPopupState({ visible: false, product: null });
        }, 3000);
    };

    return (
        <MaxWidth>
            {loading && <Loading />}
            {!loading && (
                <div>
                    <Breadcrumbs size='lg' className='mb-3'>
                        <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                        <BreadcrumbItem href={'/products'}>Products</BreadcrumbItem>
                        <BreadcrumbItem>{capitalizeFirstLetter(productCategory)}</BreadcrumbItem>
                    </Breadcrumbs>
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
                                <Link href={`${product.category}/${product.id.toString()}`}>
                                    <Image src={product.image} alt={product.title} width={200} height={200} />
                                </Link>
                                <Link href={`products/${product.id.toString()}`} className='text-center hover:underline'>{product.title.length > 100 ? product.title.substring(0, 100) + '...' : product.title}</Link>
                                <p className='font-bold'>${product.price.toFixed(2)}</p>
                                <Button color="primary" size='lg' onClick={() => handleAddToCart(product)}>
                                    Añadir al Carrito
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </MaxWidth>
    )
}

export default Category