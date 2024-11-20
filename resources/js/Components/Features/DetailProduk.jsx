// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import {
//     FaArrowLeft,
//     FaSearch,
//     FaCartPlus,
//     FaMinus,
//     FaPlus,
//     FaStar,
// } from "react-icons/fa";

// export default function DetailProduk() {
//     const [quantity, setQuantity] = useState(1);

//     const incrementQuantity = () => setQuantity(quantity + 1);
//     const decrementQuantity = () => {
//         if (quantity > 1) setQuantity(quantity - 1);
//     };

//     return (
//         <div className="font-poppins container mx-auto my-8 p-4">
//             {/* Bilah Pencarian */}
//             {/* <div className="flex items-center justify-between mb-4">
//         <div className="flex w-3/4">
//           <input
//             type="text"
//             placeholder="Cari Menu"
//             className="form-control w-full px-4 py-2 rounded-l-full border border-gray-300"
//           />
//           <button className="px-4 py-2 bg-gray-200 rounded-r-full">
//             <FaSearch className="text-gray-600" />
//           </button>
//         </div>
//         <button className="bg-gray-200 p-2 rounded-full">
//           <FaCartPlus className="text-gray-600" />
//         </button>
//       </div> */}

//             {/* Tombol Kembali */}
//             <div className="px-20 flex items-center space-x-3">
//                 <Link href="/katalog">
//                     <button className="p-2 bg-gray-100 rounded-full">
//                         <FaArrowLeft className="w-5 h-5 text-gray-600" />
//                     </button>
//                 </Link>
//                 <h4 className="text-xl font-bold">Detail Produk</h4>
//             </div>

//             {/* Detail Produk */}
//             <div className="px-20 flex flex-col md:flex-row pt-10">
//                 <div className="md:w-1/3">
//                     <img
//                         src="https://via.placeholder.com/200"
//                         alt="Gambar Produk"
//                         className="w-full h-auto object-cover rounded-lg"
//                     />
//                 </div>
//                 <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
//                     <h2 className="text-2xl font-bold">Nama Produk</h2>

//                     <div className="flex justify-between items-center my-2">
//                         <p className="text-xl font-semibold text-green-600">
//                             Rp50.000
//                         </p>
//                         <div className="flex items-center text-yellow-500">
//                             <FaStar className="mr-2" />
//                             <span>4.5 | 135 Ulasan</span>
//                         </div>
//                     </div>

//                     <p>500 gr | 250 kalori</p>

//                     {/* Form Tambah ke Keranjang */}
//                     <div className="flex justify-between items-center mt-6">
//                         <div className="flex items-center">
//                             <button
//                                 type="button"
//                                 onClick={decrementQuantity}
//                                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
//                             >
//                                 <FaMinus />
//                             </button>
//                             <span className="mx-4 text-lg">{quantity}</span>
//                             <button
//                                 type="button"
//                                 onClick={incrementQuantity}
//                                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
//                             >
//                                 <FaPlus />
//                             </button>
//                         </div>
//                         <button className="duration-300 hover:bg-gray-300 bg-gray-200 text-black px-4 py-2 rounded-full">
//                             <Link to="/keranjang" className="text-sm">
//                                 Tambahkan ke keranjang
//                             </Link>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // export default ProductDetail;

import React, { useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import {
    FaArrowLeft,
    FaSearch,
    FaCartPlus,
    FaMinus,
    FaPlus,
    FaStar,
} from "react-icons/fa";

export default function DetailProduk() {
    const { product } = usePage().props; // Mengambil data dari server

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        console.log(product.id);
        console.log(product.harga);
        console.log(product.berat);
        console.log(product.kalori);
        console.log(quantity);

        // axios
        //     .post(route("cart.store"), {
        //         product_id: product.id,
        //         kuantitas: quantity,
        //     })
        //     .then((response) => {
        //         alert("Produk berhasil ditambahkan ke keranjang!");
        //     })
        //     .catch((error) => {
        //         console.error("Gagal menambahkan produk:", error);
        //     });
        fetch(route("cart.store"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({
                product_id: product.id,
                kuantitas: quantity,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Produk berhasil ditambahkan ke keranjang! lalalala");
                } else {
                    alert("Gagal menambahkan produk ke keranjang.");
                }
            })
            .catch((error) => {
                console.error("Terjadi kesalahan:", error);
            });

        // router.post(
        //     route("cart.store", {
        //         product_id: product.id,
        //         kuantitas: quantity,
        //     })
        // );
    };

    return (
        <div className="font-poppins container mx-auto my-8 p-4">
            {/* Tombol Kembali */}
            <div className="px-20 flex items-center space-x-3">
                <Link href="/katalog">
                    <button className="p-2 bg-gray-100 rounded-full">
                        <FaArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                </Link>
                <h4 className="text-xl font-bold">Detail Produk</h4>
            </div>

            {/* Detail Produk */}
            <div className="px-20 flex flex-col md:flex-row pt-10">
                <div className="md:w-1/3">
                    <img
                        src={product.image || "https://via.placeholder.com/200"}
                        alt="Gambar Produk"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold">
                        {product.nama_produk}
                    </h2>

                    <div className="flex justify-between items-center my-2">
                        <p className="text-xl font-semibold text-green-600">
                            Rp {product.harga.toLocaleString("id-ID")}
                        </p>
                        <div className="flex items-center text-yellow-500">
                            <FaStar className="mr-2" />
                            <span>4.5 | 135 Ulasan</span>
                        </div>
                    </div>

                    <p>
                        {product.berat} gr | {product.kalori} kalori
                    </p>

                    {/* Form Tambah ke Keranjang */}
                    <form onSubmit={handleAddToCart}>
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={decrementQuantity}
                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                                >
                                    <FaMinus />
                                </button>
                                <span
                                    className="mx-4 text-lg"
                                    onChange={(e) =>
                                        setQuantity("kuantitas", e.target.value)
                                    }
                                >
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={incrementQuantity}
                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <button
                                type="submit"
                                onClick={handleAddToCart}
                                className="duration-300 hover:bg-gray-300 bg-gray-200 text-black px-4 py-2 rounded-full"
                                method="POST"
                                // disabled={processing}
                            >
                                Tambahkan ke keranjang
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
