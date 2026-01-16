import React, { useState } from 'react'
import "./index-enhanced.css"
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { RiComputerFill } from "react-icons/ri";
import { GiOpenBook, GiWhiteBook } from 'react-icons/gi';
import { FaBloggerB } from 'react-icons/fa';
import Navbar from './components/Navbar';

const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const ai = new GoogleGenAI({ apiKey: "AIzaSyAD0IyQkv7z5-foHwePIgIx8VlgrV3CUrU" });
  let messages = [];

  const [data, setData] = useState(messages);

  async function getResponse() {
    if (prompt === "") {
      alert("Please enter a prompt!");
      return;
    }

    setData(prevData => [...prevData, { role: "user", content: prompt }])

    setScreen(2);

    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setData(prevData => [...prevData, { role: "ai", content: response.text }])

    setPrompt("");
    console.log(messages)
    setLoading(false);
  }

  const handleCardClick = (cardPrompt) => {
    setPrompt(cardPrompt);
    getResponse();
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {
          screen === 1 ?
            <div className="flex-1 px-4 sm:px-6 md:px-10 py-8 flex items-center justify-center flex-col overflow-y-auto">
              <h3 className='!text-[32px] font-[700] mb-8'>Bot<span className='text-purple-500'>GPT</span></h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl ">
                <div
                  className="card w-[180px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-4"
                  onClick={() => handleCardClick("Create a website using html css and js.")}
                >
                 <i className='text-[24px] block text-center mb-2'><RiComputerFill/></i>
                 <p className='text-sm text-center'>Create a website using html css and js.</p>
                </div>
                <div
                  className="card w-full sm:w-[180px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-4"
                  onClick={() => handleCardClick("Write a book for me. topic is coding.")}
                >
                 <i className='text-[24px] block text-center mb-2'><GiWhiteBook/></i>
                 <p className='text-sm text-center'>Write a book for me. topic is coding.</p>
                </div>
                <div
                  className="card w-[180px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-4"
                  onClick={() => handleCardClick("Tell me a comedy story.")}
                >
                 <i className='text-[24px] block text-center mb-2'><GiOpenBook/></i>
                 <p className='text-sm text-center'>Tell me a comedy story.</p>
                </div>
                <div
                  className="card w-[180px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-4"
                  onClick={() => handleCardClick("Create a blog for me topic is web dev.")}
                >
                 <i className='text-[24px] block text-center mb-2'><FaBloggerB/></i>
                 <p className='text-sm text-center'>Create a blog for me topic is web dev.</p>
                </div>
              </div>
            </div> : <>
              <div className="flex-1 px-4 sm:px-6 md:px-10 py-4 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  {
                    data ? data.map((item, index) => {
                      return (
                        <div key={index} className="mb-4">
                          {
                            item.role === "user" ?
                              <div className="user w-fit max-w-[90%] sm:max-w-[70%] md:max-w-[60%] mb-4 ml-auto p-4">
                                <p className='text-xs text-gray-400 mb-1'>User</p>
                                <p className="text-sm">{item.content}</p>
                              </div> :
                              <div className="ai w-fit max-w-[50%] sm:max-w-[70%] md:max-w-[60%] mb-4 mr-auto p-4">
                                <p className='text-xs text-gray-400 mb-1'>BotGPT</p>
                                <div className="text-sm">
                                  <Markdown>
                                    {item.content}
                                  </Markdown>
                                </div>
                              </div>
                          }
                        </div>
                      )
                    }) : "No Messages Yet!"
                  }
                  {
                    loading ?
                      <div className="loader flex justify-center my-4"><BeatLoader color='#fff' /></div> : ""
                  }
                </div>
              </div>
            </>
        }
      </div>

      <div className="inputBox px-4 sm:px-6  py-3 border-t border-gray-700 bg-zinc-900">
        <div className="input w-full max-w-4xl mx-auto flex items-center gap-2 bg-zinc-800 rounded-xl px-2 py-1">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getResponse();
              }
            }}
            onChange={(e) => { setPrompt(e.target.value) }}
            value={prompt}
            type="text"
            placeholder='Enter your prompt!'
            className='flex-1 bg-transparent rounded-lg px-4 py-3 outline-none text-white text-base font-normal placeholder-gray-400'
          />
          <button
          onClick={getResponse}
          disabled ={loading}
          className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm disabled:opacity-45'
          >Send</button>
        </div>
        <p className='text-xs text-gray-500 text-center mt-2'>BotGPT can make mistakes! cross check it.</p>
      </div>
    </div>
  )
}

export default App
