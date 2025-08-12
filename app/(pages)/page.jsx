"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const handleSearch = async () => {
    const domain = searchInput.trim();
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (domain.length === 0) {
      return;
    } else if (!domainPattern.test(domain)) {
      return;
    } else {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain: domain }),
        };

        const response = await fetch("/api/startScan", options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.sessionId) {
            setSessionId(data.sessionId);
          }
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getHistory = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };
    const response = await fetch("/api/getHistory", options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.sessions) {
        setHistory(data.sessions);
      }
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    if (sessionId) {
      console.log(sessionId);
      router.push(`/scanning?search=${searchInput}&sessionId=${sessionId}`);
    }
  }, [sessionId]);

  return (
    <main className="bg-search">
      <div className="flex flex-col items-center  gap-4 min-h-screen">
        <h1 className="text-4xl font-bold mt-[10%]">K2K Discovery</h1>
        <div className="grid grid-cols-5 gap-4 px-[10%] w-full">
          <div className="col-span-4 ">
            <input
              type="text"
              placeholder="Search"
              className="global-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <div className="col-span-1 ">
            <button className="global-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="w-full px-[11%]">
          <h2 className="text-xl font-semibold">Search History:</h2>
          <hr className="w-full border-b border-[#c7c7c7] my-2" />
          {history.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-5">
              {history.map((item) => (
                <div
                  key={item.sessionId}
                  className="bg-gray-100 p-4 rounded-md shadow-md cursor-pointer hover:bg-white transition-all duration-300 border border-gray-200 flex justify-between"
                  onClick={() => {
                    router.push(
                      `/results?search=${item.domain}&sessionId=${item.sessionId}`
                    );
                  }}
                >
                  <p className="text-base font-semibold text-[#0c0c0c]">
                    {item.domain}
                  </p>
                  <p className="text-sm text-[#666666]">
                    {item.completed ? "Completed" : "In Progress"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#666666]">No search history found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
