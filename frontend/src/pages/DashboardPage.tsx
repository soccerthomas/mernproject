import TierListLogo from '../images/TierListLogo.png';
function Dashboard() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 border-2" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Tier Builder</span>
            <img className="h-8 w-auto" src={TierListLogo} alt="" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-800">Create Tier List</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-800">Your Tier Lists</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-800">Explore</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a href="./register" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-800">Create Account<span aria-hidden="true"></span></a>
          <a href="./login" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-800">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
    </header>
  );
}

export default Dashboard;
