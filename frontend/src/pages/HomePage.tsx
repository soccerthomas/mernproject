import TierListLogo from "../images/TierListLogo.png";

function Homepage() {
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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="./register"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Create Account<span aria-hidden="true"></span>
            </a>
            <a
              href="./login"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="mx-auto py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-white sm:text-7xl">
            Create A Tier List
          </h1>
          <p className="mt-4 text-xl font-medium text-pretty text-gray-400 sm:text-2xl">
            The Possibilities Are Endless
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="./createTierList"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-white">
              Explore <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto py-12">
        <div className="w-[95%] border-t border-gray-300 mx-auto"></div>
        <div className="text-center">
          <h1 className="pt-8 font-semibold text-white lg:text-2xl sm:text-xl">
            About Tier List Maker
          </h1>
          <p className="mt-4 text-md font-medium text-pretty text-gray-400 sm:text-md">
            Create and share easily accessible tier lists of all of your
            favorite subjects. You can create tier lists for movies, TV shows,
            videos games, etc
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
