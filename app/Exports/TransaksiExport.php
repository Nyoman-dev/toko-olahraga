<?php

namespace App\Exports;

use App\Models\Transaksi;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class TransaksiExport implements FromView
{
    use Exportable;

    private string $produkId;
    /**
     * @return \Illuminate\Support\Collection
     */
    public function __construct(string $produkId = '')
    {
        $this->produkId = $produkId;
    }

    public function view(): \Illuminate\Contracts\View\View
    {
        $query = Transaksi::query();

        if ($this->produkId) {
            $query->where('produk_id', $this->produkId);
        }

        $items = $query->get();
        $totalProduk = $items->sum('jumlah_produk');
        $totalBayar = $items->sum('total_bayar');

        return view('exports.transaksi', [
            'items' => $items,
            'totalProduk' => $totalProduk,
            'totalBayar' => $totalBayar,
        ]);
    }
}
