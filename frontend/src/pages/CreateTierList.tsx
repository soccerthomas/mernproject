import { useState } from 'react';
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();
    
    async function saveTierList() 
    {
        const categories = [{name: "S", items: sTierCards}, 
                            {name: "A", items: aTierCards}, 
                            {name: "B", items: bTierCards}, 
                            {name: "C", items: cTierCards}, 
                            {name: "D", items: dTierCards}]
        const send = {
            title: tierListTitle,
            description: tierListDescription,
            categories: categories,
            unassignedItems: items,
            globalTags: tags
        };
        const jwt = localStorage.getItem("userJWT");
        try {
            const response = await fetch('api/tierlist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${jwt}`
                },
                body: JSON.stringify(send),
            });
            if(response.ok)
            {
                // const savedTierList = await response.json();
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    } 

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

    const cleanupTitle = () => {
        setTierListTitle('');
        setTierListDescription('');
    }

    return(
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
            <div className="relative">

            </div>
            <button className = "bg-gray-400 p-2 px-4 flex justify-self-end rounded-xl text-white mr-[30px] mt-[10px] hover:bg-yellow-500"
            onClick={() => setShowInfoModal(true)}>Edit Title/Description</button>
            <div className="flex justify-center text-5xl text-white mt-[20px]">{tierListTitle}</div>
            <div className="flex justify-center text-xl text-white mt-[20px]">{tierListDescription}</div>
            
            <div className="mx-auto h-auto flex flex-col pt-[20px] p-[100px] gap-y-[50px]">
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-stretch min-h-[120px] gap-6">
                        <div className="w-24 flex items-center justify-center">
                            <div className="text-white font-bold text-3xl p-[48px] w-[150px] rounded-xl text-center w-full bg-red-500">
                                S
                            </div>
                        </div>
                        <div className="flex-1 bg-red-500 rounded-xl p-4"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDropS}>
                            <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                                {sTierCards.length > 0 ? (
                                    sTierCards.map((sTierCard, idx) => (
                                        <div key={idx}
                                            draggable 
                                            onDragStart={(e) => handleOnDrag(e, sTierCard)}>
                                            <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                                <div className="flex-1 flex items-center">
                                                    <div className="text-md text-left truncate pr-2">
                                                        {sTierCard.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 justify-center items-end">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setCurrentEdit(sTierCard);
                                                            handleEditOpen(sTierCard);
                                                        }}>
                                                        <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setDeleteItem(sTierCard);
                                                            setDeleteCardModalOpen(true);
                                                        }}>
                                                        <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white text-center w-full py-10">
                                        No items in this tier
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-stretch min-h-[120px] gap-6">
                        <div className="w-24 flex items-center justify-center">
                            <div className="text-white font-bold text-3xl p-[48px] w-[150px] rounded-xl text-center w-full bg-orange-500">
                                A
                            </div>
                        </div>
                        <div className="flex-1 bg-orange-500 rounded-xl p-4"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDropA}>
                            <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                                {aTierCards.length > 0 ? (
                                    aTierCards.map((aTierCard, idx) => (
                                        <div key={idx}
                                            draggable 
                                            onDragStart={(e) => handleOnDrag(e, aTierCard)}>
                                            <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                                <div className="flex-1 flex items-center">
                                                    <div className="text-md text-left truncate pr-2">
                                                        {aTierCard.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 justify-center items-end">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setCurrentEdit(aTierCard);
                                                            handleEditOpen(aTierCard);
                                                        }}>
                                                        <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setDeleteItem(aTierCard);
                                                            setDeleteCardModalOpen(true);
                                                        }}>
                                                        <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white text-center w-full py-10">
                                        No items in this tier
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-stretch min-h-[120px] gap-6">
                        <div className="w-24 flex items-center justify-center">
                            <div className="text-white font-bold text-3xl p-[48px] w-[150px] rounded-xl text-center w-full bg-yellow-500">
                                B
                            </div>
                        </div>
                        <div className="flex-1 bg-yellow-500 rounded-xl p-4"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDropB}>
                            <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                                {bTierCards.length > 0 ? (
                                    bTierCards.map((bTierCard, idx) => (
                                        <div key={idx}
                                            draggable 
                                            onDragStart={(e) => handleOnDrag(e, bTierCard)}>
                                            <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                                <div className="flex-1 flex items-center">
                                                    <div className="text-md text-left truncate pr-2">
                                                        {bTierCard.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 justify-center items-end">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setCurrentEdit(bTierCard);
                                                            handleEditOpen(bTierCard);
                                                        }}>
                                                        <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setDeleteItem(bTierCard);
                                                            setDeleteCardModalOpen(true);
                                                        }}>
                                                        <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white text-center w-full py-10">
                                        No items in this tier
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-stretch min-h-[120px] gap-6">
                        <div className="w-24 flex items-center justify-center">
                            <div className="text-white font-bold text-3xl p-[48px] w-[150px] rounded-xl text-center w-full bg-green-500">
                                C
                            </div>
                        </div>
                        <div className="flex-1 bg-green-500 rounded-xl p-4"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDropC}>
                            <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                                {cTierCards.length > 0 ? (
                                    cTierCards.map((cTierCard, idx) => (
                                        <div key={idx}
                                            draggable 
                                            onDragStart={(e) => handleOnDrag(e, cTierCard)}>
                                            <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                                <div className="flex-1 flex items-center">
                                                    <div className="text-md text-left truncate pr-2">
                                                        {cTierCard.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 justify-center items-end">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setCurrentEdit(cTierCard);
                                                            handleEditOpen(cTierCard);
                                                        }}>
                                                        <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setDeleteItem(cTierCard);
                                                            setDeleteCardModalOpen(true);
                                                        }}>
                                                        <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white text-center w-full py-10">
                                        No items in this tier
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-stretch min-h-[120px] gap-6">
                        <div className="w-24 flex items-center justify-center">
                            <div className="text-white font-bold text-3xl p-[48px] w-[150px] rounded-xl text-center w-full bg-blue-500">
                                D
                            </div>
                        </div>
                        <div className="flex-1 bg-blue-500 rounded-xl p-4"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDropD}>
                            <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                                {dTierCards.length > 0 ? (
                                    dTierCards.map((dTierCard, idx) => (
                                        <div key={idx}
                                            draggable 
                                            onDragStart={(e) => handleOnDrag(e, dTierCard)}>
                                            <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                                <div className="flex-1 flex items-center">
                                                    <div className="text-md text-left truncate pr-2">
                                                        {dTierCard.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 justify-center items-end">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setCurrentEdit(dTierCard);
                                                            handleEditOpen(dTierCard);
                                                        }}>
                                                        <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                        onClick={() => {
                                                            setDeleteItem(dTierCard);
                                                            setDeleteCardModalOpen(true);
                                                        }}>
                                                        <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white text-center w-full py-10">
                                        No items in this tier
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="text-2xl text-white mb-4">Items:</div>
                    <div className="w-full min-h-[90px] rounded-xl bg-gray-400 flex flex-wrap gap-4 p-4 relative"
                        onDragOver={handleDragOver}
                        onDrop={handleOnDropItems}>
                        {items.length === 0 ? (
                            <div className="text-gray-400 text-center w-full py-8">
                                No items created yet
                            </div>
                        ) : (
                            items.map((item, idx) => (
                                <div key={idx}
                                    draggable 
                                    onDragStart={(e) => handleOnDrag(e, item)}>
                                    <div className="bg-gray-700 text-white rounded-lg p-3 h-[100px] w-[150px] flex shadow-md relative">
                                        <div className="flex-1 flex items-center">
                                            <div className="text-md text-left truncate pr-2">
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 justify-center items-end">
                                            <button className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded-lg"
                                                onClick={() => {
                                                    setCurrentEdit(item);
                                                    handleEditOpen(item);
                                                }}>
                                                <img src={EditSymbol} alt="Edit" className="w-4 h-4" />
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg"
                                                onClick={() => {
                                                    setDeleteItem(item);
                                                    setDeleteCardModalOpen(true);
                                                }}>
                                                <img src={DeleteSymbol} alt="Delete" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2 absolute top-[10px] right-[10px] font-medium transition-colors duration-200 shadow-md hover:shadow-lg" 
                            onClick={openNewCardModal}>
                            +
                        </button>
                    </div>
                </div>

                <button className="bg-green-500 hover:bg-green-600 p-4 rounded-lg text-white w-[200px] self-center font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    onClick={saveTierList}>
                    Save Tier List
                </button>
            </div>
                {showInfoModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
                            <div className="bg-blue-500 p-6 text-center">
                                <h2 className="text-white text-3xl font-bold mb-2">Create Tier List</h2>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-6">
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
                                            onClick={() => 
                                                {
                                                    cleanupTitle();
                                                    setShowInfoModal(false);
                                                }     
                                            }
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
                    </div>
                )}
                {isNewCardModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
                            <div className="bg-blue-500 p-6 text-center">
                                <h2 className="text-white text-3xl font-bold mb-2">Create Item</h2>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-6">
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
                                    <div className="flex flex-wrap gap-2">
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
                    </div>
                )}
                {isEditCardModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
                            <div className="bg-blue-500 p-6 text-center">
                                <h2 className="text-white text-3xl font-bold mb-2">Edit Item</h2>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-6">
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
                                    <div className="flex flex-wrap gap-2">
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
                    </div>
                )}
                {isDeleteCardModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
                            <div className="bg-blue-500 p-6 text-center">
                                <h2 className="text-white text-3xl font-bold mb-2">Delete Item</h2>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-6">
                                    <div className="text-white text-center">Are you sure you want to delete this item?</div>
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
                    </div>
                )}
                {isNewTagModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
                            <div className="bg-blue-500 p-6 text-center">
                                <h2 className="text-white text-3xl font-bold mb-2">Create new tag</h2>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-6">
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
                    </div>
                )}
            </div>
    );
}

export default CreateTierList