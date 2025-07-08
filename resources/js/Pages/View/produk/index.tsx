import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Produk } from "@/lib/types";
import CardProduk from "./components/card-produk";

export default function ProdukIndex({ produk }: { produk: Produk }) {
    return (
        <>
            <Head title="Detail Produk" />
            <div className="container h-dvh pt-10 px-10 font-[Poppins] pb-28 bg-gray-200 md:w-2/4 mx-auto">
                <div className="flex items-center">
                    <Link href="/" className="bg-white w-fit p-2 rounded-full">
                        <ArrowLeft></ArrowLeft>
                    </Link>
                    <h1 className=" mx-auto text-center text-xl text-black font-extrabold">
                        Detail Produk
                    </h1>
                </div>
                <CardProduk produk={produk} />
            </div>
        </>
    );
}
