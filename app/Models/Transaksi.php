<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaksi extends Model
{
    protected $fillable = [
        'nama',
        'telepon',
        'email',
        'booking_trx_id',
        'alamat',
        'proof',
        'ukuran_produk',
        'jumlah_produk',
        'total_bayar',
        'status',
        'produk_id',
    ];

    public static function generateTrxId()
    {
        $prefix = '7Sp';
        do {
            $randomString = $prefix . mt_rand(1000, 9999);
        } while (self::where('booking_trx_id', $randomString)->exists());

        return $randomString;
    }

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }

    /**
     * Event untuk mengelola stok otomatis
     */
    protected static function booted(): void
    {
        // Jika transaksi baru dibuat
        static::created(function (Transaksi $transaksi) {
            if ($transaksi->status == 1) {
                $transaksi->prosesMutasi('created');
            }
        });

        // Jika transaksi diupdate
        static::updating(function (Transaksi $transaksi) {
            $originalStatus = $transaksi->getOriginal('status');

            // Jika awalnya bukan sukses, tapi sekarang sukses
            if ($originalStatus != 1 && $transaksi->status == 1) {
                $transaksi->prosesMutasi('status updated');
            }

            // Opsional: rollback stok jika status dibatalkan (misal dari 1 ke 0)
            if ($originalStatus == 1 && $transaksi->status != 1) {
                $transaksi->rollbackMutasi('status dibatalkan');
            }
        });
    }

    /**
     * Proses mutasi keluar untuk stok produk
     */
    public function prosesMutasi(string $note = '')
    {
        Mutasi::create([
            'produk_id'  => $this->produk_id,
            'jenis'      => 'keluar',
            'deskripsi'  => "Transaksi #{$this->id} {$note}",
            'jumlah'     => $this->jumlah_produk,
        ]);
    }
    public function rollbackMutasi(string $note = '')
    {
        Mutasi::create([
            'produk_id'  => $this->produk_id,
            'jumlah'     => $this->jumlah_produk,
            'jenis'      => 'masuk',
            'deskripsi' => "Transaksi #{$this->id} {$note}",
        ]);
    }
}
