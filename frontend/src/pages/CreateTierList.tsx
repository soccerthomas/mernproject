import { useState } from 'react';
import TierListLogo from '../images/TierListLogo.png';

function CreateTierList()
{
    const [isModalOpen, modalOpen] = useState(false);

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
            <div className="flex justify-center text-5xl text-white mt-[40px]">Your Tier List</div>
            <div className = "mx-auto flex flex-col pt-[60px] p-[100px] gap-y-[50px]">
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
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                        <div className="bg-gray-600 w-[500px] h-[700px] relative flex flex-col justify-between pl-6 rounded-xl gap-4 pb-8 pr-8">
                            <button className="bg-white pt-2 pb-2 pl-4 pr-4 mr-4 mt-4 rounded-xl absolute top-2 right-2" onClick = {closeModal}>x</button>
                            <div className="text-3xl text-white mt-[50px] self-center">New Card</div>
                            <div className="flex gap-4">
                                <div className="text-white">option1</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option2</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option3</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option4</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option5</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option6</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option7</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white">option8</div>
                                <input type="text" className = "text-black font-bold p-1 rounded-lg w-[100%]" />
                            </div>
                            <div className="flex gap-6 justify-center">
                                <button className="bg-red-500 rounded-xl text-white pl-4 pr-4 pt-1 pb-1" onClick={closeModal}>Cancel</button>
                                <button className="bg-green-500 rounded-xl text-white pl-4 pr-4 pt-1 pb-1">Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateTierList