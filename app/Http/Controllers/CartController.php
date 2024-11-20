<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        // $cart = DB::table('cart')
        // ->join('products', 'cart.product_id', '=', 'products.id') // Melakukan join dengan tabel products
        // ->select('cart.*', 'products.nama_produk', 'products.harga', 'products.berat', 'products.kalori') // Memilih kolom yang diinginkan
        // ->get();

    // return view('cart', compact('cart'));// Mengirim data ke view
    // $cart = Cart::with('product')->where('user_id',$userId)->get();
    // // $products = Product::all();
    
    // return Inertia::render('Keranjang', [
    //     'cart' => $cart,
    // ]);
    // $cart = Cart::with('product') // Eager load relasi dengan produk
    // ->where('user_id', auth()->$userId) // Hanya untuk pengguna saat ini
    // ->get()
    // ->map(function ($item) {
    //     return [
    //         'id' => $item->id,
    //         'product_id' => $item->product_id,
    //         'nama_produk' => $item->product->nama_produk,
    //         'harga' => $item->product->harga,
    //         'berat' => $item->product->berat,
    //         'kalori' => $item->product->kalori,
    //         'kuantitas' => $item->kuantitas,
    //     ];
    // });

    // $cart = [
    //     [
    //         'id' => 1,
    //         'product' => [
    //             'nama_produk' => 'Sop Ayam',
    //             'harga' => 20000,
    //         ],
    //         'quantity' => 1,
    //     ],
    //     [
    //         'id' => 2,
    //         'product' => [
    //             'nama_produk' => 'Nasi Goreng',
    //             'harga' => 25000,
    //         ],
    //         'quantity' => 2,
    //     ],
    // ];

    $carts = Cart::with('product:id,nama_produk,harga')
            ->where('user_id', Auth::id()) // Pastikan hanya untuk pengguna yang login
            ->get()
            ->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'product' => [
                    'nama_produk' => $cart->product->nama_produk,
                    'harga' => $cart->product->harga,
                ],
                    'quantity' => $cart->kuantitas,
                    // 'total_price' => $cart->product->harga * $cart->kuantitas,
                ];
            });

        // return response()->json($carts);

        // return inertia('Cart', [
        //     'cart' => $carts,
        // ]);

return Inertia::render('Keranjang', [
    'cart' => $carts,
]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'kuantitas' => 'required|integer|min:1',
        ]);
        // dd($request->all());
        $userId = Auth::id();
        // $cart = Cart::updateOrCreate(
        //     [
        //         'user_id' => auth()->$userId,
        //         'product_id' => $request->product_id,
        //     ],
        //     [
        //         'kuantitas' => $request->kuantitas,
        //     ]
        // );

        // return redirect()->route('cart.index')->with('success', 'Produk berhasil ditambahkan ke keranjang.');
        try {
            Cart::updateOrCreate(
                [
                    'user_id' =>$request->$userId,
                    'product_id' => $request->product_id,
                ],
                [
                    'kuantitas' => $request->kuantitas,
                ]
            );
            return redirect()->route('keranjang')->with('success', 'Produk berhasil ditambahkan ke keranjang.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cartItem = Cart::findOrFail($id);

    $cartItem->update([
        'kuantitas' => $request->quantity,
    ]);

    return redirect()->back()->with('message', 'Quantity updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Mencari item cart berdasarkan ID
    // $cartItem = Cart::find($id);

    // // Memeriksa apakah item ada
    // if ($cartItem) {
    //     $cartItem->delete(); // Menghapus item dari tabel cart

    //     return redirect()->route('cart.index')->with('success', 'Item berhasil dihapus dari keranjang.');
    // }

    // return redirect()->route('cart.index')->with('error', 'Item tidak ditemukan.');
    $cartItem = Cart::findOrFail($id);
    $cartItem->delete();

    return redirect()->back()->with('message', 'Item removed from cart!');
    }
}
