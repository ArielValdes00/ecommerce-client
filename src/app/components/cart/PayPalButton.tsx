import { useCart } from "@/app/context/CartContext";
import { truncateProductName } from "@/app/utils/functions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    taxAmount: number;
    shippingCost: number;
    discount: number;
    setOpenModalPurchaseCompleted: React.Dispatch<boolean>;
    payPalButtonDisable: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ setOpenModalPurchaseCompleted, payPalButtonDisable, taxAmount, shippingCost, discount }) => {
    const { state, dispatch } = useCart();
    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL!,
        currency: "USD",
        intent: "capture",
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const createOrder = (data: any, actions: any) => {
        const total = (state.totalAmount + shippingCost + taxAmount - discount).toFixed(2)
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: state.totalAmount.toString(),
                        },
                        shipping: {
                            currency_code: "USD",
                            value: shippingCost.toString(),
                        },
                        tax_total: {
                            currency_code: "USD",
                            value: taxAmount.toString(),
                        },
                        discount: {
                            currency_code: "USD",
                            value: discount.toString(),
                        }
                    },
                },
                items: state.items.map(item => ({
                    name: truncateProductName(item.title),
                    unit_amount: {
                        currency_code: "USD",
                        value: item.price.toString(),
                    },
                    image_url: item.image,
                    quantity: item.quantity.toString(),
                    sku: item.id,
                    category: "PHYSICAL_GOODS",
                })),
            }],
        });
    };

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            setOpenModalPurchaseCompleted(true);
            handleClearCart();
        });
    };

    const onError = (err: any) => {
        console.error("Error en el proceso de pago con PayPal:", err);
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons disabled={payPalButtonDisable} style={{
                layout: 'horizontal',
                color: 'blue',
                shape: 'pill',
                label: 'pay',
                height: 40,
                tagline: false
            }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    );
};
export default PayPalButton;