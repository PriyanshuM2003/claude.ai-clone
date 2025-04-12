import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Feather,
  ArrowUp,
  UserRound,
  Clipboard,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Camera,
  Github,
} from "lucide-react";

const ClaudeChat = ({
  clickedAddNewChat,
  setClickedAddNewChat,
  selectedKeyFromSidebar,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [historyKey, setHistoryKey] = useState("");
  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const dropdownRef = useRef();
  const [plusButtonClick, setPlusButtonClick] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  // Create or get latest history key on mount
  //   useEffect(() => {
  //     const existingHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};

  //     if (Object.keys(existingHistory).length > 0) {
  //       const latestKey = Object.keys(existingHistory).sort().reverse()[0]; // Get last one
  //       setHistoryKey(latestKey);
  //       setMessages(existingHistory[latestKey]);
  //     }
  //     //  else {
  //     //   const newKey = "history1";
  //     //   setHistoryKey(newKey);
  //     //   localStorage.setItem("searchHistory", JSON.stringify({ [newKey]: [] }));
  //     // }
  //   }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPlusButtonClick(false);
      }
    }

    if (plusButtonClick) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [plusButtonClick]);

  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem(user?.email)) || {};

    if (selectedKeyFromSidebar && existingHistory[selectedKeyFromSidebar]) {
      setHistoryKey(selectedKeyFromSidebar);
      setMessages(existingHistory[selectedKeyFromSidebar]);
    }
  }, [selectedKeyFromSidebar]);

  useEffect(() => {
    if (clickedAddNewChat) {
      handleAddNewChat();
      setClickedAddNewChat(false);
    }
  }, [clickedAddNewChat]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { question: input.trim(), answer: "" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInput("");
      handleFetch(newMessages.length - 1, newMessages);
    }
  };

  const handleFetch = async (index, newMessages) => {
    try {
      const randomParaCount = Math.floor(Math.random() * 4) + 1;
      const response = await fetch(
        `https://hipsum.co/api/?type=hipster-centric&paras=${randomParaCount}`
      );
      const data = await response.json();

      const updatedMessages = [...newMessages];
      updatedMessages[index].answer = data;

      setMessages(updatedMessages);
      if (historyKey === "") {
        const newKey = newMessages[0].question;
        setHistoryKey(newKey);

        const existingHistory =
          JSON.parse(localStorage.getItem(user?.email)) || {};
        const updatedHistory = {
          ...existingHistory,
          [newKey]: updatedMessages, // Add new key with messages
        };

        localStorage.setItem(user?.email, JSON.stringify(updatedHistory));
      } else {
        const currentHistory =
          JSON.parse(localStorage.getItem(user?.email)) || {};
        currentHistory[historyKey] = updatedMessages;
        localStorage.setItem(user?.email, JSON.stringify(currentHistory));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddNewChat = () => {
    setMessages([]);
    setInput("");
    setHistoryKey("");
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full bg-[#faf9f5] px-4 py-6">
      <div className="w-full max-w-4xl flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-28">
            <h2 className="text-sm font-semibold mb-2 p-2 rounded-lg bg-[#e8e6dc]">
              Free plan .{" "}
              <span className="text-blue-400 cursor-pointer">Upgrade</span>
            </h2>
            <p className="text-gray-600 flex justify-center items-center gap-3">
              <img
                src="/logo.svg"
                alt="My Icon"
                width={70}
                height={70}
                className="transition-transform duration-200 ease-in-out hover:scale-75"
                // className="animate-scalePulse"
              />
              <span className="text-5xl text-[#3D3D3A]">Hi, how are you?</span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 space-y-3 group ${
                  idx === messages.length - 1 ? "mb-32" : ""
                }`}
                ref={bottomRef}
              >
                <div className="bg-[#f0eee6] inline-flex justify-start items-start gap-3 p-3 rounded-lg max-w-full">
                  <div className="w-8 h-8 bg-[#3d3d3a] rounded-full flex justify-center items-center shrink-0">
                    <UserRound size={16} color="gray" />
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap break-words">
                    {msg.question}
                  </div>
                </div>

                <div className="p-4">
                  {Array.isArray(msg.answer)
                    ? msg.answer.map((para, i) => (
                      
                          <p
                            key={i}
                            className="text-gray-800 whitespace-pre-wrap mb-2"
                          >
                            {para}
                          </p>
                      
                      ))
                    : // <p className="text-gray-500 italic">Thinking...</p>
                      null}
                  {/* feedback section */}
                  <div
                  key={idx}
                    className={`flex justify-end items-center gap-2 w-full px-14 transition-opacity ${
                      idx === messages.length - 1
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="p-2 hover:bg-[#e8e6dc] rounded cursor-pointer">
                      <Clipboard size={15} color="gray" />
                    </div>
                    <div className="p-2 hover:bg-[#e8e6dc] rounded cursor-pointer">
                      <ThumbsUp size={15} color="gray" />
                    </div>
                    <div className="p-2 hover:bg-[#e8e6dc] rounded cursor-pointer">
                      <ThumbsDown size={15} color="gray" />
                    </div>

                    <p className="text-sm text-gray-800 cursor-pointer">
                      Retry
                    </p>
                  </div>
                  <img
                    src="/logo.svg"
                    alt="My Icon"
                    width={48}
                    height={48}
                    className="transition-transform duration-200 ease-in-out hover:scale-75"
                    // className="animate-scalePulse"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className={`fixed w-full bg-[#faf9f5] duration-300 ${
          messages.length === 0 ? "top-80" : "bottom-0"
        }`}
      >
        <div className="w-full max-w-5xl mx-auto px-4 md:px-32 sm:px-32 py-6">
          <div className="flex flex-col border border-gray-200 rounded-2xl shadow-sm bg-white px-4 py-3 space-y-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Reply to Claude..."
              className="w-full min-h-[24px] max-h-[144px] overflow-y-auto resize-none focus:outline-none text-gray-800 placeholder-gray-500 text-base bg-transparent"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2 relative">
                {/* Plus Button with Dropdown */}
                <div className="relative">
                  <button
                    className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition"
                    onClick={() => setPlusButtonClick(!plusButtonClick)}
                  >
                    <div
                      className={`${
                        plusButtonClick ? "-rotate-45" : "rotate-0"
                      } duration-200 transition-transform`}
                    >
                      <Plus size={18} />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {plusButtonClick && (
                    <div
                      ref={dropdownRef}
                      className={`absolute ${
                        messages.length ? "bottom-12" : "bottom-12"
                      } left-40 -translate-x-1/2  mt-2 bg-white border rounded-lg shadow-lg w-80 z-40`}
                    >
                      <button
                        className=" w-full px-4 py-2 text-left text-sm hover:bg-gray-100  flex justify-start items-center gap-2"
                        onClick={() => setPlusButtonClick(false)}
                      >
                        <Paperclip size={18} color="gray" /> Upload a file
                      </button>
                      <button
                        className=" w-full px-4 py-2 text-left text-sm hover:bg-gray-100  flex justify-start items-center gap-2"
                        onClick={() => setPlusButtonClick(false)}
                      >
                        <Camera size={18} color="gray" /> Take a screenshot
                      </button>
                      <button
                        className=" w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex justify-start items-center gap-2"
                        onClick={() => setPlusButtonClick(false)}
                      >
                        <Github size={18} color="gray" /> Add from Github
                      </button>
                    </div>
                  )}
                </div>

                {/* Feather Button */}
                <button className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition">
                  <Feather size={18} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm md:text-base font-medium text-gray-700">
                  Claude 3.7 Sonnet ▾
                </span>
                <button
                  onClick={handleSend}
                  className="w-8 h-8 rounded-lg bg-rose-200 hover:bg-rose-300 flex items-center justify-center transition"
                  style={{ backgroundColor: input ? "#c96442" : "#e4b1a0" }}
                >
                  <ArrowUp size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaudeChat;
