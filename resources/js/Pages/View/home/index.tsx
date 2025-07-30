import { Head, Link, router } from "@inertiajs/react";
import { Volleyball, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "@/Components/ui/input";
import Navigation from "@/Pages/View/components/navigation";
import { Home } from "@/lib/types";
import { useState } from "react";
import { ShoppingCard } from "../components/shopping-cart";

export default function HomePage({
    kategori,
    produk,
    cari,
}: {
    kategori: Home[];
    produk: Home[];
    cari: Home[];
}) {
    const [search, setSearch] = useState("");

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            "/",
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <>
            <Head title="Home" />
            <div className="container pt-10 px-10 font-[Poppins] pb-28 bg-gray-200 md:w-2/4 mx-auto">
                <div className="flex justify-between py-3 ">
                    <h1 className="text-3xl text-black flex gap-2 font-extrabold items-center">
                        <Volleyball size={30}></Volleyball> 70 Sport
                    </h1>
                    <div className="flex gap-3 items-center">
                        <ShoppingCard />
                        <a href="/admin/login" target="_blank">
                            <User className="hover:text-[#A6FF00]" />
                        </a>
                    </div>
                </div>
                <div className="relative flex items-center justify-center mt-5">
                    <Input
                        className="pl-10 focus:border-[#A6FF00] focus:ring-[#A6FF00] py-6 rounded-full bg-white"
                        value={search}
                        onChange={searchHandler}
                        placeholder="Cari produk anda..."
                    />
                    <Search className="text-muted-foreground absolute left-2" />
                    {cari.length > 0 && search.trim().length > 0 && (
                        <div className="bg-white w-[94%] border border-[#A6FF00] absolute top-14 rounded-xl">
                            <div className="search px-5 flex flex-col gap-3 my-3">
                                {cari.map((result, index) => (
                                    <Link
                                        key={index}
                                        href={`/produk/${result.slug_produk}`}
                                        className="hover:text-[#A6FF00]"
                                    >
                                        {result.nama_produk}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-7 ">
                    <div className="flex justify-between mb-3">
                        <h2 className="text-lg font-bold">Kategori Produk</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {kategori.length === 0 ? (
                            <div className="flex items-center rounded-xl bg-white border-2 border-transparent hover:border-[#A6FF00] transition-colors duration-300">
                                <div className="p-3 w-[50%]">
                                    <h3 className="text-base font-semibold">
                                        Baju
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        223 Baju
                                    </p>
                                </div>
                                <div className="w-full h-24 bg-black rounded-xl"></div>
                            </div>
                        ) : (
                            kategori.map((item) => (
                                <Link
                                    key={item.kategori_id}
                                    href={`/kategori/${item.slug_kategori}`}
                                    className="flex items-center  rounded-xl bg-white border-2 border-transparent hover:border-[#A6FF00] transition-colors duration-300"
                                >
                                    <div className="p-3 w-[60%]">
                                        <h3 className="text-base font-semibold">
                                            {item.nama_kategori}
                                        </h3>
                                        <p className="text-xs text-slate-500 pt-2">
                                            (Stok {item.total_stok})
                                        </p>
                                    </div>
                                    <img
                                        src={`/storage/${item.foto_kategori}`}
                                        alt={item.nama_kategori}
                                        className="w-full h-24 rounded-xl object-cover object-top"
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                <div className="mt-7 ">
                    <div className="flex justify-between mb-3">
                        <h2 className="text-lg font-bold">Produk Terkini</h2>
                    </div>
                    <div
                        className="card-scroll flex gap-2 overflow-x-scroll scroll-smooth"
                        style={{
                            scrollSnapType: "x mandatory",
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // IE 10+
                        }}
                        aria-label="Produk terbaru"
                    >
                        {/* Scrollbar hide for WebKit */}
                        <style>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {produk.map((item, index) => (
                            <Link
                                key={`${item.id_produk}-${index}`}
                                href={`/produk/${item.slug_produk}`}
                                className="flex flex-col justify-between bg-white p-3 min-w-[200px] rounded-3xl border-2 border-transparent hover:border-[#A6FF00] transition-colors duration-300"
                            >
                                <img
                                    src={`/storage/${item.thumbnail}`}
                                    alt={item.nama_produk}
                                    className="rounded-3xl w-48 h-50"
                                />
                                <div className=" text-sm mt-2 w-fit p-2">
                                    <p className="font-semibold">
                                        {item.nama_produk}
                                    </p>
                                    <p className="text-sm font-semibold pt-2">
                                        Rp {item.harga}
                                    </p>
                                </div>
                                <div className="flex justify-between items-baseline ">
                                    <p className="text-slate-400 text-xs px-2">
                                        (Stoks {item.stok})
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <Navigation></Navigation>
            </div>
        </>
    );
}
