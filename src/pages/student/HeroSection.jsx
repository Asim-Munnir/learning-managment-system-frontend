import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const courses = ["Full-Stack Developer", "Python Developer", "MERN Stack Developer", "React Developer", "JavaScript Guru", "DevOps"]

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [animatedText, setAnimatedText] = useState("")
  const [courseIndex, setCourseIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [removing, setRemoving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = courses[courseIndex]

      if (!removing) {
        if (letterIndex < currentWord.length) {
          setAnimatedText(prev => prev + currentWord[letterIndex])
          setLetterIndex(letterIndex + 1)
        } else {
          setTimeout(() => setRemoving(true), 1000)
        }
      } else {
        if (letterIndex > 0) {
          setAnimatedText(prev => prev.slice(0, -1))
          setLetterIndex(letterIndex - 1)
        } else {
          setRemoving(false)
          setCourseIndex((courseIndex + 1) % courses.length)
        }
      }
    }, 150)
    return () => clearTimeout(timeout)
  }, [letterIndex, removing, courseIndex])

  const searchHandler = (e) => {
    e.preventDefault()
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("")
  }

  return (
    <section className="relative pt-28 pb-20 min-h-[80vh] flex items-center overflow-visible bg-white dark:bg-gray-900">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-indigo-700/20 dark:from-[#0A0A0A] dark:via-[#111] dark:to-[#0F0F0F]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6">

        {/* LEFT SIDE — IMAGE WITH ANIMATED BORDER */}
        <div className="flex justify-center md:justify-start relative">
          <div className="w-64 h-82 md:w-8/12 md:h-[26rem] overflow-hidden relative rounded-3xl shadow-2xl border-4 border-transparent animate-border">
            <img
              src="https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg"
              alt="Programmer"
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none rounded-3xl"></div>
          </div>
        </div>

        {/* RIGHT SIDE — CONTENT */}
        <div className="text-center md:text-left mt-2 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 drop-shadow-sm min-h-[6rem]">
            Become a <span className="text-blue-600 dark:text-blue-400">{animatedText}<span className="blink">|</span></span><br />
            Start Your Coding Journey Today
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md mx-auto md:mx-0 text-lg">
            Learn JavaScript, MERN, Next.js, React, MongoDB, APIs and more with real-world projects.
          </p>

          <form
            onSubmit={searchHandler}
            className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-md mx-auto md:mx-0 mb-4 md:mb-6 border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programming courses..."
              className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Button
              type="submit"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-none rounded-r-full hover:bg-blue-700 transition-colors"
            >
              Search
            </Button>
          </form>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-full shadow-lg"
          >
            Explore Courses
          </Button>
        </div>
      </div>

      <style>
        {`
          .blink {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }

          @keyframes border-glow {
            0% { border-color: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
            50% { border-color: #9333ea; box-shadow: 0 0 15px #9333ea; }
            100% { border-color: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
          }

          .animate-border {
            animation: border-glow 3s infinite linear;
          }
        `}
      </style>
    </section>
  )
}

export default HeroSection
