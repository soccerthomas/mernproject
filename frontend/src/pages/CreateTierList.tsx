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

    let idCounter = 0;
    const [items, setItems] = useState<{id: number, title: string, image: string; description:string}[]>([]);
    const [sTierCards, setSTierCards] = useState<{id: number, title: string, image: string; description:string}[]>([]);
    const [aTierCards, setATierCards] = useState<{id: number, title: string, image: string; description:string}[]>([]);
    const [bTierCards, setBTierCards] = useState<{id: number, title: string, image: string; description:string}[]>([]);
    const [cTierCards, setCTierCards] = useState<{id: number, title: string, image: string; description:string}[]>([]);
    const [dTierCards, setDTierCards] = useState<{id: number, title: string, image: string; description:string}[]>([]);

    function handleOnDrag(e: React.DragEvent, item: object)
    {
        e.dataTransfer.setData("item", JSON.stringify(item));
    }
    function handleDragOver(e: React.DragEvent)
    {
        e.preventDefault();
    }
    function handleOnDropS(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        setSTierCards([...sTierCards, card]);
        setItems(items.filter(item => item.id != card.id));
    }
    function handleOnDropA(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        setATierCards([...aTierCards, card]);
        setItems(items.filter(item => item.id != card.id));
    }
    function handleOnDropB(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        setBTierCards([...bTierCards, card]);
        setItems(items.filter(item => item.id != card.id));
    }
    function handleOnDropC(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        setCTierCards([...cTierCards, card]);
        setItems(items.filter(item => item.id != card.id));
    }
    function handleOnDropD(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        setDTierCards([...dTierCards, card]);
        setItems(items.filter(item => item.id != card.id));
    }

    const handleItems = () => {
        const newItem = {
            id: idCounter++,
            title: itemTitle,
            image: itemImage,
            description: itemDescription,
        };

        setItems([...items, newItem]);

        // Clear inputs
        setItemTitle('');
        setItemImage('');
        setItemDescription('');

    closeModal();
    }
    return (
        <div className="bg-gray-800 h-auto">
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
            <div className = "mx-auto h-auto flex flex-col pt-[50px] p-[100px] gap-y-[50px]">
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-red-500">S</div>
                    <div className="flex flex-wrap min-h-[90px] gap-5 p-[20px] w-[100%] rounded-2xl bg-red-500"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropS}>
                            {sTierCards.map((sTierCard, idx) => (
                            <div key={idx}
                                // draggable 
                                // onDragStart={(e) => handleOnDrag(e, item)}
                                // onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 w-[50px] text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{sTierCard.title}</div>
                                {sTierCard.image && (
                                    <img
                                    src={sTierCard.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {sTierCard.description && (
                                    <div className="mt-1 text-sm opacity-70">{sTierCard.description}</div>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-orange-500">A</div>
                    <div className="flex flex-wrap min-h-[90px] gap-5 p-[20px] w-[100%] rounded-2xl bg-orange-500"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropA}>
                            {aTierCards.map((aTierCard, idx) => (
                            <div key={idx}
                                // draggable 
                                // onDragStart={(e) => handleOnDrag(e, item)}
                                // onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 w-[50px] text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{aTierCard.title}</div>
                                {aTierCard.image && (
                                    <img
                                    src={aTierCard.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {aTierCard.description && (
                                    <div className="mt-1 text-sm opacity-70">{aTierCard.description}</div>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-yellow-500">B</div>
                    <div className="flex flex-wrap gap-5 min-h-[90px] p-[20px] w-[100%] rounded-2xl bg-yellow-500"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropB}>
                            {bTierCards.map((bTierCard, idx) => (
                            <div key={idx}
                                // draggable 
                                // onDragStart={(e) => handleOnDrag(e, item)}
                                // onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 w-[50px] text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{bTierCard.title}</div>
                                {bTierCard.image && (
                                    <img
                                    src={bTierCard.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {bTierCard.description && (
                                    <div className="mt-1 text-sm opacity-70">{bTierCard.description}</div>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-green-500">C</div>
                    <div className="flex flex-wrap min-h-[90px] gap-5 p-[20px] w-[100%] rounded-2xl bg-green-500"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropC}>
                            {cTierCards.map((cTierCard, idx) => (
                            <div key={idx}
                                // draggable 
                                // onDragStart={(e) => handleOnDrag(e, item)}
                                // onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 w-[50px] text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{cTierCard.title}</div>
                                {cTierCard.image && (
                                    <img
                                    src={cTierCard.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {cTierCard.description && (
                                    <div className="mt-1 text-sm opacity-70">{cTierCard.description}</div>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-x-[30px]">    
                    <div className="text-white p-8 rounded-2xl bg-blue-500">D</div>
                    <div className="flex flex-wrap min-h-[90px] gap-5 p-[20px] w-[100%] rounded-2xl bg-blue-500"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropD}>
                            {dTierCards.map((dTierCard, idx) => (
                            <div key={idx}
                                // draggable 
                                // onDragStart={(e) => handleOnDrag(e, item)}
                                // onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 w-[50px] text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{dTierCard.title}</div>
                                {dTierCard.image && (
                                    <img
                                    src={dTierCard.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {dTierCard.description && (
                                    <div className="mt-1 text-sm opacity-70">{dTierCard.description}</div>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-y-[20px]">
                    <div className="text-2xl text-white ml-4">Items:</div>
                    <div className="w-[100%] h-auto rounded-2xl bg-gray-400 flex flex-wrap gap-4 p-4 relative">
                        {items.length == 0 && (
                            <div className="text-white">No items created yet</div>
                        )}

                        {items.map((item, idx) => (
                            <div key={idx}
                                draggable 
                                onDragStart={(e) => handleOnDrag(e, item)}
                                onDragEnd={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                
                                className="bg-gray-700 text-white rounded-lg p-4 min-w-[150px]"
                                >
                                <div className="font-semibold">{item.title}</div>
                                {item.image && (
                                    <img
                                    src={item.image}
                                    className="mt-2 max-h-20 w-auto object-contain"
                                    />
                                )}
                                {item.description && (
                                    <div className="mt-1 text-sm opacity-70">{item.description}</div>
                                )}
                                </div>
                            </div>
                        ))}

                        <button className="bg-gray-700 text-white rounded-xl ml-[20px] pl-3 pr-3 pt-2 pb-2 absolute top-[10px] right-[10px]" onClick={openModal}>
                            +
                        </button>
                    </div>
                </div>
                {showInfoModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl text-white mb-4 text-center">Create Tier List</h2>
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
                            <h2 className="text-2xl text-white mb-4 text-center">Create Item</h2>
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
                                    onClick={handleItems}
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