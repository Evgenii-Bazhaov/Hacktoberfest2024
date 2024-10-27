"use client"

import { useChat } from "ai/react"

import { Input } from "./ui/input"

export function ChatPrompts() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="absolute h-96 w-80 overflow-hidden rounded-lg bg-secondary">
      <div className="relative size-full">
        <div className="h-80 w-full overflow-y-scroll px-2 text-justify">
          {messages.map((m) => (
            <div key={m.id} className="mb-2 whitespace-pre-wrap">
              <span className="rounded bg-background p-1">
                {m.role === "user" ? "User: " : "AI: "}
              </span>
              {m.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="absolute bottom-0 w-full p-2">
          <Input
            className="bottom-0 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  )
}
