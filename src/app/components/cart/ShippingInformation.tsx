import { Avatar, Input, Select, SelectItem } from '@nextui-org/react'
import countries from '@/app/data/countries.json';

const ShippingInformation = () => {
    return (
        <div className='flex flex-col gap-4 py-4 lg:pe-10'>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth={true}
                    type="text"
                    label="First name"
                    placeholder='Enter your first name'
                    labelPlacement='outside'
                    size="lg"
                />
                <Input
                    isRequired
                    fullWidth={true}
                    type="text"
                    label="Last Name"
                    placeholder='Enter your last name'
                    labelPlacement='outside'
                    size="lg"
                />
            </div>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth={true}
                    type="email"
                    label="Email Address"
                    placeholder='Enter your email'
                    labelPlacement='outside'
                    size="lg"
                />
                <Input
                    isRequired
                    fullWidth={true}
                    type="text"
                    label="Address"
                    placeholder='Enter your address'
                    labelPlacement='outside'
                    size="lg"
                />
            </div>
            <div className='flex items-center gap-4'>
                <Input
                    isRequired
                    fullWidth={true}
                    type="text"
                    label="City"
                    placeholder='Enter your city'
                    labelPlacement='outside'
                    size="lg"
                />
                <Select
                    isRequired
                    fullWidth={true}
                    label="Country"
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
                    fullWidth={true}
                    type="number"
                    label="Postal Code"
                    placeholder='12345'
                    labelPlacement='outside'
                    size="lg"
                />
                <Input
                    isRequired
                    fullWidth={true}
                    type="number"
                    label="Phone Number"
                    placeholder='+1 (555) 555 5555'
                    labelPlacement='outside'
                    size="lg"
                />
            </div>
        </div>
    )
}

export default ShippingInformation