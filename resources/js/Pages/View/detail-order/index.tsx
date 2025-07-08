import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { User, Phone, Mail, House, TicketSlash } from "lucide-react";

export default function DetailOrderIndex() {
    return (
        <>
            <Head title="Detail Pesanan" />
            <div className="container pt-10 px-10 font-[Poppins] pb-28 h-dvh bg-gray-200">
                <div className="grid grid-cols-3 border border-red-300">
                    <Link href="/" className="bg-white w-fit p-2 rounded-full">
                        <ArrowLeft></ArrowLeft>
                    </Link>
                    <h1 className=" mx-auto text-xl text-[#1E1E1E] flex gap-2 font-extrabold items-center">
                        Detail Pesanan
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
                                    <div className="bg-black h-24 w-24 rounded-lg"></div>
                                    <p className="font-semibold text-lg">
                                        Nama Produk
                                    </p>
                                </div>
                                <div className="mt-5 px-3 flex flex-col gap-3 font-semibold">
                                    <div className="flex justify-between">
                                        <p>Jumlah</p>
                                        <p>122</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Jumlah</p>
                                        <p>122</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Harga</p>
                                        <p>Rp 1.000.000</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Harga Total</p>
                                        <p className="text-[#28dc58] text-lg">
                                            Rp 12.000.000
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Tanggal Pemesanan</p>
                                        <p>12 Januari 2023</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p>Status</p>
                                        <p className="bg-[#28dc58] px-5 py-2 rounded-full">
                                            Success
                                        </p>
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
                                        <TicketSlash />
                                        <div>
                                            <p>Booking id</p>
                                            <p>Brg-0001</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <User />
                                        <div>
                                            <p>Nama</p>
                                            <p>Jhon Due</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <Phone />
                                        <div>
                                            <p>No Telepon</p>
                                            <p>08123456789</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <Mail />
                                        <div>
                                            <p>Email</p>
                                            <p>gBf4w@example.com</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <House />
                                        <div>
                                            <p>Alamat</p>
                                            <p>jl. abc no 123</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    );
}
