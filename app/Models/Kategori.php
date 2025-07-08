<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{
    protected $fillable = [
        'nama_kategori',
        'slug',
        'foto_kategori',
    ];

    public function produk(): HasMany
    {
        return $this->hasMany(Produk::class);
    }
    public function setNamaKategoriAttribute($value)
    {
        $this->attributes['nama_kategori'] = ($value);
        $this->attributes['slug'] = Str::slug($value);
    }
    public function photos()
    {
        return $this->hasMany(FotoProduk::class,);
    }
    public function size(): HasMany
    {
        return $this->hasMany(UkuranProduk::class);
    }
}
