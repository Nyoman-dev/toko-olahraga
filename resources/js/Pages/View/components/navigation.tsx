import { Link, usePage } from "@inertiajs/react";
import { House, ShoppingBag, UserRound, ShoppingCart } from "lucide-react";
import { ShoppingCard } from "./shopping-cart";

export default function Navigation() {
    const { url } = usePage();
    const isHome = url === "/";
    const isCart = url === "/detail-pesanan";
    const isOrder = url === "/status-order";
    // Common classes
    const baseLinkClass =
        "flex py-2 px-4 rounded-full gap-1 items-center font-semibold transition-colors duration-300";
    const activeBg = "bg-[#A6FF00] text-black";
    const inactiveBg = "bg-transparent text-white";
    return (
        <>
            <div className="navigation px-10 fixed bottom-5 left-0 right-0 bg-opacity-90 backdrop-blur-md z-50 md:w-2/4 mx-auto">
                <div className="h-16 bg-black rounded-full font-semibold flex justify-evenly items-center">
                    <Link
                        href="/"
                        className={`${baseLinkClass} ${
                            isHome ? activeBg : inactiveBg
                        }`}
                        aria-label="Home"
                    >
                        <House />
                        {isHome && <span>Home</span>}
                    </Link>
                    {/* My Order Link */}
                    <Link
                        href={route("view.order")}
                        className={`${baseLinkClass} ${
                            isOrder ? activeBg : inactiveBg
                        }`}
                        aria-label="My Order"
                    >
                        <ShoppingBag />
                        {isOrder && <span>My Order</span>}
                    </Link>
                    {/* <Link href={"/customer/login"} className="text-white">
                        <UserRound />
                    </Link> */}
                </div>
            </div>
        </>
    );
}
