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
        // Saat membuat mutasi baru
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

            $produk->save();
            $mutasi->total_stok = $produk->stok;
        });

        // Saat mengupdate mutasi
        static::updating(function (Mutasi $mutasi) {
            $produk = Produk::findOrFail($mutasi->produk_id);

            // Ambil data mutasi lama sebelum diupdate
            $oldMutasi = $mutasi->getOriginal();

            // Kembalikan stok seperti sebelum mutasi lama
            if ($oldMutasi['jenis'] === 'masuk') {
                $produk->stok -= $oldMutasi['jumlah'];
            } elseif ($oldMutasi['jenis'] === 'keluar') {
                $produk->stok += $oldMutasi['jumlah'];
            }

            // Terapkan mutasi baru
            if ($mutasi->jenis === 'masuk') {
                $produk->stok += $mutasi->jumlah;
            } elseif ($mutasi->jenis === 'keluar') {
                if ($produk->stok < $mutasi->jumlah) {
                    throw new \Exception("Stok tidak mencukupi untuk produk: {$produk->nama_produk}");
                }
                $produk->stok -= $mutasi->jumlah;
            }

            $produk->save();
            $mutasi->total_stok = $produk->stok;
        });
    }
}
