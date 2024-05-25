import React from 'react'
import ProductCategorySelect from './selects/ProductCategorySelect'
import ProductPriceRange from './selects/ProductPriceRange'
import ProductColorSelect from './selects/ProductColorSelect';
import CheckboxIsPopular from './selects/CheckboxIsPopular';

interface FilterProductsProps {
    highestPrice: number;
    handlePriceRangeChange: (value: number | number[]) => void;
    productColors: any[];
    handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    colorFilter: string;
    handlePopularChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({ handlePopularChange, highestPrice, handlePriceRangeChange, productColors, handleColorChange, colorFilter }) => {
    return (
        <div className='py-3 grid grid-cols-2 lg:flex items-center justify-between gap-5'>
            <ProductCategorySelect />
            <ProductColorSelect
                handleColorChange={handleColorChange}
                productColors={productColors}
                colorFilter={colorFilter}
            />
            <ProductPriceRange
                highestPrice={highestPrice}
                handlePriceRangeChange={handlePriceRangeChange}
            />
            <CheckboxIsPopular handlePopularChange={handlePopularChange}/>
        </div>
    )
}

export default FilterProducts