"use client";

import { useState } from "react";
import quotesData from "@/data/quotes.json";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const gradients = [
  "from-pink-500 to-yellow-500",
  "from-blue-500 to-green-400",
  "from-purple-500 to-indigo-400",
  "from-orange-400 to-pink-500",
  "from-teal-400 to-blue-500",
  "from-rose-400 to-fuchsia-500",
  "from-lime-400 to-emerald-500",
  "from-cyan-400 to-violet-500"
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [randomQuote, setRandomQuote] = useState<any>(null);

  const topics = Object.keys(quotesData);
  const quotes = selectedTopic && quotesData[selectedTopic as keyof typeof quotesData];

  // Get a random quote from all topics
  const handleRandomQuote = () => {
    const allQuotes = Object.values(quotesData).flat();
    const random = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    setRandomQuote(random);
    setSelectedTopic("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-br from-indigo-200 via-pink-100 to-yellow-100 animate-bgFade">
      <main className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <div className="flex flex-col items-center mb-6">
            <span className="text-6xl mb-2 animate-bounce">💬</span>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg text-center">
              Quote Generator
            </h1>
            <p className="mt-2 text-lg md:text-xl text-gray-700 font-medium text-center max-w-xl">
              Discover inspiring quotes for every mood and moment. Select a topic or get a random dose of inspiration!
            </p>
          </div>
          <div className="backdrop-blur-md bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8 flex flex-col items-center gap-4 w-[90vw] max-w-md">
            <Select onValueChange={(value) => { setSelectedTopic(value); setRandomQuote(null); }}>
              <SelectTrigger className="w-full bg-white/80 shadow-md">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              className="mt-2 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 text-white font-bold shadow hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handleRandomQuote}
            >
              Get Inspired
            </button>
          </div>
          {/* Show random quote if selected */}
          {randomQuote && (
            <div className={`mt-8 p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500 transform transition duration-300 animate-fadeIn`}> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h-2.25v-3a.75.75 0 00-1.5 0v3H1.5a.75.75 0 000 1.5h2.25v7.5a.75.75 0 001.5 0v-7.5H7.5a.75.75 0 000-1.5zm12 0h-2.25v-3a.75.75 0 00-1.5 0v3h-2.25a.75.75 0 000 1.5h2.25v7.5a.75.75 0 001.5 0v-7.5H19.5a.75.75 0 000-1.5z"
                />
              </svg>
              <p className="text-lg font-semibold mb-2 text-white">"{randomQuote.text}"</p>
              <p className="text-sm italic text-white">— {randomQuote.author}</p>
            </div>
          )}
          {/* Show topic quotes if selected */}
          {selectedTopic && quotes && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {quotes.map((quote: any, index: number) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${gradients[index % gradients.length]} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6 mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h-2.25v-3a.75.75 0 00-1.5 0v3H1.5a.75.75 0 000 1.5h2.25v7.5a.75.75 0 001.5 0v-7.5H7.5a.75.75 0 000-1.5zm12 0h-2.25v-3a.75.75 0 00-1.5 0v3h-2.25a.75.75 0 000 1.5h2.25v7.5a.75.75 0 001.5 0v-7.5H19.5a.75.75 0 000-1.5z"
                    />
                  </svg>
                  <p className="text-lg font-semibold mb-2">"{quote.text}"</p>
                  <p className="text-sm italic">— {quote.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
