<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MutasiResource\Pages;
use App\Filament\Resources\MutasiResource\RelationManagers;
use App\Models\Mutasi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MutasiResource extends Resource
{
    protected static ?string $model = Mutasi::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('produk_id')
                    ->relationship('produk', 'nama_produk', fn(Builder $query) => $query->orderBy('id', 'desc'))
                    ->searchable()
                    ->preload()
                    ->required(),
                Forms\Components\Select::make('jenis')
                    ->options([
                        'masuk' => 'masuk',
                        'keluar' => 'keluar',
                    ]),
                Forms\Components\Select::make('keterangan')
                    ->options([
                        'stok_awal' => 'stok_awal',
                        'pembelian_dari_supplier' => 'pembelian_dari_supplier',
                        'penjualan' => 'penjualan',
                        'rusak' => 'rusak',
                        'refund' => 'refund',
                        'retur_ke_supplier' => 'retur_ke_supplier',
                    ])
                    ->required(),
                Forms\Components\Textarea::make('deskripsi')
                    ->required(),
                Forms\Components\TextInput::make('jumlah')
                    ->required()
                    ->numeric()
                    ->prefix('Qty'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('id', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('produk.nama_produk'),
                Tables\Columns\TextColumn::make('jenis'),
                Tables\Columns\TextColumn::make('keterangan'),
                Tables\Columns\TextColumn::make('deskripsi'),
                Tables\Columns\TextColumn::make('jumlah'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMutasis::route('/'),
            'create' => Pages\CreateMutasi::route('/create'),
            'edit' => Pages\EditMutasi::route('/{record}/edit'),
        ];
    }
    public static function getNavigationLabel(): string
    {
        return 'Mutasi Barang';
    }
    public static function getPluralLabel(): string
    {
        return 'Mutasi Barang';
    }
}
