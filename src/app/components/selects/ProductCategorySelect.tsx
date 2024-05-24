import { Select, SelectItem } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductCategorySelect: React.FC = () => {
    const [categories, setCategories] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();
    const splitPathname = pathname.split('/');
    const productCategory = splitPathname[2];

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/category`);
            const data = await res.json();
            setCategories(data.categories)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSelect = (category: string) => {
        router.push(`/products/${category}`);
    };
    console.log(productCategory)
    return (
        <Select
            items={categories}
            label="Categories"
            placeholder="Select a Category"
            className="max-w-xs"
            onChange={(e) => handleSelect(e.target.value)}
            selectedKeys={new Set([productCategory || ""])}
        >
            {categories?.map((category: string) => <SelectItem key={category}>{category}</SelectItem>)}
        </Select>
    )
}

export default ProductCategorySelect