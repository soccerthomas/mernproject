// this is just an example file for our dashboard, we will need to rewrite this********

import React, { useState } from "react";
import TierListLogo from "../images/TierListLogo.png";

interface TierList {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [tierLists, setTierLists] = useState<TierList[]>([
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tierLists.map((tierList) => (
                <div
                  key={tierList.id}
                  className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                  onClick={() =>
                    console.log(`Viewing Tierlist: ${tierList.name}`)
                  }
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {tierList.name}
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
