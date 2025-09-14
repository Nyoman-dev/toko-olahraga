import { Head, Link } from "@inertiajs/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { User, Phone, Mail, House } from "lucide-react";
import { Transaksi } from "@/lib/types";
import convertToRupiah from "@/utils/helpers";
import { Info } from "lucide-react";

export default function PembayaranIndex({
    status,
    ukuran,
}: {
    status: Transaksi;
    ukuran: string;
}) {
    return (
        <>
            <Head title="Pembayaran" />
            <div className="container h-dvh pt-10 px-10 font-[Poppins] pb-10 bg-gray-200 md:w-2/4 mx-auto">
                <div className="text-center">
                    <h1 className=" mx-auto text-xl text-[#1E1E1E] flex gap-2 font-extrabold items-center">
                        Status Pembayaran
                    </h1>
                </div>
                <div className="mt-5">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-white rounded-xl p-4"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold text-xl">
                                Pesanan Anda
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`/storage/${status.email}`}
                                        alt={status.produk.nama_produk}
                                        className="bg-white h-24 w-24 rounded-lg object-cover"
                                    />
                                    <p className="font-semibold text-lg">
                                        {status.email
                                            .replace(/\.[^.]+$/, "") // hapus ekstensi file (setelah titik terakhir)
                                            .split("-") // pisahkan dengan "-"
                                            .map(
                                                (w) =>
                                                    w.charAt(0).toUpperCase() +
                                                    w.slice(1)
                                            ) // kapital huruf pertama
                                            .join("-")}
                                    </p>
                                </div>
                                <div className="mt-5 px-3 flex flex-col gap-3 font-semibold">
                                    <div className="flex justify-between">
                                        <p>Harga</p>
                                        <p>
                                            {convertToRupiah(
                                                status.produk.harga
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Jumlah</p>
                                        <p>{status.jumlah_produk}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Ukuran</p>
                                        <p>{ukuran}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Tanggal Pemesanan</p>
                                        <p>
                                            {new Date(
                                                status.created_at
                                            ).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Status</p>
                                        <p
                                            className={`${
                                                status.status == "0"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {status.status == "0"
                                                ? "Unpaid"
                                                : "Success"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <p>Total Bayar</p>
                                        <p className="text-[#28dc58] font-bold text-xl">
                                            {convertToRupiah(
                                                status.total_bayar
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <p>Hubungi Kurir Kami</p>
                                        <p>+6282192443658</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="mt-5">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-white rounded-xl p-4"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold text-xl">
                                Pelanggan
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="mt-5 px-3 flex flex-col gap-3 font-semibold">
                                    <div className="flex gap-5 items-center">
                                        <User />
                                        <div>
                                            <p>Nama</p>
                                            <p>{status.nama}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <Phone />
                                        <div>
                                            <p>No Telepon</p>
                                            <p>{status.telepon}</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex gap-5 items-center">
                                        <Mail />
                                        <div>
                                            <p>Email</p>
                                            <p>{status.email}</p>
                                        </div>
                                    </div> */}
                                    <div className="flex gap-5 items-center">
                                        <House />
                                        <div>
                                            <p>Alamat</p>
                                            <p>{status.alamat}</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="pb-10 mt-5 bg-opacity-90 backdrop-blur-md z-50">
                    <div className=" px-2 py-3 bg-black rounded-full flex justify-between items-center">
                        <p className="text-white mx-7 text-sm w-1/2 flex gap-2 items-center">
                            <Info className="w-9 h-9" /> Kamin selau melindugi
                            data Pengguna
                        </p>
                        <Link
                            href="/"
                            className="bg-[#A6FF00] px-3 py-2 mx-1 text-[#1E1E1E] rounded-full font-semibold"
                        >
                            Bact to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
