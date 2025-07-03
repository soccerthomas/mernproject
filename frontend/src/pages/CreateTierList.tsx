import { useState } from 'react';
import TierListLogo from '../images/TierListLogo.png';

function CreateTierList()
{
    const [isModalOpen, modalOpen] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(true);
    const [tierListTitle, setTierListTitle] = useState('');
    const [tierListDescription, setTierListDescription] = useState('');
    const [itemTitle, setItemTitle] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const openModal = () => { modalOpen(true); }
    const closeModal = () => { modalOpen(false); }

    return (
        <div className="bg-gray-800">
            <header className="p-4">
                <nav className="mx-auto flex items-center justify-between p-2 lg:px-8 rounded-lg bg-gray-600">
                    <div className="flex lg:flex-1">
                        <a href="./" className="-m-1.5 p-1.5">
                        <span className="sr-only">Tier Builder</span>
                        <img className="h-8 w-auto" src={TierListLogo} alt="" />
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="./createTierList" className="text-sm/6 font-semibold text-white hover:text-blue-200">Create Tier List</a>
                        <a href="#" className="text-sm/6 font-semibold text-white hover:text-blue-200">Your Tier Lists</a>
                        <a href="#" className="text-sm/6 font-semibold text-white hover:text-blue-200">Explore</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                        <a href="./register" className="text-sm/6 font-semibold text-white hover:text-blue-200">Create Account<span aria-hidden="true"></span></a>
                        <a href="./login" className="text-sm/6 font-semibold text-white hover:text-blue-200">Log in <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </nav>
            </header>
            <div className="flex justify-center text-5xl text-white mt-[40px]">{tierListTitle}</div>
            <div className="flex justify-center text-xl text-white mt-[20px]">{tierListDescription}</div>
            <div className = "mx-auto flex flex-col pt-[50px] p-[100px] gap-y-[50px]">
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-red-500">S</div>
                    <div className="border-4 py-[40px] w-[100%] rounded-2xl border-red-500"></div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-orange-500">A</div>
                    <div className="border-4 py-[40px] w-[100%] rounded-2xl border-orange-500"></div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-yellow-500">B</div>
                    <div className="border-4 py-[40px] w-[100%] rounded-2xl border-yellow-500"></div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-green-500">C</div>
                    <div className="border-4 py-[40px] w-[100%] rounded-2xl border-green-500"></div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-blue-500">D</div>
                    <div className="border-4 py-[40px] w-[100%] rounded-2xl border-blue-500"></div>
                </div>
                <div className="flex flex-col justify-center gap-y-[20px]">
                    <div className="text-2xl text-white ml-4">Items:</div>
                    <div className="border-4 pb-[80px] w-[100%] rounded-2xl border-white flex justify-end">
                        <button className="bg-white rounded-xl pt-3 pb-3 pl-4 pr-4 mr-4 mt-4" onClick = {openModal}>+</button>
                    </div>
                </div>
                {showInfoModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl text-white mb-4 text-center">Create Item</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                <label className="text-white text-sm mb-1 block">Title</label>
                                <input
                                    type="text"
                                    value={tierListTitle}
                                    onChange={(e) => setTierListTitle(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter title"
                                    required
                                />
                                </div>
                                <div>
                                <label className="text-white text-sm mb-1 block">Description</label>
                                <textarea
                                    value={tierListDescription}
                                    onChange={(e) => setTierListDescription(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter description"
                                    required
                                />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl text-white mb-4 text-center">Create Tier List</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                <label className="text-white text-sm mb-1 block">Name</label>
                                <input
                                    type="text"
                                    value={itemTitle}
                                    onChange={(e) => setItemTitle(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter title"
                                    required
                                />
                                </div>
                                <div>
                                <label className="text-white text-sm mb-1 block">Item</label>
                                <input
                                    type="text"
                                    value={itemImage}
                                    onChange={(e) => setItemImage(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter title"
                                    required
                                />
                                </div>
                                <div>
                                <label className="text-white text-sm mb-1 block">Description</label>
                                <textarea
                                    value={itemDescription}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter description"
                                    required
                                />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateTierList