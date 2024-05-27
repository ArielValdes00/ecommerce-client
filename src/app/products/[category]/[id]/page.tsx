"use client"
import { HeartIcon } from '@/app/icons/HeartIcon';
import { BreadcrumbItem, Breadcrumbs, Button, Image } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { capitalizeFirstLetter } from '@/app/utils/functions';
import { useCart } from '@/app/context/CartContext';

const ProductId = () => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const { dispatch } = useCart();

    const pathname = usePathname();
    const splitPathname = pathname.split('/');
    const productId = Number(splitPathname[3]);
    const category = splitPathname[2];

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/${productId}`);
                const data = await res.json();
                setProduct(data.product);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        
        getData();
    }, [productId]);

    const handleAddToCart = (product: any) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const discountedPrice = product?.price - (product?.price * (product?.discount / 100))
    return (
        <main>
            {loading && <Loading />}
            {!loading && (
                <section>
                    <Breadcrumbs size='lg'>
                        <BreadcrumbItem href='/products'>Products</BreadcrumbItem>
                        <BreadcrumbItem href={`/products/${category}`}>{capitalizeFirstLetter(category)}</BreadcrumbItem>
                        <BreadcrumbItem>{product?.model}</BreadcrumbItem>
                    </Breadcrumbs>
                    <div key={product?.id} className='grid md:grid-cols-2 gap-5 py-10'>
                        <Image src={product?.image} alt={product?.title} width={900} height={900} />
                        <div className='flex flex-col items-start gap-3 mt-6'>
                            <p className='font-bold text-3xl'>{product?.title}</p>
                            {product?.popular && <p className='text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full'>Popular</p>}
                            <div className='flex flex-col'>
                                {product?.discount > 0 ? (
                                    <>
                                        <p className='text-lg text-gray-500 line-through'>${product?.price.toFixed(2)}</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='font-bold text-2xl'>${discountedPrice.toFixed(2)}</p>
                                            <p className='text-green-500 px-2 py-1'>{product?.discount}% OFF</p>
                                        </div>
                                    </>
                                ) : (
                                    <p className='font-bold text-xl'>${product?.price}</p>
                                )}
                            </div>
                            <div className='relative'>
                                <div className={`description ${showFullDescription ? 'max-h-full' : 'max-h-20 overflow-hidden'}`}>
                                    {product?.description.split('\r\n').map((desc: string, index: number) => (
                                        <p key={index} className='text-sm'>{desc}</p>
                                    ))}
                                </div>
                                <button
                                    className='show-more text-blue-500 mt-2'
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                >
                                    {showFullDescription ? 'Mostrar menos' : 'Mostrar más'}
                                </button>
                            </div>
                            <div className='flex items-center gap-2 w-full mt-1'>
                                <Button color="primary" size='lg' fullWidth={true} onClick={() => handleAddToCart(product)}>
                                    Añadir al Carrito
                                </Button>
                                <Button isIconOnly aria-label="Like" size='lg' className='bg-gray-200'>
                                    <HeartIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductId;
