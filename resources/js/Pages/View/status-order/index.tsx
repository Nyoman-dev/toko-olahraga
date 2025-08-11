import { Head, Link } from "@inertiajs/react";
import { Boxes, ArrowLeft } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import Navigation from "../components/navigation";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { router, usePage } from "@inertiajs/react";

type Props = {
    order_id: string;
};
export default function StatusOrderIndex(order_id: Props) {
    const [orderId, setOrderId] = useState<string>(order_id.order_id);

    const handleSearch = () => {
        if (!orderId.trim()) {
            toast.error("Order ID harus diisi");
            return;
        }
        router.post(
            "/status-order",
            { order_id: orderId },
            {
                preserveScroll: true,
                onStart: () =>
                    toast.loading("Mencari Order...", { id: "insert-data" }),
                onSuccess: () => {
                    toast.dismiss("insert-data");
                    toast.success("Order ditemukan");
                    setOrderId("");
                },
                onError: (error) => {
                    toast.dismiss("insert-data");
                    if (error?.message) {
                        toast.error(error.message);
                    } else {
                        toast.error("Insert gagal");
                    }
                },
            }
        );
    };
    return (
        <>
            <Head title="Status Order" />
            <div className="container pt-10 px-10 font-[Poppins] pb-28 h-screen pb-10 bg-gray-200 md:w-2/4 mx-auto">
                <div className="grid grid-cols-3">
                    <Link href="/" className="bg-white w-fit p-2 rounded-full">
                        <ArrowLeft></ArrowLeft>
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
                        <Input
                            className="bg-white py-8 active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00] mt-2"
                            id="order_id"
                            placeholder="Brg-0001"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
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
                <Navigation></Navigation>
            </div>
        </>
    );
}
