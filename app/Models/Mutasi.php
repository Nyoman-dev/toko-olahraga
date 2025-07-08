<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mutasi extends Model
{
    protected $fillable = [
        'produk_id',
        'jenis',
        'keterangan',
        'deskripsi',
        'jumlah',
        'total_stok',
    ];

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class);
    }
    protected static function booted(): void
    {
        static::creating(function (Mutasi $mutasi) {
            $produk = Produk::findOrFail($mutasi->produk_id);

            if ($mutasi->jenis === 'masuk') {
                $produk->stok += $mutasi->jumlah;
            } elseif ($mutasi->jenis === 'keluar') {
                if ($produk->stok < $mutasi->jumlah) {
                    throw new \Exception("Stok tidak mencukupi untuk produk: {$produk->nama_produk}");
                }
                $produk->stok -= $mutasi->jumlah;
            }

            // Simpan stok ke produk
            $produk->save();

            // Set jumlah_total (stok setelah mutasi)
            $mutasi->total_stok = $produk->stok;
        });
    }
}
