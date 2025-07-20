import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import TierListLogo from "../Images/TierListLogo.png";
import EditSymbol from "../Images/EditSymbol.png";

interface ItemStructure {
  id: Number;
  name: string;
  image: string;
  description: string;
  tags: Array<TagStructure>;
}
interface TagStructure {
  name: string;
  color: string;
}
interface CategoriesStructure {
  id: string;
  name: string;
  color: string;
  items: Array<ItemStructure>;
}
interface TierList {
  _id: string;
  title: string;
  description: string;
  categories: Array<CategoriesStructure>;
  unassignedItems: Array<ItemStructure>;
  globalTags: Array<TagStructure>;
}

function CreateTierList() {
  const [isNewCardModalOpen, newCardModalOpen] = useState(false);
  const [isViewCardOpen, viewCardOpen] = useState(false);
  const [isEditCardModalOpen, setEditCardModalOpen] = useState(false);
  const [isDeleteCardModalOpen, setDeleteCardModalOpen] = useState(false);
  const [isDeleteTierModalOpen, setDeleteTierModalOpen] = useState(false);
  const [isColorModalOpen, colorModalOpen] = useState(false);
  const [isEditTierModalOpen, editTierModalOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  const [tierListTitle, setTierListTitle] = useState("");
  const [tierListDescription, setTierListDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemTags, setItemTags] = useState<TagStructure[]>([]);

  const [tierName, setTierName] = useState("");
  const [tierColor, setTierColor] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);

  const openNewCardModal = () => {
    newCardModalOpen(true);
  };
  const closeNewCardModal = () => {
    newCardModalOpen(false);
  };

  const closeEditCardModal = () => {
    setEditCardModalOpen(false);
  };

  const closeDeleteCardModal = () => {
    setDeleteCardModalOpen(false);
  };

  const [items, setItems] = useState<ItemStructure[]>([]);

  const [categories, setCategories] = useState<CategoriesStructure[]>([
    {
      name: 'S',
      id: uuidv4(),
      items: [],
      color: "#EF4444"
    },
    {
      name: 'A',
      id: uuidv4(),
      items: [],
      color: "#F97316"
    },
    {
      name: 'B',
      id: uuidv4(),
      items: [],
      color: "#EAB308"
    },
    {
      name: 'C',
      id: uuidv4(),
      items: [],
      color: "#22C55E"
    },
    {
      name: 'D',
      id: uuidv4(),
      items: [],
      color: "#3B82F6",
    }
  ]);

  const [currentView, setCurrentView] = useState<ItemStructure>();
  const [currentEdit, setCurrentEdit] = useState<ItemStructure>();
  const [tierEdit, setTierEdit] = useState<CategoriesStructure>();
  const [deleteTier, setDeleteTier] = useState<CategoriesStructure>();
  const [deleteItem, setDeleteItem] = useState<ItemStructure>();

  const [tagName, setTagName] = useState("");

  const [isNewTagModalOpen, newTagModalOpen] = useState(false);
  const openNewTagModal = () => {
    newTagModalOpen(true);
  };
  const closeNewTagModal = () => {
    newTagModalOpen(false);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>();
  

  const colorOptions = [
    '#EF4444',
    '#F97316',
    '#22C55E',
    '#3B82F6',
    '#A855F7',
    '#EC4899',
    '#EAB308',
    '#F59E0B',
    '#84CC16',
    '#10B981',
    '#14B8A6',
    '#0EA5E9',
    '#06B6D4',
    '#000000',
    '#8B5CF6',
    '#D946EF',
    '#F43F5E',
    '#6366F1',
    '#71717A',
    '#78716C',
  ];

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      setIsEditing(true);
      setEditingId(editId);
      fetchEdit(editId);
    }
  }, [searchParams]);

  async function fetchEdit(tierListId: string) {
    try {
      const jwt = localStorage.getItem("token");
      const response = await fetch(`api/tierlist/${tierListId}`, {
        headers: {
          "x-auth-token": `${jwt}`,
        },
      });
      const tierlist = await response.json();
      if (response.ok) {
        setTierListTitle(tierlist.title || "");
        setTierListDescription(tierlist.description || "");
        setCategories(tierlist.categories);

        setItems(tierlist.items || []);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTierList() {
    const data = {
      title: tierListTitle,
      description: tierListDescription,
      categories: categories,
      unassignedItems: items,
    };
    if (isEditing && editingId) {
      const response = await updateTierList(editingId, data);
      if (response) {
        navigate("/dashboard");
      }
    } else {
      const jwt = localStorage.getItem("token");
      try {
        const response = await fetch("api/tierlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function updateTierList(
    tierListId: string,
    updated: Partial<TierList>
  ) {
    const jwt = localStorage.getItem("token");
    try {
      const response = await fetch(`api/tierlist/${tierListId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
        body: JSON.stringify(updated),
      });
      if (response.ok) {
        const updatedTierList = await response.json();
        return updatedTierList;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleTagClick(tag: TagStructure) {
    const updatedTags = itemTags.map((curr) => {
      if (curr.name === tag.name) {
        let newColor = "border-gray-500";
        if (tag.color === "border-gray-500") {
          newColor = "border-green-500 text-lg";
        } else if (tag.color === "border-green-500 text-lg") {
          newColor = "border-red-500 text-lg";
        }
        return { ...curr, color: newColor };
      }
      return curr;
    });
    setItemTags(updatedTags);
  }
  const getStatusText = (color: string) => {
    switch (color) {
      case "border-green-500 text-lg":
        return "+";
      case "border-red-500 text-lg":
        return "–";
      case "border-gray-500":
        return "○";
    }
  };

  function handleEditOpen(item: ItemStructure | undefined) {
    if (item) {
      setEditCardModalOpen(true);

      setItemName(item.name);
      setItemImage(item.image);
      setItemDescription(item.description);
      setItemTags([...item.tags]);
    }
  }
  function handleEditTierOpen(tier: CategoriesStructure | undefined) {
    if (tier) {
      editTierModalOpen(true);

      setTierName(tier.name);
      setTierColor(tier.color);
    }
  }
  function handleEditSave() {
    if (currentEdit) {
      setItems(
        items.map((item) => {
          if (item.id == currentEdit.id) {
            return {
              ...item,
              name: itemName,
              image: itemImage,
              description: itemDescription,
              tags: itemTags,
            };
          } else {
            return item;
          }
        })
      );
      setCategories(
        categories.map((category) => ({
          ...category,
          items: category.items.map((item) => {
              if (item.id == currentEdit.id) {
                return {
                  ...item,
                  name: itemName,
                  image: itemImage,
                  description: itemDescription,
                  tags: itemTags,
                };
              } else {
                return item;
              }
          })
        }))
      );
    
      setItemName("");
      setItemImage("");
      setItemDescription("");
      setItemTags([]);

      setCurrentEdit(undefined);
    }

    setEditCardModalOpen(false);
  }

  function handleEditTierSave() {
    setCategories(
      categories.map((category) => {
        if(tierEdit && category.id == tierEdit.id)
        {
          return {...category, name: tierName, color: tierColor}
        }
        return category;
      })
    );

    setTierName("");
    setTierColor("");

    setTierEdit(undefined);
    editTierModalOpen(false);
    
  }

  function handleDelete() {
    if (deleteItem) {
      setItems(items.filter((item) => item.id != deleteItem.id));

      setCategories(
        categories.map((category) => ({
            ...category,
            items: category.items.filter((item) => item.id != deleteItem.id)
        }))
      );
    }

    setDeleteCardModalOpen(false);
  }
  function handleDeleteTier() {
    if (deleteTier) {
      setCategories(prev =>
        prev.filter(category => category.id != deleteTier.id)
      );
    }

    setDeleteTierModalOpen(false);
  }

  function handleOnDrag(e: React.DragEvent, item: object) {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleOnDropItems(e: React.DragEvent) {
    const card = JSON.parse(e.dataTransfer.getData("item"));

    if (items.find((item) => item.id == card.id)) {
      return;
    }

    setItems([...items, card]);

    setCategories(
      categories.map((category) => ({
          ...category,
          items: category.items.filter((item) => item.id != card.id)
      }))
    );
  }
  function handleOnDropCategory(e: React.DragEvent, target: CategoriesStructure) {
    const card = JSON.parse(e.dataTransfer.getData("item"));

    const source = categories.find(category => 
        category.items.some(item => item.id == card.id)
    );

    if(source && source.id == target.id)
    {
      return;
    }

    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.id == target.id) {
          if (!category.items.find(item => item.id == card.id)) 
          {
            return { ...category, items: [...category.items, card] };
          }
          return category;
        } else {
          return { ...category, items: category.items.filter(item => item.id != card.id) };
        }
      })
    );

    setItems(items.filter((item) => item.id != card.id));
  }
  
  function handleTags() {
    const newTag = {
      name: tagName,
      color: "border-gray-500",
    };

    setItemTags([...itemTags, newTag]);

    setTagName("");

    closeNewTagModal();
  }

  const handleItems = () => {
    const newItem = {
      id: Math.random(),
      name: itemName,
      image: itemImage,
      description: itemDescription,
      tags: itemTags,
    };

    setItems([...items, newItem]);

    setItemName("");
    setItemImage("");
    setItemDescription("");
    setItemTags([]);

    closeNewCardModal();
  };

  const cleanup = () => {
    setItemName("");
    setItemImage("");
    setItemDescription("");
    setItemTags([]);

    closeNewCardModal();
  };

  const cleanupTitle = () => {
    setTierListTitle("");
    setTierListDescription("");
  };

  function addTier()
  {
    const newTier = {
      name: "New Tier",
      id: uuidv4(),
      color: "#6B7280",
      items: []
    }
    
    setCategories(prev => [...prev, newTier]);
  }

  function handleChangeView(direction: string, current: ItemStructure | undefined)
  {
    let currentCategory : CategoriesStructure | undefined;
    categories.map(category => {
      category.items.map(item => {
        if(current && item.id == current.id)
        {
          currentCategory = category;
        }
      })
    })
    items.map((item, idx) => {
      if(current && item.id == current.id)
      {
        if(currentView && item.id == currentView.id)
        {
          if(direction == "left")
          {
            if(idx == 0)
            {
              setCurrentView(items[items.length - 1]);
            } else {
              setCurrentView(items[idx - 1]);
            }
          } else {
            if(idx == items.length - 1)
            {
              setCurrentView(items[0]);
            } else {
              setCurrentView(items[idx + 1]);
            }
          }
        }
      }
    })
    if(!currentCategory) { return; }
    let size = currentCategory.items.length;
    if(size == 0) { return; }
    currentCategory.items.map((item, idx) => {
      if(currentView && item.id == currentView.id)
      {
        if(direction == "left")
        {
          if(idx == 0)
          {
            setCurrentView(currentCategory?.items[size - 1]);
          } else {
            setCurrentView(currentCategory?.items[idx - 1]);
          }
        } else {
          if(idx == size - 1)
          {
            setCurrentView(currentCategory?.items[0]);
          } else {
            setCurrentView(currentCategory?.items[idx + 1]);
          }
        }
      }
    })
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
          <div className="flex items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Dashboard
            </button>
            {displayOptions == false && 
              <button className="bg-gray-600 ml-3 text-white rounded-md pb-2 px-1 w-[50px] justify-center hover:bg-yellow-500" 
                      onClick={() => setDisplayOptions(true)}>
                . . .
              </button>
            }
          </div>
        </nav>
      </header>
      {displayOptions && 
        <div className="fixed inset-0 bg-black bg-opacity-40">
          <div className="absolute mr-5 mt-[100px] flex flex-col justify-self-end items-end w-[250px] bg-gray-700 shadow-2xl rounded-xl py-5">
            <button className="bg-red-500 p-1 px-3 flex justify-self-end rounded-xl text-white -mt-[8px] mr-[10px] hover:bg-red-800" 
                    onClick={() => {
                      setDisplayOptions(false);
                      setEditMode(false);
                    }}>
              x
            </button>
            <button
              className= "bg-gray-700 shadow-xl p-2 px-4 w-[180px] justify-center flex justify-self-end rounded-xl text-white mr-[30px] mt-[10px] hover:bg-blue-500"
              onClick={() => {
                setShowInfoModal(true);
                setDisplayOptions(false);
              }}
            >
              Edit Title/Description
            </button>
            <button
              className={`${editMode ? "bg-red-500" : "bg-gray-700"} shadow-xl p-2 px-4 flex w-[180px] justify-center justify-self-end rounded-xl text-white mr-[30px] mt-[10px] hover:bg-blue-500`}
              onClick={() => {
                setEditMode(!editMode);
                setDisplayOptions(false);
              }}
            >
              {editMode ? "Stop Edit" : "Edit Mode"}
            </button>
          </div>
        </div>}
      <div className="flex justify-center text-5xl text-white mt-[30px]">
        {tierListTitle}
      </div>
      <div className="flex justify-center text-xl text-white mt-[20px]">
        {tierListDescription}
      </div>

      <div className="mx-auto h-auto flex flex-col pt-[20px] p-[80px] gap-y-[20px]">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-800 rounded-xl p-4 pl-12 shadow-lg">
            <div className="flex items-stretch min-h-[120px] gap-12">
              <div className="w-24 flex items-center justify-center gap-3">
                {editMode && <img
                  src={EditSymbol}
                  onClick={() => {
                    setTierEdit(category);
                    handleEditTierOpen(category);
                  }}
                  className="h-8 w-auto cursor-pointer"
                />}
                <div
                  style = {{backgroundColor: category.color}}
                  className="text-white text-center font-bold text-3xl px-[60px] w-auto h-[120px] rounded-xl flex items-center justify-center w-full"
                >
                  {category.name}
                </div>
              </div>
              <div
                style = {{backgroundColor: category.color}}
                className="flex-1 rounded-xl p-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleOnDropCategory(e, category)}
              >
                <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                  {category.items.length > 0 ? (
                    category.items.map((item, idx) => (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleOnDrag(e, item)}
                      >
                        <div
                          onClick={() => {
                            viewCardOpen(true);
                            setCurrentView(item);
                          }}
                          className="bg-gray-700 hover:bg-gray-600 cursor-pointer text-white rounded-lg h-[100px] w-[100px] flex items-center justify-center shadow-md relative"
                        >
                          {item.image ? (
                            <img className = "w-full h-full object-cover rounded-lg" src = {item.image} alt = {item.name}/>
                          ) : (
                            <div className="text-md truncate">{item.name}</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white text-center w-full">
                      No items in this tier
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className="flex flex-1 text-white bg-gray-600 rounded-xl justify-center ml-5 mr-5 py-2"
                onClick={addTier}>+</button>
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="text-2xl text-white mb-4">Items:</div>
          <div
            className="w-full min-h-[90px] rounded-xl bg-gray-400 flex flex-wrap gap-4 p-4 relative"
            onDragOver={handleDragOver}
            onDrop={handleOnDropItems}
          >
            {items.length == 0 ? (
              <div className="text-gray-400 text-center w-full py-8">
                No items created yet
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleOnDrag(e, item)}
                >
                  <div
                    onClick={() => {
                      viewCardOpen(true);
                      setCurrentView(item);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 cursor-pointer text-white rounded-lg p-3 h-[100px] w-[100px] flex items-center justify-center shadow-md relative"
                  >
                    <div className="text-md truncate">{item.name}</div>
                  </div>
                </div>
              ))
            )}
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2 absolute top-[10px] right-[10px] font-medium transition-colors duration-200 shadow-xl hover:shadow-2xl"
              onClick={openNewCardModal}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 p-4 rounded-lg text-white w-[200px] self-center font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={saveTierList}
        >
          Save Tier List
        </button>
      </div>
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
            <div className="bg-blue-500 p-6 text-center">
              <h2 className="text-white text-3xl font-bold mb-2">
                Create Tier List
              </h2>
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
                  <label className="text-white text-sm mb-1 block">
                    Description
                  </label>
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
                    onClick={() => {
                      cleanupTitle();
                      setShowInfoModal(false);
                    }}
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
              <h2 className="text-white text-3xl font-bold mb-2">
                Create Item
              </h2>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <label className="text-white text-sm mb-1 block">Name</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
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
                  <label className="text-white text-sm mb-1 block">
                    Description
                  </label>
                  <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {itemTags.map((tag, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleTagClick(tag)}
                      className={`${tag.color} cursor-pointer flex items-center text-white gap-2 shadow-lg border-4 bg-gray-800 p-4 pt-1 pb-1 rounded-3xl`}
                    >
                      <div className="text-lg">{tag.name}</div>
                      <div>{getStatusText(tag.color)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2"
                    onClick={openNewTagModal}
                  >
                    Tag +
                  </button>
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
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
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
                  <label className="text-white text-sm mb-1 block">
                    Description
                  </label>
                  <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {itemTags.map((tag, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleTagClick(tag)}
                      className={`${tag.color} cursor-pointer flex items-center text-white gap-2 shadow-lg border-4 bg-gray-800 p-4 pt-1 pb-1 rounded-3xl`}
                    >
                      <div className="text-lg">{tag.name}</div>
                      <div>{getStatusText(tag.color)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2"
                    onClick={openNewTagModal}
                  >
                    Tag +
                  </button>
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
              <h2 className="text-white text-3xl font-bold mb-2">
                Delete Item
              </h2>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="text-white text-center">
                  Are you sure you want to delete this item?
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => {
                      setDeleteItem(undefined);
                      closeDeleteCardModal();
                    }}
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
      {isDeleteTierModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-700 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
            <div className="bg-blue-500 p-6 text-center">
              <h2 className="text-white text-3xl font-bold mb-2">
                Delete Tier
              </h2>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="text-white text-center">
                  Are you sure you want to delete this item?
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => {
                      setDeleteTier(undefined);
                      setDeleteTierModalOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTier}
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
              <h2 className="text-white text-3xl font-bold mb-2">
                Create new tag
              </h2>
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
      {isEditTierModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">
              Edit Tier
            </h2>
            <div className="flex items-center gap-4 mb-8 mt-8">
              <div className="text-white text-lg min-w-[90px]">Tier name:</div>
              <input
                    type="text"
                    value={tierName}
                    onChange={(e) => setTierName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                    required
                  />
            </div>
            <div className="grid grid-cols-10 gap-3 gap-x-5 mx-auto w-fit">
              {colorOptions.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTierColor(color);
                  }}
                  style = {{backgroundColor: color}}
                  className={`${tierColor == color ? "border-white border-[5px]" : "border-gray-600"} w-10 h-10 rounded-full border-2 border-gray-600 hover:scale-110 transition-transform`}
                />
              ))}
            </div>
            <div className="flex gap-8 mt-8">
              <button
                onClick={() => {
                  editTierModalOpen(false);
                  setDeleteTier(tierEdit);
                  setDeleteTierModalOpen(true);
                }}
                className="mt-5 w-full py-2 bg-red-600 text-white rounded-md hover:bg-gray-700"
              >
                Delete Tier
              </button>
              <button
                onClick={() => editTierModalOpen(false)}
                className="mt-5 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTierSave}
                className="mt-5 w-full py-2 bg-green-600 text-white rounded-md hover:bg-gray-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isColorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-center text-white">
              Pick a Color
            </h2>
            <div className="grid grid-cols-4 gap-3 gap-x-10 mx-auto w-fit">
              {colorOptions.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    colorModalOpen(false);
                  }}
                  className={`${color} w-10 h-10 rounded-full border-2 border-gray-600 hover:scale-110 transition-transform`}
                />
              ))}
            </div>
            <button
              onClick={() => colorModalOpen(false)}
              className="mt-5 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isViewCardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <button className="text-white mr-4 p-3 text-5xl"
                  onClick={() => handleChangeView("left", currentView)}>{"<"}</button>
          <div className="bg-gray-800 max-h-[95vh] w-full max-w-4xl rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Item Details</h2>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                          src={currentView?.image}
                          alt={currentView?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {currentView?.name}
                        </h3>
                        {currentView?.description && (
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {currentView?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {currentView?.tags && currentView.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentView.tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className={`${tag.color} flex items-center text-white gap-2 shadow-lg border-4 bg-gray-800 p-2 rounded-3xl`}
                          >
                            <div className="text-sm">{tag.name}</div>
                            <div className="text-sm">
                              {getStatusText(tag.color)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    viewCardOpen(false);
                    handleEditOpen(currentView);
                    setCurrentEdit(currentView);
                    handleEditSave;
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    viewCardOpen(false);
                    setDeleteCardModalOpen(true);
                    setDeleteItem(currentView);
                    handleDelete;
                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => viewCardOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
          <button className="text-white ml-4 p-3 text-5xl"
                  onClick={() => handleChangeView("right", currentView)}>{">"}</button>
        </div>
      )}
    </div>
  );
}

export default CreateTierList;
