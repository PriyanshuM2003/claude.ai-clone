import React, { useEffect, useRef, useState } from "react";
import { Share, ChevronDownIcon } from "lucide-react";

const Header = ({ selectedkey }) => {
  const [titleClicked, setTitleClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTitleClicked(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <div className="w-auto height-12 flex justify-between items-center px-4 py-3 sticky top-0 bg-[#faf9f5]">
      <div
        className="flex justify-center items-center gap-3 ml-5 hover:bg-[#e8e6dc] px-3 py-1 rounded-lg relative"
        onClick={() => {
          setTitleClicked(!titleClicked);
        }}
        ref={dropdownRef}
      >
        <span className="font-normal truncate max-w-[350px] block whitespace-nowrap overflow-hidden">{selectedkey}</span>
        <ChevronDownIcon size={24} />
        {titleClicked && (
          <div className="absolute -bottom-28 right-0 mt-2 bg-white border rounded-lg shadow-lg w-32">
            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 border-b border-gray-300">
              Star
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
              Rename
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-700">
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="flex justify-center items-center gap-1 hover:bg-[#e8e6dc] px-3 py-1 rounded-lg cursor-pointer">
        <Share size={18} />
        <span className="font-semibold">Share</span>
      </p>
    </div>
  );
};

export default Header;
