<?php

namespace App\Http\Controllers\View;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index($slug)
    {
        $slug = str_replace('&', ' ', $slug);
        [$nama, $gambar] = explode(' ', $slug, 2);
        $produk = str_replace('.', ' ', $gambar);
        [$nama_produk, $extensi] = explode(' ', $produk, 2);

        $namaProduk = ucwords($nama_produk);

        $produk = Produk::with('sizes')
            ->where('slug', $nama)
            ->first();

        return Inertia::render('View/order/index', [
            'produk' => $produk,
            'image' => $gambar,
            'slug' => $namaProduk,
        ]);
    }

    public function checkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            // 'email' => 'required|email|max:255',
            'telepon' => 'required|string|max:20',
            'alamat' => 'required|string|max:500',
            'ukuran_produk' => 'required|integer',
            'jumlah_produk' => 'required|integer|min:1',
            'produk_id' => 'required|integer',
            'total_bayar' => 'required|numeric|min:0',
            'proof' => 'required|file|image',
            'status' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $proofPath = null;
        if ($request->hasFile('proof')) {
            $proofPath = $request->file('proof')->store('proof', 'public');
        }
        $transaksi = new Transaksi();
        $transaksi->nama = $request->input('nama');
        $transaksi->email = $request->input('email');
        $transaksi->telepon = $request->input('telepon');
        $transaksi->alamat = $request->input('alamat');
        $transaksi->ukuran_produk = $request->input('ukuran_produk');
        $transaksi->jumlah_produk = $request->input('jumlah_produk');
        $transaksi->produk_id = $request->input('produk_id');
        $transaksi->total_bayar = $request->input('total_bayar');
        $transaksi->status = $request->input('status', 0);
        $transaksi->proof = $proofPath;
        $bookingTrxId = Transaksi::generateTrxId();
        $transaksi->booking_trx_id = $bookingTrxId;
        $transaksi->save();

        $orderId = Transaksi::select('booking_trx_id')->get();
        return Inertia::render('View/status-order/index', [
            'order_id' => $bookingTrxId,
            'id_transaksi' => $orderId
        ]);
    }

    public function viewStatusOrder()
    {
        $orderId = Transaksi::select('booking_trx_id')->get();
        return Inertia::render('View/status-order/index', [
            'id_transaksi' => $orderId
        ]);
    }

    public function statusOrder(Request $request)
    {
        $status = Transaksi::with('produk.sizes')
            ->where('booking_trx_id', $request->order_id)
            ->first();
        $ukuran = null;
        if ($status && $status->produk && $status->produk->sizes) {
            $ukuranObj = $status->produk->sizes->firstWhere('id', $status->ukuran_produk);
            $ukuran = $ukuranObj ? $ukuranObj->ukuran : null;
        }

        return Inertia::render('View/pembayaran/index', [
            'status' => $status,
            'ukuran' => $ukuran,
        ]);
    }

    public function statusPembayaran()
    {
        return Inertia::render('View/pembayaran/index');
    }

    public function checkOrderId(Request $request)
    {
        $ids = $request->input('order_ids', []);

        $validIds = Transaksi::whereIn('booking_trx_id', $ids)
            ->pluck('booking_trx_id')
            ->toArray();

        return response()->json($validIds);
    }
}
