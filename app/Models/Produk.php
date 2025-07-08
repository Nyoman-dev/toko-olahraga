<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Produk extends Model
{
    protected $fillable = [
        'nama_produk',
        'slug',
        'thumbnail',
        'foto_produk',
        'deskripsi',
        'harga',
        'stok',
        'popular',
        'kategori_id',
    ];

    public function setNamaProdukAttribute($value)
    {
        $this->attributes['nama_produk'] = ($value);
        $this->attributes['slug'] = Str::slug($value);
    }

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }
    public function fotos(): HasMany
    {
        return $this->hasMany(FotoProduk::class, 'produk_id');
    }
    public function sizes(): HasMany
    {
        return $this->hasMany(UkuranProduk::class);
    }
    public function mutasis(): HasMany
    {
        return $this->hasMany(Mutasi::class);
    }
}
