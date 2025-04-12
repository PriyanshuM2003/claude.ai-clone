'use client';
import { useState } from 'react';
import Sidebar from './sidebar';
import SearchArea from './searchArea';
import Header from "./header";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [clickedAddNewChat,setClickedAddNewChat]=useState(false);
  const [selectedKeyFromSidebar,setSelectedKeyFromSidebar]=useState();
  

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setClickedAddNewChat={setClickedAddNewChat} clickedAddNewChat={clickedAddNewChat} setSelectedKeyFromSidebar={setSelectedKeyFromSidebar} />
      <main
        className={`flex-1 transition-all duration-300  bg-white min-h-screen ${
          isOpen ? 'ml-72' : 'ml-16'
        }`}
      >
         {selectedKeyFromSidebar&&<Header selectedkey={selectedKeyFromSidebar}/>}
        <SearchArea setClickedAddNewChat={setClickedAddNewChat} clickedAddNewChat={clickedAddNewChat} selectedKeyFromSidebar={selectedKeyFromSidebar} />
      </main>
    </div>
  );
};

export default Dashboard;
