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
}
