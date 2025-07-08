import { useState } from 'react';
import TierListLogo from '../images/TierListLogo.png';
import DeleteSymbol from '../images/DeleteSymbol.png';
import EditSymbol from '../images/EditSymbol.png';

interface ItemStructure
{
    id:number;
    title:string;
    image:string;
    description:string;
}
interface TagStructure
{
    name:string;
    status:string;
}

function CreateTierList()
{
    const [isNewCardModalOpen, newCardModalOpen] = useState(false);
    const [isEditCardModalOpen, setEditCardModalOpen] = useState(false);
    const [isDeleteCardModalOpen, setDeleteCardModalOpen] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(true);
    const [tierListTitle, setTierListTitle] = useState('');
    const [tierListDescription, setTierListDescription] = useState('');
    const [itemTitle, setItemTitle] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const openNewCardModal = () => { newCardModalOpen(true); }
    const closeNewCardModal = () => { newCardModalOpen(false); }

    const closeEditCardModal = () => { setEditCardModalOpen(false); }

    const closeDeleteCardModal = () => { setDeleteCardModalOpen(false); }

    const [items, setItems] = useState<ItemStructure[]>([]);
    const [sTierCards, setSTierCards] = useState<ItemStructure[]>([]);
    const [aTierCards, setATierCards] = useState<ItemStructure[]>([]);
    const [bTierCards, setBTierCards] = useState<ItemStructure[]>([]);
    const [cTierCards, setCTierCards] = useState<ItemStructure[]>([]);
    const [dTierCards, setDTierCards] = useState<ItemStructure[]>([]);

    const [currentEdit, setCurrentEdit] = useState<ItemStructure>();
    const [deleteItem, setDeleteItem] = useState<ItemStructure>();

    const [tags, setTags] = useState<TagStructure[]>([]);
    const [tagName, setTagName] = useState('');
    //const [tagStatus, setTagStatus] = useState('');

    const [isNewTagModalOpen, newTagModalOpen] = useState(false);
    const openNewTagModal = () => { newTagModalOpen(true); }
    const closeNewTagModal = () => { newTagModalOpen(false); }
    
    function handleArrowClick(tag: TagStructure, direction: String)
    {
        if((tag.status == "bg-red-500" && direction == "up") || (tag.status == "bg-green-500" && direction == "down"))
        {
            setTags(tags.map(curr =>
                {
                if(curr.name == tag.name)
                    {
                        return {
                            ...curr,
                            status: "bg-yellow-500"
                        };
                    }
                    else
                    {
                        return curr;
                    }
                }   
            ));
        }
        if(tag.status == "bg-yellow-500" && direction == "up")
        {
            setTags(tags.map(curr =>
                {
                if(curr.name == tag.name)
                    {
                        return {
                            ...curr,
                            status: "bg-green-500"
                        };
                    }
                    else
                    {
                        return curr;
                    }
                }   
            ));
        }
        if(tag.status == "bg-yellow-500" && direction == "down")
        {
            setTags(tags.map(curr =>
                {
                if(curr.name == tag.name)
                    {
                        return {
                            ...curr,
                            status: "bg-red-500"
                        };
                    }
                    else
                    {
                        return curr;
                    }
                }   
            ));
        }
    }

    function handleEditOpen(item: ItemStructure)
    {
        setEditCardModalOpen(true);

        setItemTitle(item.title);
        setItemImage(item.image);
        setItemDescription(item.description);
    }
    function handleEditSave()
    {
        if(currentEdit)
        {
            setItems(items.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            setSTierCards(sTierCards.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            setATierCards(aTierCards.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            setBTierCards(bTierCards.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            setCTierCards(cTierCards.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            setDTierCards(dTierCards.map(item =>
                {
                if(item.id == currentEdit.id)
                    {
                        return {
                            ...item,
                            title: itemTitle,
                            image: itemImage,
                            description: itemDescription
                        };
                    }
                    else
                    {
                        return item;
                    }
                }   
            ));
            
            setItemTitle('');
            setItemImage('');
            setItemDescription('');

            setCurrentEdit(undefined);
        }
        
        setEditCardModalOpen(false);
    }

    function handleDelete()
    {
        if(deleteItem)
        {
            setItems(items.filter(item => item.id != deleteItem.id));
            setSTierCards(sTierCards.filter(item => item.id != deleteItem.id));
            setATierCards(aTierCards.filter(item => item.id != deleteItem.id));
            setBTierCards(bTierCards.filter(item => item.id != deleteItem.id));
            setCTierCards(cTierCards.filter(item => item.id != deleteItem.id));
            setDTierCards(dTierCards.filter(item => item.id != deleteItem.id));
        }
        
        setDeleteCardModalOpen(false);
    }

    function handleOnDrag(e: React.DragEvent, item: object)
    {
        e.dataTransfer.setData("item", JSON.stringify(item));
    }
    function handleDragOver(e: React.DragEvent)
    {
        e.preventDefault();
    }
    function handleOnDropItems(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));

        if(items.find(item => item.id == card.id))
        {
            return;
        }

        setItems([...items, card]);

        setSTierCards(sTierCards.filter(item => item.id != card.id));
        setATierCards(aTierCards.filter(item => item.id != card.id));
        setBTierCards(bTierCards.filter(item => item.id != card.id));
        setCTierCards(cTierCards.filter(item => item.id != card.id));
        setDTierCards(dTierCards.filter(item => item.id != card.id));
    }
    function handleOnDropS(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));

        if(sTierCards.find(item => item.id == card.id))
        {
            return;
        }

        setSTierCards([...sTierCards, card]);

        setItems(items.filter(item => item.id != card.id));
        setATierCards(aTierCards.filter(item => item.id != card.id));
        setBTierCards(bTierCards.filter(item => item.id != card.id));
        setCTierCards(cTierCards.filter(item => item.id != card.id));
        setDTierCards(dTierCards.filter(item => item.id != card.id));
    }
    function handleOnDropA(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));

        if(aTierCards.find(item => item.id == card.id))
        {
            return;
        }

        setATierCards([...aTierCards, card]);

        setItems(items.filter(item => item.id != card.id));
        setSTierCards(sTierCards.filter(item => item.id != card.id));
        setBTierCards(bTierCards.filter(item => item.id != card.id));
        setCTierCards(cTierCards.filter(item => item.id != card.id));
        setDTierCards(dTierCards.filter(item => item.id != card.id));
    }
    function handleOnDropB(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        
        if(bTierCards.find(item => item.id == card.id))
        {
            return;
        }

        setBTierCards([...bTierCards, card]);

        setItems(items.filter(item => item.id != card.id));
        setSTierCards(sTierCards.filter(item => item.id != card.id));
        setATierCards(aTierCards.filter(item => item.id != card.id));
        setCTierCards(cTierCards.filter(item => item.id != card.id));
        setDTierCards(dTierCards.filter(item => item.id != card.id));
    }
    function handleOnDropC(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        
        if(cTierCards.find(item => item.id == card.id))
        {
            return;
        }

        setCTierCards([...cTierCards, card]);

        setItems(items.filter(item => item.id != card.id));
        setSTierCards(sTierCards.filter(item => item.id != card.id));
        setATierCards(aTierCards.filter(item => item.id != card.id));
        setBTierCards(bTierCards.filter(item => item.id != card.id));
        setDTierCards(dTierCards.filter(item => item.id != card.id));
    }
    function handleOnDropD(e: React.DragEvent)
    {
        const card = JSON.parse(e.dataTransfer.getData("item"));
        
        if(dTierCards.find(item => item.id == card.id))
        {
            return;
        }

        setDTierCards([...dTierCards, card]);

        setItems(items.filter(item => item.id != card.id));
        setSTierCards(sTierCards.filter(item => item.id != card.id));
        setATierCards(aTierCards.filter(item => item.id != card.id));
        setBTierCards(bTierCards.filter(item => item.id != card.id));
        setCTierCards(cTierCards.filter(item => item.id != card.id));

    }
    function handleTags()
    {
        const newTag = {
            name: tagName,
            status: "bg-yellow-500",
        }

        setTags([...tags, newTag]);

        setTagName('');

        closeNewTagModal();
    }

    const handleItems = () => {
        const newItem = {
            id: Math.random(),
            title: itemTitle,
            image: itemImage,
            description: itemDescription,
        };

        setItems([...items, newItem]);

        setItemTitle('');
        setItemImage('');
        setItemDescription('');

        closeNewCardModal();
    }

    const cleanup = () => {
        setItemTitle('');
        setItemImage('');
        setItemDescription('');

        closeNewCardModal();
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
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, sTierCard)}   
                                >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(sTierCard);
                                        handleEditOpen(sTierCard);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(sTierCard);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, aTierCard)}   
                                >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(aTierCard);
                                        handleEditOpen(aTierCard);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(aTierCard);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, bTierCard)}   
                                >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(bTierCard);
                                        handleEditOpen(bTierCard);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(bTierCard);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, cTierCard)}   
                                >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(cTierCard);
                                        handleEditOpen(cTierCard);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(cTierCard);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, dTierCard)}   
                                >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(dTierCard);
                                        handleEditOpen(dTierCard);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(dTierCard);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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
                    <div className="w-[100%] min-h-[90px] rounded-2xl bg-gray-400 flex flex-wrap gap-4 p-4 relative"
                    onDragOver={handleDragOver}
                        onDrop={handleOnDropItems}>
                        {items.length == 0 && (
                            <div className="text-white">No items created yet</div>
                        )}

                        {items.map((item, idx) => (
                            <div key={idx}
                                draggable 
                                onDragStart={(e) => handleOnDrag(e, item)}    
                            >
                                <div
                                className="bg-gray-700 text-white rounded-lg p-4 min-h-[100px] min-w-[150px] relative"
                                >
                                <button className="bg-yellow-500 top-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setCurrentEdit(item);
                                        handleEditOpen(item);
                                    }
                                }><img src={EditSymbol} alt="Button icon" className="w-5 h-5" /></button>
                                <button className="bg-red-500 bottom-[10px] right-[10px] p-1 rounded-lg absolute"
                                onClick={() => 
                                    {
                                        setDeleteItem(item);
                                        setDeleteCardModalOpen(true);
                                    }
                                }><img src={DeleteSymbol} alt="Button icon" className="w-5 h-5" /></button>
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

                        <button className="bg-gray-700 text-white rounded-xl ml-[20px] pl-3 pr-3 pt-2 pb-2 absolute top-[10px] right-[10px]" onClick={openNewCardModal}>
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
                {isNewCardModalOpen && (
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
                                <label className="text-white text-sm mb-1 block">Image</label>
                                <input
                                    type="text"
                                    value={itemImage}
                                    onChange={(e) => setItemImage(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter image URL"
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
                                <div className="flex flex-wrap gap-2 ">
                                    {tags.map((tag, idx) => (
                                        <div key={idx} className="flex items-center text-white gap-4 border-2 border-white p-4 pt-1 pb-1 rounded-md">
                                            <div className="text-sm">{tag.name}</div>
                                            <div className="flex flex-col">
                                                <button onClick={() => handleArrowClick(tag, 'up')}>+</button>
                                                <button disabled className={`${tag.status} rounded-md p-3`} />
                                                <button onClick={() => handleArrowClick(tag, 'down')} className="-mt-[2px]">-</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between gap-2 mt-4">
                                    <button className="bg-blue-500 text-white rounded px-4 py-2"
                                        onClick={openNewTagModal}
                                        >Tag +</button>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={cleanup}
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
                    </div>
                )}
                {isEditCardModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl text-white mb-4 text-center">Edit Item</h2>
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
                                <label className="text-white text-sm mb-1 block">Image</label>
                                <input
                                    type="text"
                                    value={itemImage}
                                    onChange={(e) => setItemImage(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter image URL"
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
                                <div className="flex flex-wrap gap-2 ">
                                    {tags.map((tag, idx) => (
                                        <div key={idx} className="flex items-center text-white gap-4 border-2 border-white p-4 pt-1 pb-1 rounded-md">
                                            <div className="text-sm">{tag.name}</div>
                                            <div className="flex flex-col">
                                                <button onClick={() => handleArrowClick(tag, 'up')}>+</button>
                                                <button disabled className={`${tag.status} rounded-md p-3`} />
                                                <button onClick={() => handleArrowClick(tag, 'down')} className="-mt-[2px]">-</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between gap-2 mt-4">
                                    <button className="bg-blue-500 text-white rounded px-4 py-2"
                                        onClick={openNewTagModal}
                                        >Tag +</button>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={closeEditCardModal}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleEditSave}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isDeleteCardModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl text-white mb-4 text-center">Are you sure you want to delete this item?</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center gap-2 mt-4">
                                <button
                                    onClick={ ()  => 
                                        {
                                            setDeleteItem(undefined);
                                            closeDeleteCardModal();
                                        }
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Confirm
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isNewTagModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-700 w-[400px] p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl text-white mb-4 text-center">Create new tag</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter title"
                                    required
                                />
                                <div className="flex justify-center gap-2 mt-4">
                                <button
                                    onClick={closeDeleteCardModal}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleTags}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Confirm
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