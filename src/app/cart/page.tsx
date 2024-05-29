"use client";
import React, { useEffect, useState, useRef } from 'react';
import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Loading from './Loading';
import { DeleteIcon } from '../icons/DeleteIcon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ShippingInformation from '../components/cart/ShippingInformation';
import ModalDeleteProduct from '../components/cart/ModalDeleteProduct';

const CartPage = () => {
    const { state, dispatch } = useCart();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const router = useRouter();
    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    const handleOnClick = () => {
        router.push('/products');
    };

    const handleRemoveFromCart = (product: any) => {
        const updatedItems = state.items.filter(item => item.id !== product.id);
        const updatedAmount = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        dispatch({ type: 'INITIALIZE', payload: { items: updatedItems, totalAmount: updatedAmount } });
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const openDeleteModal = (product: any) => {
        setSelectedProduct(product);
        onOpen();
    };

    return (
        <div className={`${loading ? 'h-[600px] grid place-center mt-20' : 'h-full'}`}>
            <ModalDeleteProduct
                handleRemoveFromCart={handleRemoveFromCart}
                product={selectedProduct}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
            {loading && <Loading />}
            {!loading && (
                <div className="py-10">
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                    <Breadcrumbs size='lg'>
                        <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                        <BreadcrumbItem href='/products'>Products</BreadcrumbItem>
                        <BreadcrumbItem>Shopping Cart</BreadcrumbItem>
                    </Breadcrumbs>
                    {state.items.length === 0 ? (
                        <div className='flex flex-col items-center justify-center mt-6 h-[550px]'>
                            <Image src={"/emptycart.png"} alt='empty cart' width={400} height={400} />
                            <p className='text-3xl font-semibold'>Your shopping cart is empty.</p>
                            <Button onClick={handleOnClick} size='lg' color="primary" className='mt-10'>
                                Let&apos;s go Shopping!
                            </Button>
                        </div>
                    ) : (
                        <div className='grid lg:grid-cols-5 gap-5 mt-6'>
                            <div className='col-span-3'>
                                <p className='text-start py-4 text-xl font-semibold text-gray-500'>Shipping Information</p>
                                <ShippingInformation />
                            </div>
                            <div className='col-span-2'>
                                <p className='text-start border-b py-4 text-xl font-semibold text-gray-500'>Your Order</p>
                                {state.items.map((product: any) => (
                                    <div key={product.id} className='flex flex-col border-b gap-4 items-center justify-between py-4'>
                                        <div className='grid grid-cols-4 gap-2'>
                                            <Link href={`/products/${product.category}/${product.id.toString()}`}>
                                                <Image src={product.image} alt={product.title} width={800} height={800} />
                                            </Link>
                                            <div className='flex flex-col col-span-2 justify-center gap-1'>
                                                <Link href={`products/${product.id.toString()}`} className='text-start hover:underline'>{product.title.length > 100 ? product.title.substring(0, 100) + '...' : product.title}</Link>
                                                <p className='font-bold'>${product.price.toFixed(2)}
                                                    <span className='ms-2 text-gray-500'>x {product.quantity === null ? "1" : product.quantity}</span>
                                                </p>
                                            </div>
                                            <Button isIconOnly radius='full' size='lg' className='self-center ml-auto' onClick={() => openDeleteModal(product)}>
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className='mt-10'>
                                    <p className='font-bold text-xl'>Total: ${state.totalAmount.toFixed(2)}</p>
                                    <Button color="secondary" size='lg' onClick={handleClearCart} className='mt-4'>
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartPage;
