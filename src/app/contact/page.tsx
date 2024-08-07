"use client"
import React from 'react'
import MaxWidth from '../partials/MaxWidth'
import { BreadcrumbItem, Breadcrumbs, Button, Input, Textarea } from '@nextui-org/react'

const Contact = () => {
    return (
        <MaxWidth>
            <Breadcrumbs size='lg' className='mb-3'>
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem>Contacts</BreadcrumbItem>
            </Breadcrumbs>
            <div className='mt-20 mb-10 flex flex-col gap-3 w-[500px] mx-auto'>
                <div className='flex items-center gap-4'>
                    <Input
                        isRequired
                        fullWidth
                        type="text"
                        label="Email"
                        name="email"
                        placeholder='Enter your email'
                        labelPlacement='outside'
                        size="lg"
                    />
                    <Input
                        isRequired
                        fullWidth
                        type="text"
                        label="Subject"
                        name="subject"
                        placeholder='Enter your subject'
                        labelPlacement='outside'
                        size="lg"
                    />
                </div>
                <Textarea
                    isRequired
                    label="Message"
                    labelPlacement="outside"
                    placeholder="Enter your message"
                    className="w-full my-3"
                    minRows={10}
                    classNames={{
                        label: "text-md"
                    }}
                    size='lg'
                />
                <Button color='primary'>Send Message</Button>
            </div>
        </MaxWidth>
    )
}

export default Contact