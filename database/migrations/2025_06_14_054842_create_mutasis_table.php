<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mutasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')->constrained()->cascadeOnDelete();
            $table->enum('jenis', ['masuk', 'keluar']);
            $table->enum('keterangan', [
                'stok_awal',
                'pembelian_dari_supplier',
                'penjualan',
                'rusak',
                'refund',
                'retur_ke_supplier',
            ]);
            $table->text('deskripsi');
            $table->unsignedBigInteger('jumlah');
            $table->unsignedBigInteger('total_stok');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutasis');
    }
};
