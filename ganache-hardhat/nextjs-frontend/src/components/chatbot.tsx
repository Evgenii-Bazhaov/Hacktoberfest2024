"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { ChatPrompts } from "./chat-propmts"
import { Icons } from "./icons"
import { Button } from "./ui/button"

export function Chatbot() {
  const [isActive, setActive] = useState(false)
  return (
    <div className="fixed bottom-10 right-10">
      <div className="relative -z-10 size-0 bg-blue-700">
        <div
          className={cn(
            "flex size-0 items-center overflow-hidden rounded-lg border border-slate-600 bg-secondary duration-300 opacity-0",
            isActive &&
              "h-[450px] w-80 -translate-x-80 -translate-y-[450px] flex-col opacity-100"
          )}
        >
          <div className="m-2 flex h-12 w-full items-center justify-center rounded-md text-center text-lg font-bold">
            <span className="m-2 flex size-full items-center justify-center rounded-md border border-slate-600 bg-background">
              Chat with the site
            </span>
          </div>
          <div className="flex w-full grow items-center justify-center rounded-md p-2 text-center text-lg font-bold">
            <ChatPrompts />
          </div>
        </div>
      </div>
      <Button
        className="flex size-16 cursor-pointer items-center justify-center rounded-lg border border-slate-600 bg-secondary hover:bg-secondary"
        onClick={() => setActive(!isActive)}
      >
        <Icons.message size={35} color="#fff" />
      </Button>
    </div>
  )
}
