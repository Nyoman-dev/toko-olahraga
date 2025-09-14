<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Produk;
use Filament\Forms\Form;
use App\Models\Transaksi;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\FormsComponent;
use Filament\Forms\Components\Grid;
use Filament\Notifications\Notification;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\ToggleButtons;
use App\Filament\Resources\TransaksiResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\TransaksiResource\RelationManagers;

class TransaksiResource extends Resource
{
    protected static ?string $model = Transaksi::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Wizard::make([
                    Forms\Components\Wizard\Step::make('Produk & Harga')
                        ->schema([
                            Grid::make(2)->schema([
                                Forms\Components\Select::make('produk_id')
                                    ->relationship('produk', 'nama_produk')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(function ($state, callable $get, callable $set) {
                                        $produk = Produk::find($state);
                                        $harga = $produk ? $produk->harga : 0;
                                        $quantity = $get('jumlah_produk') ?? 1;
                                        $subTotalAmount = $harga * $quantity;

                                        $set('harga', $harga);
                                        $set('total_bayar', $subTotalAmount);

                                        $sizes = $produk ? $produk->sizes->pluck('ukuran', 'id')->toArray() : [];
                                        $set('ukuran_produk_options', $sizes);
                                    })
                                    ->afterStateHydrated(function (callable $get, callable $set, $state) {
                                        $produkId = $state;
                                        if ($produkId) {
                                            $produk = Produk::find($produkId);
                                            $sizes = $produk ? $produk->sizes->pluck('ukuran', 'id')->toArray() : [];
                                            $set('ukuran_produk_options', $sizes);
                                        }
                                    }),
                                Forms\Components\Select::make('ukuran_produk')
                                    ->label('Ukuran')
                                    ->options(function (callable $get) {
                                        $sizes = $get('ukuran_produk_options');
                                        return is_array($sizes) ? $sizes : [];
                                    })
                                    ->required()
                                    ->live(),
                                Forms\Components\TextInput::make('jumlah_produk')
                                    ->required()
                                    ->numeric()
                                    ->prefix('Qty')
                                    ->live()
                                    ->afterStateUpdated(function ($state, callable $get, callable $set) {
                                        $price = $get('harga');
                                        $quantity = $state;
                                        $subTotalAmount = $price * $quantity;
                                        $set('total_bayar', $subTotalAmount);
                                    }),
                                Forms\Components\TextInput::make('total_bayar')
                                    ->required()
                                    ->numeric()
                                    ->prefix('IDR')
                                    ->readOnly(),
                            ])
                        ]),
                    Forms\Components\Wizard\Step::make('Informasi Customer')
                        ->schema([
                            Grid::make(2)->schema([
                                Forms\Components\TextInput::make('nama')
                                    ->required()
                                    ->maxLength(255),
                                // Forms\Components\TextInput::make('email')
                                //     ->email()
                                //     ->required()
                                //     ->maxLength(255),
                                Forms\Components\TextInput::make('telepon')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextArea::make('alamat')
                                    ->required()
                                    ->rows(5),
                            ])
                        ]),
                    Forms\Components\Wizard\Step::make('Informasi Pembayaran')
                        ->schema([
                            Forms\Components\TextInput::make('booking_trx_id')
                                ->maxLength(255)
                                ->default(fn() => Transaksi::generateTrxId())
                                ->readOnly(),
                            ToggleButtons::make('status')
                                ->label('Status Pembayaran')
                                ->boolean()
                                ->grouped()
                                ->icons([
                                    true => 'heroicon-o-check-circle',
                                    false => 'heroicon-o-clock',
                                ])
                                ->required(),
                            Forms\Components\FileUpload::make('proof')
                                ->image()
                                ->disk('public')
                                ->previewable(true)
                                ->label('Bukti Pembayaran')
                                ->required(),
                        ])
                ])
                    ->columnSpan('full')
                    ->columns(1)
                    ->skippable()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('id', 'desc')
            ->columns([
                Tables\Columns\ImageColumn::make('email')->label('Gambar'),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('booking_trx_id')
                    ->searchable(),
                Tables\Columns\IconColumn::make('status')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->label('Status'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('produk_id')
                    ->label('Produk')
                    ->relationship('produk', 'nama_produk'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),

                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->action(function (Transaksi $record) {
                        $record->status = true;
                        $record->save();

                        Notification::make()
                            ->title('Order Approved')
                            ->success()
                            ->body('Order Berhasil di Approve')
                            ->send();
                    })
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn(Transaksi $record) => !$record->status),
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
            'index' => Pages\ListTransaksis::route('/'),
            'create' => Pages\CreateTransaksi::route('/create'),
            'edit' => Pages\EditTransaksi::route('/{record}/edit'),
        ];
    }
    public static function getNavigationLabel(): string
    {
        return 'Transaksi';
    }
    public static function getPluralLabel(): string
    {
        return 'Transaksi';
    }
}
