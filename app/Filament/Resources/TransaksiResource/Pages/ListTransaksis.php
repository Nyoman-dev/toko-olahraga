<?php

namespace App\Filament\Resources\TransaksiResource\Pages;

use App\Filament\Resources\TransaksiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTransaksis extends ListRecords
{
    protected static string $resource = TransaksiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('export')
                ->url(fn() => url('/transaksi/export?' . http_build_query([
                    'tableFilters' => $this->tableFilters,
                ]))),
            // Actions\CreateAction::make(),
        ];
    }
}
