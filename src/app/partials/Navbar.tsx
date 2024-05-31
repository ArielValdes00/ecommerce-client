"use client"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Badge } from "@nextui-org/react";
import { CartIcon } from "../icons/CartIcon";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import AddToCartPopup from "../components/AddToCartPopup";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isInvisible, setIsInvisible] = useState<boolean>(true);

    const { state } = useCart();

    const router = useRouter();

    const handleOnClick = () => {
        router.push('/cart');
    };

    useEffect(() => {
        setIsInvisible(state.items.length === 0);
    }, [state.items.length]);

    const menuItems = [
        "Home",
        "Products",
        "Contact",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">NexBuy</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem>
                    <Link color="foreground" className="text-lg" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="text-lg" href="/products">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="text-lg" href="/contacts">
                        Contacts
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="cursor-pointer relative" onClick={handleOnClick}>
                    <Badge color="danger" showOutline={false} content={state.items.length} isInvisible={isInvisible} shape="circle">
                        <CartIcon />
                    </Badge>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={"foreground"}
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
            <AddToCartPopup/>
        </Navbar>
    );
}
