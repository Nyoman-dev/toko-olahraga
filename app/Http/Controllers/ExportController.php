<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Exports\TransaksiExport;
use Illuminate\Support\Facades\Log;

class ExportController extends Controller
{
    public function export(Request $request)
    {
        $produkId = data_get($request->all(), 'tableFilters.produk_id.value');
        if ($produkId) {
            $namaProduk = Transaksi::with('produk')
                ->where('produk_id', $produkId)
                ->first()?->produk?->nama_produk ?? '';

            $fileName = 'Laporan-Penjualan-' . $namaProduk . '.xlsx';
        } else {
            $fileName = 'Laporan-Penjualan.xlsx';
        }
        try {
            return (new TransaksiExport(
                $produkId ?? '',
            ))->download($fileName);
        } catch (\Exception $e) {
            Log::error('Export error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to generate export'], 500);
        }
    }
}
