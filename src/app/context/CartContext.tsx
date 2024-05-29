"use client";
import React, { createContext, useReducer, useContext, useEffect, ReactNode, Dispatch, useState } from 'react';

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const INITIALIZE = 'INITIALIZE';

interface Item {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem extends Item {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
}

interface CartAction {
    type: string;
    payload?: Item | CartState;
}

interface PopupState {
    visible: boolean;
    product: Item | null;
}

interface CartContextProps {
    state: CartState;
    dispatch: Dispatch<CartAction>;
    popupState: PopupState;
    setPopupState: (popupState: PopupState) => void;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

const initialPopupState: PopupState = {
    visible: false,
    product: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case INITIALIZE:
            return action.payload as CartState;
        case ADD_ITEM:
            const existingItemIndex = state.items.findIndex(item => item.id === (action.payload as Item).id);
            let updatedItems;

            if (existingItemIndex >= 0) {
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1,
                };
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                const newItem = {
                    ...(action.payload as Item),
                    quantity: 1,
                };
                updatedItems = [...state.items, newItem];
            }

            const updatedAmount = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedAmount,
            };
        case REMOVE_ITEM:
            const existingItemIndexToRemove = state.items.findIndex(item => item.id === (action.payload as Item).id);
            let updatedItemsAfterRemoval;
            let updatedAmountAfterRemoval;

            if (existingItemIndexToRemove >= 0) {
                const updatedItem = {
                    ...state.items[existingItemIndexToRemove],
                    quantity: state.items[existingItemIndexToRemove].quantity - 1,
                };
                updatedItemsAfterRemoval = [...state.items];
                if (updatedItem.quantity > 0) {
                    updatedItemsAfterRemoval[existingItemIndexToRemove] = updatedItem;
                } else {
                    updatedItemsAfterRemoval = state.items.filter(item => item.id !== (action.payload as Item).id);
                }
            } else {
                updatedItemsAfterRemoval = [...state.items];
            }

            updatedAmountAfterRemoval = updatedItemsAfterRemoval.reduce((total, item) => total + item.price * item.quantity, 0);

            return {
                ...state,
                items: updatedItemsAfterRemoval,
                totalAmount: updatedAmountAfterRemoval,
            };
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
}

const CartContext = createContext<CartContextProps>({
    state: initialState,
    dispatch: () => null,
    popupState: initialPopupState,
    setPopupState: () => null,
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isInitialized, setIsInitialized] = useState(false);
    const [popupState, setPopupState] = useState<PopupState>(initialPopupState);

    useEffect(() => {
        if (!isInitialized) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                const parsedCart: CartState = JSON.parse(storedCart);
                dispatch({ type: 'INITIALIZE', payload: parsedCart });
            }
            setIsInitialized(true);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }, [state, isInitialized]);

    return (
        <CartContext.Provider value={{ state, dispatch, popupState, setPopupState }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
