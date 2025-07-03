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

  const topics = Object.keys(quotesData);
  const quotes = selectedTopic && quotesData[selectedTopic as keyof typeof quotesData];

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-start gap-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        💬 Quote Generator
      </h1>

      <Select onValueChange={(value) => setSelectedTopic(value)}>
        <SelectTrigger className="w-[300px] bg-white shadow">
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

      {selectedTopic && quotes && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </main>
  );
}
