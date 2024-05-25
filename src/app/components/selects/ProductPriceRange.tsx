import React from "react";
import { Slider } from "@nextui-org/react";

interface ProductPriceRangeProps {
    highestPrice: number;
    handlePriceRangeChange: (value: number | number[]) => void;
}
const ProductPriceRange: React.FC<ProductPriceRangeProps> = ({ highestPrice, handlePriceRangeChange }) => {
    return (
        <Slider
            label="Price Range"
            step={50}
            minValue={0}
            maxValue={highestPrice}
            defaultValue={[0, highestPrice]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-sm"
            onChange={handlePriceRangeChange}
        />
    );
}

export default ProductPriceRange
