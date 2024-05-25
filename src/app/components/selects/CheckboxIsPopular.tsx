import { Checkbox } from '@nextui-org/react'
import React from 'react'

interface CheckboxIsPopularProps {
    handlePopularChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxIsPopular: React.FC<CheckboxIsPopularProps> = ({ handlePopularChange }) => {
    return (
        <Checkbox size={"lg"} onChange={handlePopularChange}>Popular</Checkbox>
    )
}

export default CheckboxIsPopular