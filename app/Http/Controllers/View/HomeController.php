<?php

namespace App\Http\Controllers\View;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\FotoProduk;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = strtolower($request->search);
        $kategori = Kategori::select('id as kategori_id', 'nama_kategori', 'foto_kategori', 'slug as slug_kategori')
            ->withSum('produk as total_stok', 'stok')
            ->get();
        $produk = Produk::select('id as id_produk', 'slug as slug_produk', 'nama_produk', 'thumbnail', 'harga', 'kategori_id', 'stok',)
            ->where('popular', 1)
            ->orderBy('created_at', 'desc')
            ->get();
        $search = Produk::select('id as id_produk', 'slug as slug_produk', 'nama_produk', 'thumbnail', 'harga', 'kategori_id', 'stok',)
            ->whereRaw('LOWER(nama_produk) like ?', ['%' . $searchTerm . '%'])
            ->get();
        return Inertia::render('View/home/index', [
            'kategori' => $kategori,
            'produk' => $produk,
            'cari' => $search
        ]);
    }

    public function showKategori($slug_kategori)
    {
        $kategori = Kategori::select('id as kategori_id', 'nama_kategori', 'foto_kategori', 'slug as slug_kategori')
            ->where('slug', $slug_kategori)
            ->withSum('produk as total_stok', 'stok')
            ->get();
        $produk = Produk::select('id as produk_id', 'slug as slug_produk', 'nama_produk', 'thumbnail', 'kategori_id', 'stok',)
            ->where('kategori_id', $kategori[0]->kategori_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('View/kategori/index', [
            'kategori' => $kategori,
            'produk' => $produk,
        ]);
    }

    public function showProduk($slug_produk)
    {
        $produk = Produk::with('fotos')
            ->where('slug', $slug_produk)
            ->first();

        return Inertia::render('View/produk/index', [
            'produk' => $produk,
        ]);
    }
}
