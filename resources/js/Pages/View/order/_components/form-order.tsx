import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Ukuran, Produk } from "@/lib/types";
import { Link, router } from "@inertiajs/react";
import convertToRupiah from "@/utils/helpers";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function FormOrder({
    size,
    produk,
}: {
    size: Ukuran[];
    produk: Produk;
}) {
    const [jumlah, setJumlah] = useState<number>(1);
    const [nama, setNama] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telepon, setTelepon] = useState<string>("");
    const [alamat, setAlamat] = useState<string>("");
    const [selectedUkuran, setSelectedUkuran] = useState<string>("");
    const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const increment = () => {
        if (typeof produk.stok === "number" && jumlah < produk.stok) {
            setJumlah(jumlah + 1);
        }
    };

    const decrement = () => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1);
        }
    };

    const totalHarga = (produk?.harga ?? 0) * jumlah;

    const handleCheckout = () => {
        if (!nama) {
            toast.error("Nama harus diisi");
            return;
        }
        // if (!email.trim()) {
        //     toast.error("Email harus diisi");
        //     return;
        // }
        if (!telepon.trim()) {
            toast.error("No Hp harus diisi");
            return;
        }
        if (!alamat.trim()) {
            toast.error("Alamat harus diisi");
            return;
        }
        if (!selectedUkuran) {
            toast.error("Ukuran harus dipilih");
            return;
        }
        if (!buktiPembayaran) {
            toast.error("Bukti pembayaran harus diunggah");
            return;
        }
        const formData = new FormData();
        formData.append("nama", nama);
        // formData.append("email", email);
        formData.append("telepon", telepon);
        formData.append("alamat", alamat);
        formData.append("ukuran_produk", selectedUkuran);
        formData.append("jumlah_produk", jumlah.toString());
        formData.append("produk_id", produk.id.toString());
        formData.append("proof", buktiPembayaran);
        formData.append("total_bayar", totalHarga.toString());
        formData.append("status", "0");

        router.post("/pembayaran", formData, {
            preserveScroll: true,
            onStart: () =>
                toast.loading("Membuat Pesanan...", { id: "insert-data" }),
            onSuccess: (response) => {
                toast.dismiss("insert-data");
                toast.success("Pesanan berhasil dibuat");
                const responOrderId = response?.props?.order_id as string;
                setOrderId(responOrderId);
                setNama("");
                setEmail("");
                setTelepon("");
                setAlamat("");
                setSelectedUkuran("");
                setJumlah(1);
                setBuktiPembayaran(null);
                setIsOrderPlaced(true);
            },

            onError: (error) => {
                toast.dismiss("insert-data");
                if (error?.message) {
                    toast.error(error.message);
                } else {
                    toast.error("Insert gagal");
                }
            },
        });
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="mt-3 border-b border-gray-300 pb-3">
                <div>
                    <Label
                        className="text-[#1E1E1E] font-semibold"
                        htmlFor="nama"
                    >
                        Nama
                    </Label>
                    <Input
                        className="active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00] mt-2"
                        id="nama"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                </div>
                {/* <div>
                    <Label
                        className="text-[#1E1E1E] font-semibold"
                        htmlFor="email"
                    >
                        Email
                    </Label>
                    <Input
                        className="active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00] mt-2"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div> */}
                <div>
                    <Label
                        className="text-[#1E1E1E] font-semibold"
                        htmlFor="telepon"
                    >
                        No Hp
                    </Label>
                    <Input
                        className="active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00] mt-2"
                        id="email"
                        placeholder="+62 xxxx xxxx xxxx"
                        type="number"
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                    />
                </div>
                <div>
                    <Label
                        className="text-[#1E1E1E] font-semibold"
                        htmlFor="alamat"
                    >
                        Alamat
                    </Label>
                    <Textarea
                        className="active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00] mt-2"
                        placeholder="Alamat"
                        id="alamats"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-5">
                <h2 className=" font-semibold">Jumlah</h2>
                <div className="mt-2 flex justify-evenly items-baseline">
                    <Button
                        onClick={decrement}
                        disabled={jumlah <= 1}
                        className="px-8"
                    >
                        -
                    </Button>
                    <span className="text-[#1E1E1E] font-semibold">
                        {jumlah}
                    </span>
                    <Button
                        onClick={increment}
                        disabled={
                            produk.stok !== undefined
                                ? jumlah >= produk.stok
                                : false
                        }
                        className="px-8 bg-[#A6FF00] text-[#1E1E1E] hover:bg-[#a6ff00c0]"
                    >
                        +
                    </Button>
                </div>
                <div className="mt-5">
                    <h2 className="font-semibold text-[#1E1E1E]">Ukuran</h2>
                    <Select
                        onValueChange={(value) => setSelectedUkuran(value)}
                        value={selectedUkuran}
                    >
                        <SelectTrigger className="bg-white mt-2 active:border-[#A6FF00] focus:border-[#A6FF00] focus:ring-[#A6FF00]">
                            <SelectValue placeholder="Pilih Ukuran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Ukuran</SelectLabel>
                                {size.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={`${item.id}`}
                                    >
                                        {item.ukuran}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-5 px-3 flex flex-col gap-3">
                <div className="mt-5 font-semibold">
                    <h3>Metode Pembayaran</h3>
                    <div className="flex gap-5 mt-5">
                        <img
                            src="/img/bca.png"
                            alt="BCA"
                            className="object-contain w-28"
                        />
                        <div className="font-semibold">
                            <p>Sport 70</p>
                            <p className="text-xs">3484-5635-9012-305</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex gap-5 items-center">
                        <img
                            src="/img/bri.png"
                            alt="BRI"
                            className="object-contain w-28 "
                        />
                        <div className="font-semibold">
                            <p>Sport 70</p>
                            <p className="text-xs">1739-5170-9012-315</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold" htmlFor="bukti-pembayaran">
                        Bukti Pembayaran
                    </Label>
                    <Input
                        className="mt-2"
                        id="bukti-pembayaran"
                        type="file"
                        typeof="image"
                        onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (file) setBuktiPembayaran(file);
                        }}
                    />
                </div>
            </div>
            <div className="mt-5 bg-opacity-90 backdrop-blur-md z-50">
                <div className="h-14 px-2 bg-black rounded-full font-semibold flex justify-between items-center">
                    <p className="text-white mx-7 text-lg">
                        {convertToRupiah(totalHarga)}
                    </p>
                    {!isOrderPlaced ? (
                        <Button
                            onClick={handleCheckout}
                            className="bg-[#A6FF00] text-[#1E1E1E] rounded-full py-2 px-4 hover:text-white"
                        >
                            Check Out
                        </Button>
                    ) : (
                        <Link
                            href={`/status-order?order_id=${orderId}`}
                            className="mx-2 py-1  px-2 bg-[#A6FF00] text-[#1E1E1E] rounded-full text-center text-sm hover:text-white"
                        >
                            Lihat Status Order
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
