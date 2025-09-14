import { Head, Link } from "@inertiajs/react";
import { Boxes, ArrowLeft } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import Navigation from "../components/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

type Props = {
    order_id: string;
    id_transaksi: string;
};

export default function StatusOrderIndex({ order_id, id_transaksi }: Props) {
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const [orderIds, setOrderIds] = useState<string[]>([]);

    useEffect(() => {
        // Ambil orderIds yang ada di localStorage
        let stored = JSON.parse(localStorage.getItem("orderIds") || "[]");
        if (!Array.isArray(stored)) stored = [];

        // Ambil daftar id valid dari id_transaksi (array of object)
        const validIds = Array.isArray(id_transaksi)
            ? id_transaksi.map((trx) => trx.booking_trx_id)
            : [];

        // Filter hanya order_id yang valid
        let filtered = stored.filter((id: string) => validIds.includes(id));

        // Jika ada order_id baru dari props dan belum ada, tambahkan
        if (order_id && !filtered.includes(order_id)) {
            filtered.unshift(order_id);
        }

        // Simpan kembali ke localStorage
        localStorage.setItem("orderIds", JSON.stringify(filtered));

        // Set ke state
        setOrderIds(filtered);
    }, [order_id, id_transaksi]);

    const handleSearch = () => {
        if (!selectedOrderId.trim()) {
            toast.error("Nomor Order Id harus diisi");
            return;
        }

        router.post(
            "/status-order",
            { order_id: selectedOrderId },
            {
                preserveScroll: true,
                onStart: () =>
                    toast.loading("Mencari Order...", { id: "insert-data" }),
                onSuccess: () => {
                    toast.dismiss("insert-data");
                    toast.success("Order ditemukan");
                },
                onError: (error) => {
                    toast.dismiss("insert-data");
                    if (error?.message) {
                        toast.error(error.message);
                    } else {
                        toast.error("Pencarian gagal");
                    }
                },
            }
        );
    };

    return (
        <>
            <Head title="Status Order" />
            <div className="container pt-10 px-10 font-[Poppins] pb-28 h-screen bg-gray-200 md:w-2/4 mx-auto">
                <div className="grid grid-cols-3">
                    <Link href="/" className="bg-white w-fit p-2 rounded-full">
                        <ArrowLeft />
                    </Link>
                    <h1 className=" mx-auto text-xl text-[#1E1E1E] flex gap-2 font-extrabold items-center">
                        Status Order
                    </h1>
                </div>
                <div className="bg-white rounded-xl p-5 mt-10">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-[#A6FF00] h-32 w-32 rounded-full flex items-center justify-center">
                            <Boxes className="w-12 h-12" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1E1E1E] mt-3">
                            Periksa Status Order
                        </h1>
                    </div>
                    <div className="mt-5 p-5">
                        <Label
                            className="text-[#1E1E1E] font-semibold"
                            htmlFor="order_id"
                        >
                            Nomor Order Id
                        </Label>
                        <Select
                            onValueChange={(value) => setSelectedOrderId(value)}
                            value={selectedOrderId}
                        >
                            <SelectTrigger className="bg-white mt-2 active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00]">
                                <SelectValue placeholder="Order Id" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Order ID</SelectLabel>
                                    {orderIds.length === 0 ? (
                                        <SelectItem value="-" disabled>
                                            Belum ada Order ID
                                        </SelectItem>
                                    ) : (
                                        orderIds.map((id, index) => (
                                            <SelectItem key={index} value={id}>
                                                {id}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-center mb-32">
                        <Button
                            onClick={handleSearch}
                            className="px-10 py-3 bg-[#A6FF00] mt-5 rounded-full text-[#1E1E1E] font-semibold"
                        >
                            Cari Orderan
                        </Button>
                    </div>
                </div>
                <Navigation />
            </div>
        </>
    );
}
