'use client'

import { Search } from "lucide-react"
import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const userCarouselRef = useRef<HTMLDivElement>(null)
  const promptCarouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const userScroll = userCarouselRef.current
    const promptScroll = promptCarouselRef.current

    if (!userScroll || !promptScroll) return

    let userAnimationId: number
    let promptAnimationId: number

    const scrollUser = () => {
      if (userScroll.scrollLeft >= userScroll.scrollWidth / 2) {
        userScroll.scrollLeft = 0
      } else {
        userScroll.scrollLeft += 1
      }
      userAnimationId = requestAnimationFrame(scrollUser)
    }

    const scrollPrompt = () => {
      if (promptScroll.scrollLeft <= 0) {
        promptScroll.scrollLeft = promptScroll.scrollWidth / 2
      } else {
        promptScroll.scrollLeft -= 1
      }
      promptAnimationId = requestAnimationFrame(scrollPrompt)
    }

    userAnimationId = requestAnimationFrame(scrollUser)
    promptAnimationId = requestAnimationFrame(scrollPrompt)

    return () => {
      cancelAnimationFrame(userAnimationId)
      cancelAnimationFrame(promptAnimationId)
    }
  }, [])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <Image
              src=""
              alt="Sage logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <nav className="space-y-2">
            <Link className="block text-sm text-gray-400 hover:text-[#BB5E0E]" href="#">
              discover
            </Link>
            <Link className="block text-sm text-gray-400 hover:text-[#BB5E0E]" href="#">
              projects
            </Link>
          </nav>
          <div className="mt-8 text-sm text-gray-400">
            <p>welcome to sage, a place</p>
            <p>to find dope people</p>
            <p>building cool shit.</p>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>this is the place where</p>
            <p>people work on ideas</p>
            <p>they are passionate</p>
            <p>about.</p>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>give it a try.</p>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>see you in a search</p>
            <p>soon.</p>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-white text-black hover:bg-[#BB5E0E] hover:text-white" variant="outline">
            sign up
          </Button>
          <Button className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black" variant="outline">
            log in
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <h1 className="text-6xl font-bold mb-8 text-center">
          find and
          <br />
          <span className="text-[#BB5E0E]">be found.</span>
        </h1>
        
        {/* User Carousel */}
        <div 
          ref={userCarouselRef}
          className="flex overflow-x-hidden space-x-4 pb-4 mb-8"
          aria-label="User profiles carousel"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              {["kelli", "tair", "mattia", "alec", "farza"].map((name) => (
                <div key={`${name}-${i}`} className="flex-none w-64">
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <div className="aspect-video bg-[#111111] mb-2 rounded" />
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="text-sm text-gray-400">
                      {name === "kelli" && "content creator and designer exploring the world one experience ..."}
                      {name === "tair" && "heading eng at buildspace, building sage — a place for ..."}
                      {name === "mattia" && "building a visual landing page builder for developers"}
                      {name === "alec" && "crafting the next-gen builder community & fine-tuning cod ..."}
                      {name === "farza" && "founder of buildspace where new ideas come to life"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Prompt Carousel */}
        <div 
          ref={promptCarouselRef}
          className="flex overflow-x-hidden space-x-4 pb-4 mb-8"
          aria-label="Search prompts carousel"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              {[
                "who's is making short form content?",
                "who can help me design a logo?",
                "got any artists in europe?",
                "show me hardware",
                "i need to hire a react developer",
                "looking for AI researchers"
              ].map((query) => (
                <Button key={`${query}-${i}`} className="flex-none bg-[#0A0A0A] text-white hover:bg-[#BB5E0E] whitespace-nowrap" variant="outline">
                  {query}
                </Button>
              ))}
            </div>
          ))}
        </div>

        <div className="relative">
          <Input
            className="w-full bg-[#0A0A0A] border-none text-white placeholder-gray-500"
            placeholder="message sage..."
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BB5E0E]" />
        </div>
      </div>
    </div>
  )
}