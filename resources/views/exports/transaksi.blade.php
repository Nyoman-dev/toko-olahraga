<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Laporan Penjualan</title>
</head>
<body>
    <table>
      <tr>
          <td colspan="2"><strong>Nama Perusahaan : Toko Sport 77</strong></td>
        </tr>
        <tr>
            <td colspan="2"><strong>Nama Laporan : Laporan Penjualan</strong></td>
        </tr>
        <thead>
            <tr>
                <th style="border: 1px solid #000000;"><strong>No. Transaksi</strong></th>
                <th style="border: 1px solid #000000; text-align: center;"><strong>Tanggal</strong></th>
                <th style="border: 1px solid #000000; text-align: center;"><strong>Pelanggan</strong></th>
                <th style="border: 1px solid #000000; text-align: center;"><strong>Produk Terjual</strong></th>
                <th style="border: 1px solid #000000; text-align: center;"><strong>Total Bayar</strong></th>
            </tr>
        </thead>
        <tbody>
          @foreach ($items as $item)
          <tr>
              <td style="border: 1px solid #000000;">{{ $item->booking_trx_id }}</td>
              <td style="border: 1px solid #000000; text-align: center;">{{ $item->created_at->format('Y-m-d') }}</td>
              <td style="border: 1px solid #000000;">{{ $item->nama }}</td>
              <td style="border: 1px solid #000000; text-align: center;">{{ $item->jumlah_produk }}</td>
              <td style="border: 1px solid #000000; text-align: right;">{{ number_format($item->total_bayar, 2, ',', '.') }}</td>
          </tr>
          @endforeach
            <tr>
                <td style="border: 1px solid #000000; text-align: center;" colspan="3"><strong>Total</strong></td>
                <td style="border: 1px solid #000000; text-align: center;">{{ $totalProduk }}</td>
                <td style="border: 1px solid #000000; text-align: right;">{{ number_format($totalBayar, 2, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

</body>
</html>
