"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [incident, setIncident] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generateFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ incident }),
      });

      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 px-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex md:mb-24">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">Klean</code>&nbsp;- Seu app
          gerador de feedbacks agéis
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Desenvolvido com{" "}
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="max-w-xl w-full">
        <div className="flex items-center space-x-3">
          <Image
            src="/1-black.png"
            width={30}
            height={30}
            alt="1 icon"
            className="mb-5 sm:mb-0"
          />
          <p className="text-left font-medium">Descreva o incidente</p>
        </div>
        <textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black focus:outline-black my-5 p-4"
        />
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Clique no botão para iniciar a geração
          </p>
        </div>

        {!loading && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
            onClick={(e) => handleSubmit(e)}
          >
            Gerar feedback
          </button>
        )}
        {loading && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 w-full"
            disabled
          >
            <span className="loading">
              <span style={{ backgroundColor: "#fff" }} />
              <span style={{ backgroundColor: "#fff" }} />
              <span style={{ backgroundColor: "#fff" }} />
            </span>
          </button>
        )}
      </div>

      {feedback && (
        <>
          <hr className="h-px w-[50%] bg-gray-700 border-1 dark:bg-gray-700 mt-10" />
          <div className="space-y-10 my-10">
            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              {feedback.split("\n\n").map((line, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                >
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
