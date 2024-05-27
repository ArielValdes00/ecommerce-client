"use client"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Badge } from "@nextui-org/react";
import { CartIcon } from "../icons/CartIcon";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

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
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl" className="mb-10">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/products">
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="cursor-pointer" onClick={handleOnClick}>
                    <Badge color="danger" content={state.items.length} isInvisible={isInvisible} shape="circle">
                        <CartIcon />
                    </Badge>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
