"use client"
import React, { useEffect, useState } from 'react';
import { BreadcrumbItem, Breadcrumbs, Button, RadioGroup, useDisclosure } from '@nextui-org/react';
import { useCart } from '../context/CartContext';
import Loading from './Loading';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ShippingInformation from '../components/cart/ShippingInformation';
import ModalDeleteProduct from '../components/cart/ModalDeleteProduct';
import MaxWidth from '../partials/MaxWidth';
import { CustomRadio } from '../components/cart/CustomRadio';
import OrderInformation from '../components/cart/OrderInformation';
import PayPalButton from '../components/cart/PayPalButton';
import ModalPurchaseCompleted from '../components/cart/ModalPurchaseCompleted';

const CartPage = () => {
    const { state, dispatch } = useCart();
    const [loading, setLoading] = useState<boolean>(true);
    const [openModalPurchaseCompleted, setOpenModalPurchaseCompleted] = useState<boolean>(false);
    const [payPalButtonDisable, setPayPalButtonDisable] = useState<boolean>(true);
    const [modalContent, setModalContent] = useState<{ header: string, body: string, action: () => void }>({
        header: '',
        body: '',
        action: () => { }
    });
    const router = useRouter();
    const modalDeleteProduct = useDisclosure();

    const shippingCost = 10.00;
    const taxAmount = state.totalAmount * 0.1
    const [discount, setDiscount] = useState(0.00);

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
        setModalContent({
            header: 'Delete Product',
            body: 'Are you sure you want to delete this product?',
            action: () => handleRemoveFromCart(product)
        });
        modalDeleteProduct.onOpen();
    };

    const openClearCartModal = () => {
        setModalContent({
            header: 'Clear Cart',
            body: 'Are you sure you want to clear all items from the cart?',
            action: handleClearCart
        });
        modalDeleteProduct.onOpen();
    };

    return (
        <MaxWidth>
            <div className={`${loading ? 'h-[600px] grid place-center mt-20' : 'h-full'}`}>
                <ModalPurchaseCompleted
                onOpenChange={setOpenModalPurchaseCompleted}
                isOpen={openModalPurchaseCompleted}
                />
                <ModalDeleteProduct
                    handleRemoveFromCart={modalContent.action}
                    headerText={modalContent.header}
                    bodyText={modalContent.body}
                    onOpenChange={modalDeleteProduct.onOpenChange}
                    isOpen={modalDeleteProduct.isOpen}
                />
                {loading && <Loading />}
                {!loading && (
                    <div className="py-2">
                        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                            <BreadcrumbItem href='/products'>Products</BreadcrumbItem>
                            <BreadcrumbItem>Shopping Cart</BreadcrumbItem>
                        </Breadcrumbs>
                        {state.items.length === 0 ? (
                            <div className='flex flex-col items-center justify-center mt-6 h-[550px]'>
                                <Image src={"/emptycart.png"} loading='eager' alt='empty cart' width={400} height={400} />
                                <p className='text-3xl text-center font-semibold'>Your shopping cart is empty.</p>
                                <Button onClick={handleOnClick} size='lg' color="primary" className='mt-10'>
                                    Let&apos;s go Shopping!
                                </Button>
                            </div>
                        ) : (
                            <div className='grid lg:grid-cols-6 mt-6'>
                                <div className='col-span-4'>
                                    <p className='text-start py-4 text-xl font-semibold text-gray-500'>Shipping Information</p>
                                    <ShippingInformation setPayPalButtonDisable={setPayPalButtonDisable}/>
                                    <p className='text-start py-4 text-xl font-semibold text-gray-500'>Payment Method</p>
                                    <RadioGroup defaultValue={"PayPal"} label="" orientation='horizontal' className='py-4' >
                                        <CustomRadio
                                            isDisabled={false}
                                            description="Pay with PayPal"
                                            value="PayPal"
                                        >
                                            PayPal
                                        </CustomRadio>
                                        <CustomRadio
                                            isDisabled={true}
                                            description="Pay with Visa"
                                            value="Visa"
                                        >
                                            Visa
                                        </CustomRadio>
                                        <CustomRadio
                                            isDisabled={true}
                                            description="Pay with MasterCard"
                                            value='MasterCard'
                                        >
                                            MasterCard
                                        </CustomRadio>
                                    </RadioGroup>
                                </div>
                                <div className='col-span-2'>
                                    <OrderInformation
                                        shippingCost={shippingCost}
                                        taxAmount={taxAmount}
                                        setDiscount={setDiscount}
                                        discount={discount}
                                        openClearCartModal={openClearCartModal}
                                        openDeleteModal={openDeleteModal}
                                    />
                                    <PayPalButton
                                        discount={discount}
                                        shippingCost={shippingCost}
                                        taxAmount={taxAmount}
                                        setOpenModalPurchaseCompleted={setOpenModalPurchaseCompleted}
                                        payPalButtonDisable={payPalButtonDisable}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </MaxWidth>
    );
};

export default CartPage;
