import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Produk } from "@/lib/types";
import FormOrder from "./_components/form-order";
import convertToRupiah from "@/utils/helpers";

type Props = {
    produk: Produk;
    image: string;
    slug: string;
};

export default function OrderIndex({ produk, image, slug }: Props) {
    return (
        <>
            <Head title="Order" />
            <div className="container pt-10 px-10 font-[Poppins] pb-10 bg-gray-200 md:w-2/4 mx-auto">
                <div className="grid grid-cols-3">
                    <Link
                        href={`/produk/${produk.slug}`}
                        className="bg-white w-fit p-2 rounded-full"
                    >
                        <ArrowLeft></ArrowLeft>
                    </Link>
                    <h1 className=" mx-auto text-xl text-[#1E1E1E] flex gap-2 font-extrabold items-center">
                        Order
                    </h1>
                </div>
                <div className="mt-5">
                    <img
                        src={`/storage/${image}`}
                        alt={produk.nama_produk}
                        className="bg-white w-full h-60 rounded-2xl object-contain"
                    />
                    <div className="mt-5 bg-white rounded-lg p-4">
                        <div className="flex justify-between border-b border-gray-300 pb-3">
                            <p className="font-semibold text-lg text-[#1E1E1E]">
                                {slug}
                            </p>
                            <p className="font-semibold text-[#1E1E1E]">
                                {convertToRupiah(produk.harga)}
                            </p>
                        </div>
                        <FormOrder
                            size={produk.sizes}
                            produk={produk}
                            image={image}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
