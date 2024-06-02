import React from 'react';
import { Image } from '@nextui-org/react';
import { useCart } from '../context/CartContext';

const AddToCartPopup: React.FC = () => {
    const { popupState, setPopupState } = useCart();

    if (!popupState.visible || !popupState.product) return null;

    return (
        <div className="absolute top-10 w-[350px] sm:w-[400px] md:w-[500px] right-5 p-4 bg-white shadow-lg rounded-lg z-50">
            <div className="grid grid-cols-4 items-center gap-1 relative">
                <Image src={popupState.product.image} alt={popupState.product.title} width={100}/>
                <div className='col-span-3 text-sm pe-3'>
                    <p className="font-semibold">{popupState.product.title}</p>
                    <p className='my-1'>{`1 x $${popupState.product.price.toFixed(2)}`}</p>
                    <p className="text-green-500 font-semibold">¡Agregado al carrito con éxito!</p>
                </div>
            </div>
            <button onClick={() => setPopupState({ visible: false, product: null })} className="right-3 top-3 text-xl font-bold absolute">×</button>
        </div>
    );
};

export default AddToCartPopup;
