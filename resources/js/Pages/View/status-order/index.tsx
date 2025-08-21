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
};
export default function StatusOrderIndex(order_id: Props) {
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const [orderIds, setOrderIds] = useState<string[]>([]);

    useEffect(() => {
        const storedOrders = JSON.parse(
            localStorage.getItem("orderIds") || "[]"
        );

        let extractedIds: string[] = [];

        if (Array.isArray(storedOrders)) {
            extractedIds = storedOrders
                .map((o: any) => {
                    if (typeof o === "string") return o; // format baru
                    if (typeof o === "object" && o?.order_id) return o.order_id; // format lama
                    return null;
                })
                .filter((id: any) => id);
        }

        // Tambahkan order_id baru jika ada
        let updatedIds = [...extractedIds];
        if (order_id?.order_id && !updatedIds.includes(order_id.order_id)) {
            updatedIds = [order_id.order_id, ...updatedIds];
        }

        // 🔍 Validasi ke server
        if (updatedIds.length > 0) {
            fetch("/check-order-ids", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        (
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            ) as HTMLMetaElement
                        )?.content || "",
                },
                body: JSON.stringify({ order_ids: updatedIds }),
            })
                .then((res) => res.json())
                .then((validIds: string[]) => {
                    // Hanya simpan yang valid
                    localStorage.setItem("orderIds", JSON.stringify(validIds));
                    setOrderIds(validIds);
                })
                .catch((err) => {
                    console.error("Gagal cek order id:", err);
                    // fallback: tetap pakai updatedIds
                    setOrderIds(updatedIds);
                });
        } else {
            localStorage.setItem("orderIds", JSON.stringify([]));
            setOrderIds([]);
        }
    }, [order_id]);

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
                <Navigation></Navigation>
            </div>
        </>
    );
}
