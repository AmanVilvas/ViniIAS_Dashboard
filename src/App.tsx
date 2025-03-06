import React, { useState } from 'react';
import { Search, Bell, Command, BookOpen, Trophy, PieChart, GraduationCap, Award, MessageSquare, Settings, Flag, ChevronRight, Play, Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import logo from "../src/logo.png";
import { ChevronUp } from "lucide-react";


function App() {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">
      {/* Sidebar */}
      <aside className="w-[220px] p-4 bg-white">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="Logo" className="w-45 h-25" />
          
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-4 px-2">MENU</p>
          <button className="flex items-center gap-3 w-full p-2.5 bg-[#FFF8F6] rounded-lg text-[#FF6934]">
            <Command size={18} />
            <span>Overview</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <BookOpen size={18} />
            <span>Lessons</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Trophy size={18} />
            <span>Leaderboard</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <PieChart size={18} />
            <span>Skill Graph</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <GraduationCap size={18} />
            <span>Courses</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Award size={18} />
            <span>Certificates</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg relative">
            <MessageSquare size={18} />
            <span>Messages</span>
            <span className="absolute right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">5</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>

        <div className="mt-auto pt-8">
  <div className="relative bg-gradient-to-br from-[#FF6934] to-[#FF8B34] p-4 rounded-2xl text-white shadow-lg">
    <Flag className="absolute -top-4 right-4 text-white" size={20} />
    <h3 className="font-semibold mb-1">Get Premium Now!</h3>
    <p className="text-sm opacity-90 mb-3">Reach our special feature by subscribing to our plan.</p>
    <button className="bg-white text-[#FF6934] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-md hover:bg-gray-100 transition">
      Upgrade Now
      <ChevronUp className="w-4 h-4 text-[#FF6934]" />

    </button>
  </div>
</div>

      </aside>

      {/* Main Content */}
      <main className={`flex-1 px-8 py-6 ${showDetails ? 'max-w-[calc(100%-540px)]' : ''}`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-64 text-sm"
              />
            </div>
            <button className="p-2 rounded-lg border border-gray-200">
              <Command size={18} />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={toggleDetails}
              className="cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
            </button>
          </div>
        </header>

        {/* Continue Learning Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Command className="text-[#FF6934]" size={20} />
                <span className="font-semibold">Advance UI/UX Design</span>
              </div>
              <div className="bg-[#FFE8E0] h-2 rounded-full mb-4">
                <div className="bg-[#FF6934] w-3/4 h-full rounded-full"></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">18/40 Lessons</span>
                <span className="text-gray-600">2 hours left</span>
              </div>
              <button className="mt-4 text-[#FF6934] font-medium flex items-center gap-1 text-sm">
                Resume Course
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Command className="text-[#FF6934]" size={20} />
                <span className="font-semibold">Basic Web Development</span>
              </div>
              <div className="bg-[#FFE8E0] h-2 rounded-full mb-4">
                <div className="bg-[#FF6934] w-1/2 h-full rounded-full"></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">18/40 Lessons</span>
                <span className="text-gray-600">2 hours left</span>
              </div>
              <button className="mt-4 text-[#FF6934] font-medium flex items-center gap-1 text-sm">
                Resume Course
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Courses Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended Courses For You</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Course Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Play className="text-white" size={36} />
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  3:50
                </div>
                <div className="absolute top-2 left-2 bg-[#FF6934] text-white px-2 py-1 rounded text-xs">
                  New
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Webflow Tutorial: Build Your First Portfolio Website In a Minute</h3>
                <p className="text-gray-600 mb-2 text-sm">Adam Smith</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF6934]">★</span>
                    <span className="font-medium">4.7</span>
                    <span className="text-gray-500">(32)</span>
                  </div>
                  <span className="font-semibold">$12.99</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Play className="text-white" size={36} />
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  3:50
                </div>
                <div className="absolute top-2 left-2 bg-[#FF6934] text-white px-2 py-1 rounded text-xs">
                  New
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Webflow Tutorial: Build Your First Portfolio Website In a Minute</h3>
                <p className="text-gray-600 mb-2 text-sm">Adam Smith</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF6934]">★</span>
                    <span className="font-medium">4.7</span>
                    <span className="text-gray-500">(32)</span>
                  </div>
                  <span className="font-semibold">$12.99</span>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Play className="text-white" size={36} />
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  9:32
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Basic To Advance Design System With UX Strategies</h3>
                <p className="text-gray-600 mb-2 text-sm">Scott Warden</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF6934]">★</span>
                    <span className="font-medium">4.7</span>
                    <span className="text-gray-500">(540)</span>
                  </div>
                  <span className="font-semibold">$49.99</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      {showDetails && (
        <aside className="w-[320px] p-5 bg-white">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={toggleDetails}
              className="text-[#FF6934] text-sm hover:text-[#FF8B34] transition-colors"
            >
              Close Details
            </button>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div className="text-center mb-6">
            <h2 className="font-semibold text-lg mb-1">Aman Sharma</h2>
            <p className="text-gray-600 text-sm mb-2">UI/UX Designer & Developer</p>
            <div className="flex items-center justify-center gap-1 text-sm">
              <Trophy size={14} className="text-[#FF6934]" />
              <span>876 Points</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="font-semibold">54</div>
              <div className="text-xs text-gray-600">Days Streak</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">06</div>
              <div className="text-xs text-gray-600">Goals In Month</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">02</div>
              <div className="text-xs text-gray-600">2nd Place</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Weekly Streak</h3>
              <div className="flex items-center gap-1 text-sm">
                <Calendar size={14} />
                <span>May 2024</span>
              </div>
            </div>

            <div className="text-xs text-gray-600 mb-2">4/4 Weeks</div>
            
            <div className="grid grid-cols-7 gap-1.5 text-center mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-[10px] text-gray-500">{day}</div>
              ))}
              {['29', '30', '31', '1', '2', '3', '4'].map((date) => (
                <div key={date} className={`p-1.5 rounded-full text-xs ${
                  ['29', '30', '31'].includes(date) ? 'bg-[#FF6934] text-white' : ''
                }`}>
                  {date}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFF8F6] p-3 rounded-xl text-center">
                <div className="text-base font-semibold">3 Courses</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div className="bg-[#FFF8F6] p-3 rounded-xl text-center">
                <div className="text-base font-semibold">17 Courses</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Weekly Watch Time</h3>
              <div className="flex items-center gap-1 text-sm">
                <Clock size={14} />
                <span>May 2024</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">4/4 Weeks</span>
              <div className="flex gap-1">
                <button>
                  <ArrowLeft size={14} />
                </button>
                <button>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {['6hrs', '4hrs', '2hrs', '1hr'].map((time) => (
                <div key={time} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-8">{time}</span>
                  <div className="flex-1 h-1.5 bg-[#FFE8E0] rounded-full">
                    <div className="bg-[#FF6934] w-3/4 h-full rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;