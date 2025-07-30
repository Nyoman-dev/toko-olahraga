export type Home = {
    id_produk: number;
    nama_produk: string;
    thumbnail: string;
    harga: number;
    stok: number;
    kategori_id: number;
    nama_kategori: string;
    foto_kategori: string;
    slug_kategori: string;
    slug_produk: string;
    total_stok: number;
};
export type Foto = {
    id: number;
    foto: string;
};
export type Ukuran = {
    id: number;
    ukuran: string;
};
export type Produk = {
    id: number;
    nama_produk: string;
    slug: string;
    thumbnail: string;
    kategori_id: number;
    stok: number;
    fotos: Foto[];
    sizes: Ukuran[];
    deskripsi: string;
    harga: number;
};
export type Data = {
    nama: string;
    email: string;
    telepon: number;
    alamat: string;
    jumlah_produk: number;
    ukuran_produk: number;
    proof: string;
    total_bayar: number;
    status: string;
    produk_id: number;
};

export type Transaksi = {
    produk: Produk;
    size: Ukuran;
    total_bayar: number;
    tanggal_transaksi: string;
    status: string;
    booking_trx_id: string;
    nama: string;
    telepon: string;
    email: string;
    alamat: string;
    jumlah_produk: number;
    ukuran_produk: number;
    proof: string;
    created_at: string;
};
