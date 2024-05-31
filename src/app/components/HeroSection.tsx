"use client"
import React from 'react'
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push('/products');
    };

    return (
        <div className="banner">
            <div className='flex flex-col items-start gap-5 px-5 text-white justify-center h-[480px] bg-dark-overlaypx-5 xl:px-0 max-w-[1234px] mx-auto'>
                <h1 className="text-4xl md:text-5xl font-bold">Master Your Moves</h1>
                <p className="text-lg md:text-2xl max-w-lg">Elevate gameplay with precision joysticks for every gamer.</p>
                <Button className="mt-2" size="lg" variant='solid' color="primary" onClick={handleOnClick}>Discover More</Button>
            </div>
        </div>
    )
}

export default HeroSection