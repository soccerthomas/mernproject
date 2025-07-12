// this is just an example file for our dashboard, we will need to rewrite this********

import React, { useState, useEffect } from "react";
import TierListLogo from "../images/TierListLogo.png";


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
interface CategoriesStructure
{
    name:string;
    color:string;
    items:Array<ItemStructure>;
}

interface TierListFormat {
  title: string,
  description: string,
  categories: Array<CategoriesStructure>,
  unassignedItems: Array<ItemStructure>,
  globalTags: Array<TagStructure>
}
interface TierList {
  id: string,
  name: string
}

const Dashboard: React.FC = () => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  //const [currentCard, setCurrentCard] = useState<TierList>();
  //const [tierLists, setTierLists] = useState<TierList[]>([]);

  const tierlist: TierListFormat = {
  title: "Best Video Games of All Time",
  description: "My personal ranking of the greatest video games ever made",
  categories: [
    {
      name: "S Tier",
      color: "bg-red-500",
      items: [
        {
          id: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          image: "https://via.placeholder.com/150x100?text=Zelda+BOTW",
          description: "Revolutionary open-world adventure game"
        },
        {
          id: 2,
          title: "Super Mario Odyssey",
          image: "https://via.placeholder.com/150x100?text=Mario+Odyssey",
          description: "Incredible 3D platformer with creative mechanics"
        },
        {
          id: 3,
          title: "The Witcher 3: Wild Hunt",
          image: "https://via.placeholder.com/150x100?text=Witcher+3",
          description: "Epic fantasy RPG with amazing storytelling"
        }
      ]
    },
    {
      name: "A Tier",
      color: "bg-orange-500",
      items: [
        {
          id: 4,
          title: "God of War (2018)",
          image: "https://via.placeholder.com/150x100?text=God+of+War",
          description: "Stunning action-adventure with Norse mythology"
        },
        {
          id: 5,
          title: "Red Dead Redemption 2",
          image: "https://via.placeholder.com/150x100?text=RDR2",
          description: "Immersive western open-world experience"
        },
        {
          id: 6,
          title: "Minecraft",
          image: "https://via.placeholder.com/150x100?text=Minecraft",
          description: "Creative sandbox game with endless possibilities"
        }
      ]
    },
    {
      name: "B Tier",
      color: "bg-yellow-500",
      items: [
        {
          id: 7,
          title: "Overwatch",
          image: "https://via.placeholder.com/150x100?text=Overwatch",
          description: "Team-based multiplayer shooter"
        },
        {
          id: 8,
          title: "Animal Crossing: New Horizons",
          image: "https://via.placeholder.com/150x100?text=Animal+Crossing",
          description: "Relaxing life simulation game"
        }
      ]
    },
    {
      name: "C Tier",
      color: "bg-green-500",
      items: [
        {
          id: 9,
          title: "FIFA 23",
          image: "https://via.placeholder.com/150x100?text=FIFA+23",
          description: "Latest football simulation game"
        }
      ]
    }
  ],
  unassignedItems: [
    {
      id: 10,
      title: "Cyberpunk 2077",
      image: "https://via.placeholder.com/150x100?text=Cyberpunk+2077",
      description: "Futuristic RPG with mixed reviews"
    },
    {
      id: 11,
      title: "Among Us",
      image: "https://via.placeholder.com/150x100?text=Among+Us",
      description: "Social deduction party game"
    },
    {
      id: 12,
      title: "Fall Guys",
      image: "https://via.placeholder.com/150x100?text=Fall+Guys",
      description: "Colorful battle royale party game"
    }
  ],
  globalTags: [
    {
      name: "Single Player",
      status: "active"
    },
    {
      name: "Multiplayer",
      status: "active"
    },
    {
      name: "RPG",
      status: "inactive"
    },
    {
      name: "Action",
      status: "active"
    },
    {
      name: "Adventure",
      status: "active"
    }
  ]
};



  async function loadTierLists() 
  {
      const jwt = localStorage.getItem("userJWT");
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
            // const savedTierLists = await response.json();
            //setTierLists(savedTierLists);
        }
    } catch (error) {
        console.error(error);
    }
  } 
  // async function deleteTierList(tierlist: TierList) 
  // {
  //     const jwt = localStorage.getItem("userJWT");
  //     try {
  //       const response = await fetch(`api/tierlist/${tierlist.id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-auth-token": `${jwt}`
  //         }
  //       });
  //       if(response.ok)
  //       {
  //           const savedTierLists = await response.json();
  //           setTierLists(savedTierLists);
  //       }
  //   } catch (error) {
  //       console.error(error);
  //   }
  // } 
  useEffect(() => { loadTierLists(); }, []);
  //const [tierLists, setTierLists] = useState<TierList[]>([
  const [tierLists] = useState<TierList[]>([
    { id: "1", name: "My Favorite Games Tier List" },
    { id: "2", name: "Best Movies of 2024" },
    { id: "3", name: "Programming Languages Tier" },
  ]);

  const handleAddTierlist = () => {
    console.log("Navigating to Add Tierlist page...");
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
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Current Tierlists
          </h2>
          {tierLists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
              {tierLists.map((tierList) => (
                <div
                  //key={tierList.title}
                  key={tierList.name}
                  className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                  onClick= {() => 
                    { 
                      setCardModalOpen(true);
                      //setCurrentCard(tierList);
                    }
                  }
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {/* {tierList.title} */tierList.name}
                  </h3>
                  <p className="text-gray-400">Click to view details</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-700 rounded-lg shadow-lg">
              <p className="text-xl text-gray-400">
                No Tierlists available. Click "Add New Tierlist" to create one!
              </p>
            </div>
          )}
        </div>
        {isCardModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 max-h-[95vh] w-full max-w-6xl rounded-2xl relative overflow-hidden">
              <div className="bg-blue-500 p-6 text-center">
                <h2 className="text-white text-3xl font-bold mb-2">{tierlist.title}</h2>
                <p className="text-white text-lg">{tierlist.description}</p>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {tierlist.categories.map((category, categoryIdx) => (
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
                                      {item.title}
                                    </div>
                                  </div>
                                  <div className="invisible group-hover:visible absolute z-50 bg-gray-900 text-white text-xs rounded-lg p-2 mt-1 shadow-lg max-w-xs">
                                    <div className="font-semibold">{item.title}</div>
                                    {item.description && (
                                      <div className="text-gray-300 mt-1">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-400 text-center w-full py-8">
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
                    onClick={() => setCardModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                      Edit Tier List
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                      Delete Tier List
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
          <p className="mt-4 text-md font-medium text-pretty text-gray-400 sm:text-md">
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
