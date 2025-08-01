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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('telepon');
            $table->string('email');
            $table->string('booking_trx_id');
            $table->text('alamat');
            $table->string('proof');
            $table->unsignedBigInteger('ukuran_produk');
            $table->unsignedBigInteger('jumlah_produk');
            $table->unsignedBigInteger('total_bayar');
            $table->string('status');
            $table->foreignId('produk_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
