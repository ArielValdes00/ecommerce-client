import { Select, SelectItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface ProductColorSelectProps {
    productColors: any[];
    handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    colorFilter: string;
}

const ProductColorSelect: React.FC<ProductColorSelectProps> = ({ productColors, handleColorChange, colorFilter }) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const path = usePathname();

    useEffect(() => {
        if (path === '/products') {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [path]);

    return (
        <Select
            items={productColors}
            label="Colors"
            placeholder="Select a Color"
            className="max-w-xs"
            onChange={handleColorChange}
            disabled={isDisabled}
            selectedKeys={colorFilter ? [colorFilter] : []}
        >
            {productColors?.map((color: string) =>
                <SelectItem key={color}>
                    {color}
                </SelectItem>
            )}
        </Select>
    )
}

export default ProductColorSelect