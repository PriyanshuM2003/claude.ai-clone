import {
  Clock,
  Settings,
  PanelLeft,
  ArrowLeftToLine,
  ArrowRightToLine,
  CirclePlusIcon,
  MessagesSquareIcon,
  ChevronDownIcon,
  Check,
  ChevronRight,
  ExternalLink,
  Ellipsis
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Sidebar = ({
  isOpen,
  setIsOpen,
  setClickedAddNewChat,
  clickedAddNewChat,
  setSelectedKeyFromSidebar,
  
}) => {
  const [recentKey, setRecentKey] = useState([]);

  const [selectKey, SetSelectKey] = useState();
  const [profileTabClick, setProfileTabClick] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const existingHistory =
      JSON.parse(localStorage.getItem(user?.email)) || {};
    const keys = Object.keys(existingHistory).reverse();
    setRecentKey(keys);
    SetSelectKey("");
    setSelectedKeyFromSidebar("");
  }, [clickedAddNewChat]);

 

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Optionally, reset any user-related state here
    // setUser(null);

    // Navigate to the login page
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
  
    // Call on mount to close sidebar if already on small screen
    handleResize();
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileTabClick(false);
      }
    }

    if (profileTabClick) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileTabClick]);

  return (
    <aside
      className={`flex flex-col h-screen bg-[#faf9f5] border-r border-gray-200 transition-all duration-300 shadow-md
        ${isOpen ? "w-72" : "w-16"} fixed top-0 left-0 z-40`}
    >
      {/* Toggle Button */}
      <div className="flex justify-start items-center p-2 group gap-2 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-200 transition relative "
        >
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0">
              <PanelLeft size={24} color="gray" />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {!isOpen ? (
                <ArrowRightToLine size={24} color="gray"/>
              ) : (
                <ArrowLeftToLine size={24} color="gray"/>
              )}
            </div>
          </div>
        </button>
        {isOpen && (
          <span className="font-medium text-2xl cursor-pointer">Claude</span>
        )}
      </div>

      {/* Sidebar Content */}
      <ul className="space-y-2 px-2 mt-6">
        <li
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setClickedAddNewChat(true);
          }}
        >
          <CirclePlusIcon size={24} color="#c96442" />
          {isOpen && (
            <span className="text-[#c96442] font-semibold text-[16px]">
              New Chat
            </span>
          )}
        </li>
        <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 cursor-pointer">
          <MessagesSquareIcon size={24} color="gray" />
          {isOpen && <span className="font-normal text-[16px]">Chats</span>}
        </li>
      </ul>

      {/* This div will grow to fill space */}
      <div className="flex-grow overflow-y-auto px-2 mt-2">
        {/* You can populate this space dynamically */}
        {isOpen ? (
         <div className="ml-1">
         <p className="text-sm ml-2 mb-2 mt-10">Recents</p>
         {recentKey.map((key, index) => (
           <div
             key={index}
             className={`group flex items-center justify-between mt-[2px] text-sm text-gray-700 rounded p-2 font-normal hover:bg-[#e8e6dc] transition-all duration-200 ${
               selectKey === key ? "bg-[#e8e6dc]" : ""
             }`}
             onClick={() => {
               SetSelectKey(key);
               setSelectedKeyFromSidebar(key);
             }}
             title={key}
           >
             <span className="truncate max-w-[80%]">{key}</span>
             
             {/* Icon appears on hover or if selected */}
             {(selectKey === key) || (
               <span className="ml-2 hidden group-hover:flex flex-shrink-0 cursor-pointer">
                 <Ellipsis size={16} />
               </span>
             )}
       
             {selectKey === key && (
               <span className="ml-2 flex flex-shrink-0 cursor-pointer">
                 <Ellipsis size={16} />
               </span>
             )}
           </div>
         ))}
       </div>
       
        ) : null}
      </div>

      {/* Footer/Profile button */}
      <div className="px-2 pb-4 relative">
        <div
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-200 cursor-pointer ${
            isOpen ? "justify-between" : "justify-center"
          }`}
          onClick={() => {
            setProfileTabClick(!profileTabClick);
          }}
        >
          <div className="flex justify-start items-center gap-3  w-full">
            <img
              src={user?.picture}
              width={30}
              height={30}
              style={{ borderRadius: 50 }}
            />
            {isOpen && (
              <div className="flex w-full justify-between items-center">
              <span className="font-light text-[14px]">Free plan</span>
              <div>
                <ChevronDownIcon size={24} />
              </div>
              </div>
            )}
          </div>
          
        </div>

        {profileTabClick && (
  <div
  ref={dropdownRef}
    className={`
      absolute 
      bottom-14 
      ${isOpen ? "left-3" : "left-3"} 
      mb-2 
      px-4 py-2 
      bg-white 
      border 
      rounded-lg 
      shadow-lg 
      w-64 
      z-50
    `}
  >
    <div>
      <p className="text-gray-600">{user?.email}</p>
      <div className="flex justify-between items-center mt-3 border-b border-gray-300 pb-3">
        <div className="flex items-center gap-3">
          <img src={user?.picture} width={30} height={30} className="rounded-full" />
          <div>
            <p className="text-[15px] font-medium">Personal</p>
            <p className="font-light text-[10px]">Free plan</p>
          </div>
        </div>
        <Check size={18} color="blue" />
      </div>
    </div>

    <div className="flex-col gap-3 border-b border-gray-300">
      <button className="block w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 rounded">Settings</button>
      <button className="w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 flex justify-between items-center rounded">
        <span>View all plans</span>
        <span className="text-blue-400 bg-blue-50 px-1 rounded">New</span>
      </button>
      <button className="w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 flex justify-between items-center rounded">
        <span>Language</span>
        <ChevronRight size={18} />
      </button>
      <button className="block w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 rounded">Get help</button>
    </div>

    <div className="flex-col gap-3 border-b border-gray-300">
      <button className="w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 flex justify-between items-center rounded">
        <span>Learn more</span>
        <ChevronRight size={18} />
      </button>
      <button className="w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 flex justify-between items-center rounded">
        <span>Download Claude for Windows</span>
        <ExternalLink size={18} />
      </button>
    </div>

    <button
      className="block w-full py-2 text-left text-sm hover:bg-[#f0eee6] px-1 rounded"
      onClick={handleLogout}
    >
      Log out
    </button>
  </div>
)}

      </div>
    </aside>
  );
};

export default Sidebar;
