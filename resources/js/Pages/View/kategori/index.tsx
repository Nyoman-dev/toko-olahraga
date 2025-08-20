import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Home } from "@/lib/types";
import Navigation from "@/Pages/View/components/navigation";

export default function KategoriIndex({
    kategori,
    produk,
}: {
    kategori: Home[];
    produk: Home[];
}) {
    return (
        <>
            <Head title="kategori" />
            <div className="container pt-10 px-10 font-[Poppins] pb-28 bg-gray-200 md:w-2/4 mx-auto">
                <div className="grid grid-cols-3">
                    <Link href="/" className="bg-white w-fit p-2 rounded-full">
                        <ArrowLeft></ArrowLeft>
                    </Link>
                    <h1 className=" mx-auto text-xl text-black flex gap-2 font-extrabold items-center">
                        Kategori
                    </h1>
                </div>
                <div className="mt-5">
                    {kategori.length === 0 ? (
                        <div className="flex items-center rounded-xl bg-white">
                            <div className="p-4 w-[60%]">
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
                            <div
                                key={item.kategori_id}
                                className="flex items-center rounded-xl bg-white"
                            >
                                <div className="p-4 w-[60%]">
                                    <h3 className="text-base font-semibold">
                                        {item.nama_kategori}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        ({item.total_stok} {item.nama_kategori})
                                    </p>
                                </div>
                                <img
                                    src={`/storage/${item.foto_kategori}`}
                                    alt={item.nama_kategori}
                                    className="w-full h-24 rounded-xl object-center object-cover"
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-5">
                    <h2 className="text-lg font-bold">Kategori Produk</h2>
                    <div className="mt-5">
                        {produk.length === 0 ? (
                            <Link
                                href="#"
                                className="flex items-center p-3 rounded-xl bg-white border border-red-300"
                            >
                                <div className="w-24 h-24 bg-black rounded-xl"></div>
                                <div className="p-3">
                                    <h3 className="text-base font-semibold">
                                        Nama Prodak
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        kategori
                                    </p>
                                </div>
                                <p className="text-sm text-slate-500 ml-auto">
                                    (Stok 211)
                                </p>
                            </Link>
                        ) : (
                            produk.map((item) => (
                                <Link
                                    key={item.produk_id}
                                    href={`/produk/${item.slug_produk}`}
                                    className="flex items-center p-3 rounded-xl bg-white  border-2 border-transparent hover:border-[#A6FF00] transition-colors duration-300"
                                >
                                    <img
                                        src={`/storage/${item.thumbnail}`}
                                        alt={item.nama_produk}
                                        className="w-24 h-24 rounded-xl object-center object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-base font-semibold">
                                            {item.nama_produk}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {item.nama_kategori}
                                        </p>
                                    </div>
                                    <p className="text-sm text-slate-500 ml-auto">
                                        (Stok {item.stok})
                                    </p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                <Navigation></Navigation>
            </div>
        </>
    );
}
