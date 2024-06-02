import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    total: any;
}
const PayPalButton: React.FC<PayPalButtonProps> = ({ total }) => {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                    currency_code: "USD",
                    value: total.toString(),
                  },
              },
            ],
          });
        }}
        
          
      />
    </PayPalScriptProvider>
  );
}
export default PayPalButton;