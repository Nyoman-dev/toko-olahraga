import { Link } from "@inertiajs/react";
import { Produk, Foto } from "@/lib/types";
import { useState } from "react";

const harga = (harga: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(harga);
};

export default function CardProduk({ produk }: { produk: Produk }) {
    const [currentThumbnail, setCurrentThumbnail] = useState(produk.thumbnail);
    return (
        <>
            <div className="mt-5">
                <img
                    src={`/storage/${currentThumbnail}`}
                    alt={produk.nama_produk}
                    className="thubnail bg-white rounded-2xl h-72 object-contain w-full"
                />
                <div className="flex justify-evenly mt-2">
                    {produk.fotos.map((item: Foto) => (
                        <img
                            className="detail bg-white h-20 w-20 rounded-xl border-2 border-transparent hover:border-[#A6FF00] transition-colors duration-300"
                            key={item.id}
                            src={`/storage/${item.foto}`}
                            alt={item.foto}
                            onClick={() => setCurrentThumbnail(item.foto)}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <div className="flex items-baseline justify-between">
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">
                        {produk.nama_produk}
                    </h1>
                    <p className="text-sm font-semibold text-[#232323]">
                        (Stok {produk.stok})
                    </p>
                </div>
                <p className="mt-2 text-sm text-[#232323]">
                    {produk.deskripsi}
                </p>
            </div>
            <div className="mt-5 pb-10 bg-opacity-90 backdrop-blur-md z-50">
                <div className="h-14 px-2 bg-black rounded-full font-semibold flex justify-between items-center">
                    <p className="text-white mx-7 text-lg">
                        ({harga(produk.harga)})
                    </p>
                    <Link
                        href={`/order/${produk.slug}`}
                        className="bg-[#A6FF00] text-[#1E1E1E] rounded-full py-2 px-4"
                    >
                        Beli Sekarang
                    </Link>
                </div>
            </div>
        </>
    );
}
