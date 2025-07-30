"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

type Produk = {
    id: number;
    nama_produk: string;
    thumbnail: string;
    slug: string;
};

export function ShoppingCard() {
    const [cartProducts, setCartProducts] = useState<Produk[]>([]);
    useEffect(() => {
        const storedCartProducts = localStorage.getItem("cart");
        if (storedCartProducts) {
            setCartProducts(JSON.parse(storedCartProducts));
        }
    }, []);

    const handleRemove = (id: number) => {
        const updatedCart = cartProducts.filter((product) => product.id !== id);
        setCartProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="flex py-2 px-4 rounded-full gap-1 items-center font-semibold transition-colors duration-300">
                    <ShoppingCart />
                    <span>
                        {cartProducts.length === 0 ? "" : cartProducts.length}
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Favorite Produk</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div
                            className="grid grid-cols-1 gap-2 card-scroll overflow-y-scroll"
                            style={{
                                scrollSnapType: "y mandatory",
                                WebkitOverflowScrolling: "touch",
                                scrollbarWidth: "none", // Firefox
                                msOverflowStyle: "none", // IE 10+
                                maxHeight: "200px",
                            }}
                        >
                            <style>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                            {cartProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/produk/${product.slug}`}
                                    className="flex items-center px-3 rounded-xl bg-white border border-[#A6FF00] hover:bg-[#A6FF00] transition-colors duration-300"
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <img
                                            src={`/storage/${product.thumbnail}`}
                                            alt={product.nama_produk}
                                            className="w-10 h-10 rounded-xl object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-base font-semibold">
                                                {product.nama_produk}
                                            </h3>
                                        </div>
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleRemove(product.id);
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
