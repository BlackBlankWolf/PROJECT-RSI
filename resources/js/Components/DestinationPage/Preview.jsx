import React from "react";
import { FcCalculator } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";

const Deskripsi = () => {
    return (
        <div
            id="fitur"
            className="min-h-screen text-center flex-col flex font-poppins w-full bg-orange-100 p-16"
        >
            <div className="p-16">
                <h1 className="font-bold text-2xl">Fitur Kami</h1>
            </div>

            <div className="flex justify-center">
                <div className="duration-300 cursor-pointer hover:bg-orange-200 p-6 m-10 bg-orange-50 rounded-lg w-[250px] flex justify-center">
                    <div>
                        <FcCalculator size={200} />
                        <p className="text-neutral-700 font-bold text-lg">
                            Kalkulator BMI
                        </p>
                        <p className="text-neutral-800 font-light text-xs pt-2 px-2">
                            BMI adalah indikator pengukuran yang digunakan untuk
                            menentukan kategori berat badan ideal atau tidak
                        </p>
                    </div>
                </div>

                <div className="duration-300 cursor-pointer hover:bg-orange-200 p-6 m-10 bg-orange-50 rounded-lg w-[250px] flex justify-center">
                    <div>
                        <FcPaid size={200} />
                        <p className="text-neutral-700 font-bold text-lg">
                            Menu Sehat
                        </p>
                        <p className="text-neutral-800 font-light text-xs pt-2 px-2">
                            Tambahkan menu makanan sehat dengan kalori yang
                            sesuai dengan kebutuhan Anda ke keranjang
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deskripsi;