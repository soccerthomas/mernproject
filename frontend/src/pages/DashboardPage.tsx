import React, { useState, useEffect } from "react";
import TierListLogo from "../images/TierListLogo.png";
import { useNavigate } from "react-router-dom";

interface ItemStructure
{
    id:number;
    name:string;
    image:string;
    description:string;
}
interface TagStructure
{
    name:string;
    status:string;
}
interface CategoriesStructure
{
    name:string;
    color:string;
    items:Array<ItemStructure>;
}

interface TierList {
  _id: string
  title: string,
  description: string,
  categories: Array<CategoriesStructure>,
  unassignedItems: Array<ItemStructure>,
  globalTags: Array<TagStructure>
}

const Dashboard: React.FC = () => {
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [currentList, setCurrentList] = useState<TierList>();
  const [tierLists, setTierLists] = useState<TierList[]>([]);

  const [isDeleteCardModalOpen, setDeleteCardModalOpen] = useState(false);
  const closeDeleteCardModal = () => { setDeleteCardModalOpen(false); }
  const [deleteItem, setDeleteItem] = useState<TierList>();

  const [searchTitle, setsearchTitle] = useState<string>();

  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  async function loadTierLists() 
  {
      const jwt = localStorage.getItem("token");
      try {
        const response = await fetch('api/tierlist/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`
          }
        });
        if(response.ok)
        {
            const savedTierLists = await response.json();
            setTierLists(savedTierLists);
        }
    } catch (error) {
        console.error(error);
    }
  } 
  async function deleteTierList(tierlist: TierList) 
  {
      const jwt = localStorage.getItem("token");
      try {
        const response = await fetch(`api/tierlist/${tierlist._id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`
          }
        });
        if(response.ok)
        {
            console.log("Tier List Deleted");
            setTierLists(tierLists.filter(tierlist => tierlist._id != deleteItem?._id));
        }
    } catch (error) {
        console.error(error);
    }
  } 
  async function searchTierLists(title: string) 
  {
      const jwt = localStorage.getItem("token");
      try {
        const response = await fetch(`api/tierlist/search?title=${encodeURIComponent(title)}`, {
          headers: {
            "x-auth-token": `${jwt}`
          }
        });
        if(response.ok)
        {
            const tierLists = await response.json()
            setTierLists(tierLists);
            setSearched(true);
        }
    } catch (error) {
        console.error(error);
    }
  } 
  useEffect(() => { loadTierLists(); }, []);

  const handleEdit = (tierlist: TierList) => {
    navigate(`/createTierList?edit=${tierlist._id}`);
  };
  const handleAddTierlist = () => {
    console.log("Navigating to Add Tierlist page...");
    navigate('/createTierList');
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="p-4">
        <nav className="mx-auto flex items-center justify-between p-2 lg:px-8 rounded-lg bg-gray-600">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Tier Builder</span>
              <img
                className="h-8 w-auto"
                src={TierListLogo}
                alt="Tier Builder Logo"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="./createTierList"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Create Tier List
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Your Tier Lists
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Explore
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Dashboard
          </h1>
          <button
            onClick={handleAddTierlist}
            className="rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Tierlist
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Current Tierlists
          </h2>
          <div className="flex gap-5 mb-6">
            <input className="w-full rounded-xl px-2 py-1 text-black" 
                    placeholder = "Enter tier list title..."
                    onChange={(e) => setsearchTitle(e.target.value)}/>
            <div className="flex gap-4">
              <button className="rounded-xl px-2 py-1 bg-green-500"
                      onClick={() => {
                          if(searchTitle)
                          {
                            searchTierLists(searchTitle)
                          }
                        }
                      }>Search</button>
              {searched && (
                <button className="rounded-xl px-4 py-1 bg-purple-500 whitespace-nowrap"
                        onClick={() => { 
                          loadTierLists(); 
                          setSearched(false);
                        }}>Show All</button>
              )}
            </div>
          </div>
          {tierLists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
              {tierLists.map((tierList) => (
                <div
                  key={tierList.title}
                  className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                  onClick= {() => 
                    { 
                      setListModalOpen(true);
                      setCurrentList(tierList);
                    }
                  }
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {tierList.title}
                  </h3>
                  <p className="text-white">Click to view details</p>
                </div>
              ))}
            </div>
          ) : searched ? (
            <div className="text-center py-12 bg-gray-700 rounded-lg shadow-lg">
              <p className="text-xl text-white">
                No Tierlists found.
              </p>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-700 rounded-lg shadow-lg">
              <p className="text-xl text-white">
                No Tierlists available. Click "Add New Tierlist" to create one!
              </p>
            </div>
          )}
        </div>
        {isListModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
              <div className="bg-blue-500 p-6 text-center">
                <h2 className="text-white text-3xl font-bold mb-2">{currentList?.title}</h2>
                <p className="text-white text-lg">{currentList?.description}</p>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {currentList?.categories.map((category, categoryIdx) => (
                    <div key={categoryIdx} className="bg-gray-800 rounded-xl p-4 shadow-lg">
                      <div className="flex items-stretch min-h-[120px] gap-4">
                        <div className="w-24 flex items-center justify-center">
                          <div className={`${category.color} text-white font-bold text-xl p-7 rounded-xl text-center w-full`}>
                            {category.name}
                          </div>
                        </div>
                        <div className={`${category.color} flex-1 rounded-xl p-4`}>
                          <div className="flex flex-wrap gap-3 items-center min-h-[88px]">
                            {category.items.length > 0 ? (
                              category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="group">
                                  <div className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-3 h-20 w-20 flex items-center justify-center shadow-md">
                                    <div className="text-xs font-medium text-center truncate">
                                      {item.name}
                                    </div>
                                  </div>
                                  <div className="invisible group-hover:visible absolute z-50 bg-gray-900 text-white text-xs rounded-lg p-2 mt-1 shadow-lg max-w-xs">
                                    <div className="font-semibold">{item.name}</div>
                                    {item.description && (
                                      <div className="text-white mt-1">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-white text-center w-full py-8">
                                No items in this tier
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
              <div className="bg-gray-800 p-6">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setListModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                            onClick={ () => 
                              {
                                setListModalOpen(false);
                                if(currentList)
                                {
                                  handleEdit(currentList);
                                }
                              }
                            }>
                      Edit Tier List
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                            onClick={() => {
                              setDeleteCardModalOpen(true);
                              setDeleteItem(currentList);
                            }}>
                      Delete Tier List
                    </button>
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
                      <h2 className="text-white text-3xl font-bold mb-2">Delete Tier List</h2>
                  </div>
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                      <div className="space-y-6">
                          <div className="text-white text-center">Are you sure you want to delete this tier list?</div>
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
                                  onClick={() => {
                                    if(deleteItem)
                                      {
                                        deleteTierList(deleteItem);
                                        closeDeleteCardModal();
                                        setListModalOpen(false);
                                      }
                                    }
                                  }
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
      </main>

      <footer className="mt-auto py-12">
        <div className="w-[95%] border-t border-gray-300 mx-auto"></div>
        <div className="text-center mt-8">
          <h1 className="pt-8 font-semibold text-white lg:text-2xl sm:text-xl">
            About Tier List Maker
          </h1>
          <p className="mt-4 text-md font-medium text-pretty text-white sm:text-md">
            Create and share easily accessible tier lists of all of your
            favorite subjects. You can create tier lists for movies, TV shows,
            video games, etc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
