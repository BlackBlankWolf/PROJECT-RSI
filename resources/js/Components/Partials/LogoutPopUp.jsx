import React from "react";

const LogoutPopUp = ({ message, onClose, onOut }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
                <div className="flex justify-center">
                    <div className="justify-items-center">
                        <h2 className="pt-2 text-xl font-semibold text-center">
                            {message}
                        </h2>
                        <button
                            className="bg-teal-600 text-white px-4 py-2 mt-2 rounded hover:bg-teal-700"
                            onClick={onOut}
                        >
                            Ya
                        </button>
                        <button
                            className="ml-3 bg-red-500 text-white px-4 py-2 mt-5 rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopUp;
