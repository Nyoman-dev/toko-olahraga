<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\View\HomeController;
use App\Http\Controllers\View\OrderController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/kategori/{slug_kategori}', [HomeController::class, 'showKategori']);
Route::get('/produk/{slug_produk}', [HomeController::class, 'showProduk']);

Route::get('/order/{slug_produk}', [OrderController::class, 'index']);
Route::post('/pembayaran', [OrderController::class, 'checkout']);
Route::get('/status-order', [OrderController::class, 'viewStatusOrder'])->name('view.order');
Route::post('/status-order', [OrderController::class, 'statusOrder']);
Route::get('/status-pembayaran', [OrderController::class, 'statusPembayaran'])->name('status.pembayaran');

Route::get('/transaksi/export', [ExportController::class, 'export'])->name('transaksis.export');

Route::get('/export', function () {
  return view('exports.transaksi');
});

// Route::get('/pembayaran', [OrderController::class, 'pembayaran']);
// Route::get('/status-pembayaran', [OrderController::class, 'statusPembayaran'])->name('status.pembayaran');


// Route::get('/status-pembayaran', function () {
//     return Inertia::render('View/pembayaran/index');
// })->name('status.pembayaran');
// Route::get('/status-order', function () {
//     return Inertia::render('View/status-order/index');
// });
// Route::get('/detail-order', function () {
//     return Inertia::render('View/detail-order/index');
// });

// Route::get('customer/login', function () {
//     return Inertia::render('Auth/login');
// })->name('customer.login')->middleware('guest.customer');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// });

// Route::middleware('auth:customer')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
