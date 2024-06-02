import React, { useState } from 'react';
import { Avatar, Input, Select, SelectItem } from '@nextui-org/react';
import countries from '@/app/data/countries.json';
import { validateAddress, validateCity, validateEmail, validateFirstName, validateLastName, validatePhoneNumber, validatePostalCode } from '@/app/utils/validations';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    phoneNumber?: string;
}
const ShippingInformation = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        switch (name) {
            case 'firstName':
                setErrors({ ...errors, [name]: validateFirstName(value) });
                break;
            case 'lastName':
                setErrors({ ...errors, [name]: validateLastName(value) });
                break;
            case 'email':
                setErrors({ ...errors, [name]: validateEmail(value) });
                break;
            case 'address':
                setErrors({ ...errors, [name]: validateAddress(value) });
                break;
            case 'city':
                setErrors({ ...errors, [name]: validateCity(value) });
                break;
                case 'postalCode':
                setErrors({ ...errors, [name]: validatePostalCode(value) });
                break;
                case 'phoneNumber':
                setErrors({ ...errors, [name]: validatePhoneNumber(value) });
                break;
            default:
                break;
        }
    };

    return (
        <div className='flex flex-col gap-4 py-4 lg:pe-10'>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth
                    type="text"
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName}
                    placeholder='Enter your first name'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
                <Input
                    isRequired
                    fullWidth
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName}
                    placeholder='Enter your last name'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
            </div>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    placeholder='Enter your email'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
                <Input
                    isRequired
                    fullWidth
                    type="text"
                    label="Address"
                    name="address"
                    value={formData.address}
                    isInvalid={!!errors.address}
                    errorMessage={errors.address}
                    placeholder='Enter your address'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
            </div>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth
                    type="text"
                    label="City"
                    name="city"
                    value={formData.city}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city}
                    placeholder='Enter your city'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
                <Select
                    isRequired
                    fullWidth
                    label="Country"
                    name="country"
                    labelPlacement='outside'
                    size='lg'
                    placeholder='Select a country'
                >
                    {countries.map(country => (
                        <SelectItem
                            key={country.code}
                            startContent={<Avatar alt={country.name} className="w-6 h-6" src={`https://flagcdn.com/${country.code}.svg`} />}
                        >
                            {country.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth
                    type="number"
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    isInvalid={!!errors.postalCode}
                    errorMessage={errors.postalCode}
                    placeholder='12345'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
                <Input
                    isRequired
                    fullWidth
                    type="number"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    placeholder='+1 (555) 555 5555'
                    labelPlacement='outside'
                    size="lg"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ShippingInformation;
