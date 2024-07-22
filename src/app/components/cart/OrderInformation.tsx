import { useCart } from '@/app/context/CartContext';
import { DeleteIcon } from '@/app/icons/DeleteIcon';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface OrderInformationProps{
    openDeleteModal: (product: any) => void;
    openClearCartModal: (product: any) => void;
    setDiscount: React.Dispatch<number>;
    shippingCost: number;
    taxAmount: number;
    discount: number
}
const OrderInformation: React.FC<OrderInformationProps> = ({ openClearCartModal, openDeleteModal, setDiscount, shippingCost, taxAmount, discount }) => {
    const { state } = useCart();

    const [couponCode, setCouponCode] = useState('');
    

    const applyCoupon = () => {
        if (couponCode === 'SAVE10') {
            setDiscount(state.totalAmount * 0.05);
        }
    };
    return (
        <div className='mb-6'>
            <div className='flex justify-between items-center py-4 border-b'>
                <p className='text-start text-xl font-semibold text-gray-500 mb-1'>Your Order</p>
                <p onClick={openClearCartModal} className='text-red-600 hover:underline text-sm cursor-pointer'>
                    Clear Cart
                </p>
            </div>
            <div className='lg:pe-5 overflow-y-auto lg:max-h-[800px]'>
                {state.items.map((product: any) => (
                    <div key={product.id} className='flex flex-col border-b gap-4 items-center justify-between py-4'>
                        <div className='grid grid-cols-7 gap-3'>
                            <Link href={`/products/${product.category}/${product.id.toString()}`} className='col-span-2'>
                                <Image src={product.image} alt={product.title} width={800} height={800} />
                            </Link>
                            <div className='flex flex-col col-span-4 justify-center gap-1'>
                                <Link href={`products/${product.id.toString()}`} className='text-start hover:underline'>{product.title.length > 100 ? product.title.substring(0, 100) + '...' : product.title}</Link>
                                <p className='font-bold'>${product.price.toFixed(2)}
                                    <span className='ms-2 text-gray-500'>x {product.quantity === null ? "1" : product.quantity}</span>
                                </p>
                            </div>
                            <Button isIconOnly radius='full' variant='ghost' color='danger' size='lg' className='self-center ml-auto' onClick={() => openDeleteModal(product)}>
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-6'>
                <div className='flex gap-2 items-center justify-center'>
                    <Input
                        type='text'
                        name='coupon'
                        id='coupon'
                        size='lg'
                        labelPlacement='outside'
                        label='Coupon code'
                        placeholder='Enter your coupon code'
                        description='Use code for 5% off'
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button
                        type='button'
                        onClick={applyCoupon}
                        color='primary'
                        size='lg'
                    >
                        Apply
                    </Button>
                </div>
                <div className='mt-4 flex justify-between items-center'>
                    <p className='font-medium text-gray-700'>Subtotal:</p>
                    <p className='font-meduim'>${state.totalAmount.toFixed(2)}</p>
                </div>
                <div className='mt-4 flex justify-between items-center'>
                    <p className='font-medium text-gray-700'>Shipping:</p>
                    <p className='font-medium'>${shippingCost.toFixed(2)}</p>
                </div>
                <div className='mt-4 flex justify-between items-center'>
                    <p className='font-medium text-gray-700'>Tax:</p>
                    <p className='font-medium'>${taxAmount.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                    <div className='mt-4 flex justify-between items-center'>
                        <p className='font-medium text-gray-700'>Discount:</p>
                        <p className='font-medium text-green-600'>-${discount.toFixed(2)}</p>
                    </div>
                )}
                <div className='mt-4 border-t pt-4 flex justify-between items-center'>
                    <p className='font-bold text-xl'>Total:</p>
                    <p className='font-bold text-xl'>${(state.totalAmount + shippingCost + taxAmount - discount).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderInformation