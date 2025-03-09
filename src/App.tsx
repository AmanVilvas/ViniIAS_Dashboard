import React, { useState } from 'react';
import { Search, Bell, Command, BookOpen, Trophy, PieChart, GraduationCap, Award, MessageSquare, Settings, Flag, ChevronRight, Play, Clock, Calendar, ArrowLeft, ArrowRight, Flame, Target, Medal, Menu, X } from 'lucide-react';
import logo from "./logo.png";
import flagImage from "./flag.png";
import bgImage from "./bg.jpg";

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenuTray, setShowMenuTray] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setShowDetails(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FFF8F6] relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-[60] bg-white p-2.5 rounded-lg shadow-sm hover:bg-gray-50"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {(isMobileMenuOpen || showDetails) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            
            setIsMobileMenuOpen(false);
            setShowDetails(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static w-[260px] sm:w-[280px] p-5 bg-white shadow-sm h-screen flex flex-col transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="flex justify-start items-center mb-4 pl-1">
          <img 
            src={logo} 
            alt="ViniIAS" 
            className="w-auto h-auto transform scale-[1.35] -translate-x-2" 
          />
        </div>

        <div className="space-y-3 flex-1">
          <p className="text-xs text-gray-500 px-2">MENU</p>
          <button className="sidebar-link active">
            <Command size={20} />
            <span className="text-[15px]">Overview</span>
          </button>
          <button className="sidebar-link">
            <BookOpen size={20} />

            <span className="text-[15px]">Lessons</span>
          </button>
          <button className="sidebar-link">
            <Trophy size={20} />
            <span className="text-[15px]">Leaderboard</span>
          </button>
          <button className="sidebar-link">
            <PieChart size={20} />
            <span className="text-[15px]">Skill Graph</span>
          </button>
          <button className="sidebar-link">
            <GraduationCap size={20} />
            <span className="text-[15px]">Courses</span>
          </button>
          <button className="sidebar-link">
            <Award size={20} />
            <span className="text-[15px]">Certificates</span>
          </button>
          <button className="sidebar-link relative">
            <MessageSquare size={20} />
            <span className="text-[15px]">Messages</span>
            <span className="absolute right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">5</span>
          </button>
          <button className="sidebar-link">
            <Settings size={20} />
            <span className="text-[15px]">Settings</span>
          </button>
        </div>

        <div className="mt-11">
          {/* Flag positioned absolutely relative to the container */}
          <div className="relative">
            {/* Flag image positioned above the premium card */}
            <div className="absolute -top-11 left-2 z-30">
              <img 
                src={flagImage} 
                alt="Premium Flag" 
                className="w-25 h-20 transform rotate-[28deg]"
              />
            </div>

            {/* Premium card */}
            <div className="relative rounded-[24px] text-white overflow-hidden">
              {/* Background Image */}
              <img 
                src={bgImage} 
                alt="background" 
                className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
              />
              
              {/* Content */}
              <div className="relative z-10 p-4 pt-3.5">
                <h3 className="font-semibold text-[15px] mb-2">Get Premium Now!</h3>
                <p className="text-[13px] text-white/90 mb-5">Reach our special feature by subscribe our plan.</p>
                <button className="w-full bg-white text-[#FF6934] px-4 py-2.5 rounded-lg text-[13px] font-medium flex items-center justify-center gap-1.5 hover:bg-opacity-90 transition-colors group">
                  Upgrade Now
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full ${showDetails ? 'lg:max-w-[calc(100%-600px)]' : ''}`}>
        {/* Header */}
        <header className="header flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-16 sm:pt-0 mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:ml-24">
            <div className="search-container relative flex-1 w-full max-w-[480px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search here..."
                className="pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 w-full text-sm focus:outline-none focus:border-[#FF6934]"
              />
            </div>
            <div className="header-actions flex items-center gap-3 sm:gap-4">
              {/* Only show these buttons when profile is not open */}
              {!showDetails && (
                <>
                  <button className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:scale-[1.02] text-[#3B82F6] group relative transition-all duration-300 ease-out overflow-hidden">
                    {/* Modern blue gradient overlay on hover */}
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,#3B82F6,#60A5FA,#93C5FD)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                    
                    {/* Icon wrapper with background */}
                    <div className="relative z-10 p-1.5 rounded-lg bg-blue-50 group-hover:bg-white/10 transition-colors duration-300">
                      <MessageSquare size={18} className="text-blue-500 transition-all duration-300 group-hover:rotate-12 group-hover:text-white" />
                    </div>
                    
                    {/* Text content */}
                    <span className="relative z-10 font-medium text-sm group-hover:text-white transition-colors duration-300">Ask A Mentor</span>
                  </button>

                  <button className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:scale-[1.02] text-[#8B5CF6] group relative transition-all duration-300 ease-out overflow-hidden">
                    {/* Modern purple gradient overlay on hover */}
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,#8B5CF6,#A78BFA,#C4B5FD)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                    
                    {/* Icon wrapper with background */}
                    <div className="relative z-10 p-1.5 rounded-lg bg-purple-50 group-hover:bg-white/10 transition-colors duration-300">
                      <BookOpen size={18} className="text-purple-500 transition-all duration-300 group-hover:rotate-12 group-hover:text-white" />
                    </div>
                    
                    {/* Text content */}
                    <span className="relative z-10 font-medium text-sm group-hover:text-white transition-colors duration-300">Submit Assignment</span>
                  </button>

                  {/* Notification button with dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(prev => !prev)}
                      className="p-2.5 rounded-xl bg-white border border-[#FFE8E0] shadow-sm hover:shadow-lg hover:scale-[1.02] relative transition-all duration-300 group"
                    >
                      <Bell size={20} className="text-[#FF6934] group-hover:rotate-12 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <>
                        {/* Overlay to close dropdown */}
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={() => setShowNotifications(false)}
                        ></div>
                        
                        {/* Dropdown content */}
                        <div className="absolute right-0 mt-2 w-[320px] bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                          <div className="p-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                          </div>
                          
                          {/* Notification items */}
                          <div className="max-h-[400px] overflow-y-auto">
                            {/* Message notification */}
                            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-100">
                                  <MessageSquare size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">New message from mentor</p>
                                  <p className="text-xs text-gray-500 mt-1">Sarah responded to your question about React hooks</p>
                                  <p className="text-xs text-gray-400 mt-2">2 minutes ago</p>
                                </div>
                              </div>
                            </div>

                            {/* Assignment notification */}
                            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-300">
                                  <BookOpen size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Assignment Graded</p>
                                  <p className="text-xs text-gray-500 mt-1">Your UI/UX project received an A+ grade!</p>
                                  <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
                                </div>
                              </div>
                            </div>

                            {/* Achievement notification */}
                            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-200">
                                  <Trophy size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">New Achievement!</p>
                                  <p className="text-xs text-gray-500 mt-1">You've completed 5 courses this month</p>
                                  <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                                </div>
                              </div>
                            </div>

                            {/* Course notification */}
                            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-200">
                                  <Play size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">New Course Available</p>
                                  <p className="text-xs text-gray-500 mt-1">Advanced JavaScript Patterns is now live</p>
                                  <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* View all button */}
                          <div className="p-3 bg-gray-50 border-t border-gray-100">
                            <button className="w-full text-sm text-[#FF6934] font-medium hover:text-[#FF8B34] transition-colors">
                              View All Notifications
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              <button onClick={toggleDetails} className="cursor-pointer transition-transform hover:scale-[1.02] duration-300">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="Profile"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-[#FF6934]"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Continue Learning Section */}
        <section className="mb-8 sm:mb-10 lg:mb-14">
          <h2 className="text-xl font-semibold mb-5 sm:mb-7">Continue Learning</h2>
          <div className="continue-learning-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7">
            <div className="card p-7">
              <div className="flex items-center gap-4 mb-7">
                <div className="p-2.5 bg-[#FFF8F6] rounded-lg">
                  <Command className="text-[#FF6934]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1">Advance UI/UX Design</h3>
                  <span className="text-sm text-gray-500">DESIGN</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill w-[75%]"></div>
              </div>
              <div className="flex items-center justify-between text-sm mb-5">
                <span className="text-gray-600">18/40 Lessons</span>
                <span className="text-gray-600 flex items-center gap-1.5">
                  <Clock size={16} />
                  2 hours left
                </span>
              </div>
              <button className="text-[#FF6934] font-medium flex items-center gap-1.5 text-sm hover:gap-2.5 transition-all">
                Resume Course
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="card p-7">
              <div className="flex items-center gap-4 mb-7">
                <div className="p-2.5 bg-[#FFF8F6] rounded-lg">
                  <Command className="text-[#FF6934]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1">Basic Web Development</h3>
                  <span className="text-sm text-gray-500">DEVELOPMENT</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill w-[50%]"></div>
              </div>
              <div className="flex items-center justify-between text-sm mb-5">
                <span className="text-gray-600">18/40 Lessons</span>
                <span className="text-gray-600 flex items-center gap-1.5">
                  <Clock size={16} />
                  2 hours left
                </span>
              </div>
              <button className="text-[#FF6934] font-medium flex items-center gap-1.5 text-sm hover:gap-2.5 transition-all">
                Resume Course
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Courses Section */}
        <section>
          <h2 className="text-xl font-semibold mb-5 sm:mb-7">Recommended Courses For You</h2>
          <div className="course-grid grid grid-cols-3 gap-7 max-w-[1200px]">
            {/* Course Card 1 */}
            <div className="card overflow-hidden w-full max-w-[360px]">
              <div className="relative aspect-[16/9]">
                <span className="absolute top-4 left-4 bg-[#FF6934] text-white px-2 py-1 rounded text-xs font-medium z-10">
                  New
                </span>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  3:50
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">Webflow Tutorial: Build Your First Portfolio Website In a Minute</h3>
                <p className="text-gray-600 mb-3 text-sm">Adam Smith</p>
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
            <div className="card overflow-hidden w-full max-w-[360px]">
              <div className="relative aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  9:32
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">Basic To Advance Design System With UX Strategies</h3>
                <p className="text-gray-600 mb-3 text-sm">Scott Warden</p>
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

            {/* Course Card 3 */}
            <div className="card overflow-hidden w-full max-w-[360px]">
              <div className="relative aspect-[16/9]">
                <span className="absolute top-4 left-4 bg-[#FF6934] text-white px-2 py-1 rounded text-xs font-medium z-10">
                  Popular
                </span>
                <img
                  src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=300&fit=crop"
                  alt="Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  5:15
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">Full Stack Development: From Zero to Hero with React & Node.js</h3>
                <p className="text-gray-600 mb-3 text-sm">Michael Chen</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF6934]">★</span>
                    <span className="font-medium">4.9</span>
                    <span className="text-gray-500">(892)</span>
                  </div>
                  <span className="font-semibold">$79.99</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Profile Details Sidebar */}
      {showDetails && (
        <aside className={`fixed lg:static w-full sm:w-[320px] lg:w-[320px] bg-gradient-to-b from-white to-[#FEFEFE] shadow-sm h-full overflow-y-auto transition-transform duration-300 lg:translate-x-0 top-0 right-0 z-50 ${showDetails ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="flex items-center gap-2 py-3.5 px-4 border-b border-gray-100 bg-white">
            <button 
              onClick={toggleDetails}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              <ChevronRight size={18} />
            </button>
            <span className="text-gray-400 text-[13px] font-medium">Close Details</span>
          </div>

          {/* Profile Section */}
          <div className="p-4 bg-gradient-to-br from-white to-[#FEFEFE]">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
                alt="Profile"
                className="w-[42px] h-[42px] rounded-full ring-2 ring-[#FFF8F6]"
              />
              <div>
                <h2 className="font-semibold text-[15px] text-gray-900">Brooklyn Simmons</h2>
                <p className="text-gray-500 text-[13px]">UI/UX Designer & Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] bg-[#FFF8F6] w-fit px-2.5 py-1.5 rounded-lg">
              <Award className="text-[#FF6934]" size={15} />
              <span className="font-medium text-gray-900">876</span>
              <span className="text-gray-500">Points</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-y border-gray-50">
            <div className="flex items-center gap-1.5">
              <Flame className="text-[#FF6934]" size={18} />
              <span className="font-medium text-[15px]">54</span>
              <span className="text-gray-500 text-[13px]">Days Streak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="text-[#FF6934]" size={18} />
              <span className="font-medium text-[15px]">06</span>
              <span className="text-gray-500 text-[13px]">Goals in Month</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Medal className="text-[#FF6934]" size={18} />
              <span className="font-medium text-[15px]">02</span>
              <span className="text-gray-500 text-[13px]">2nd Place</span>
            </div>
          </div>

          {/* Weekly Streak Section */}
          <div className="px-4 py-4 bg-gradient-to-br from-[#FFF8F6] via-[#FFF8F6] to-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[15px] text-gray-900">Weekly Streak</h3>
              <div className="flex items-center gap-2 text-[13px]">
                <Calendar size={15} className="text-gray-400" />
                <span className="text-gray-600">May 2024</span>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 hover:text-gray-600 p-0.5">
                    <ArrowLeft size={15} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-0.5">
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-[13px] text-gray-500 mb-3">4/4 Weeks</div>
            <div className="flex justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <span className="text-[13px] text-gray-500 mb-2">{day}</span>
                  <div className={`w-[30px] h-[30px] flex items-center justify-center rounded-lg text-[13px] font-medium
                    ${i < 3 ? 'bg-gradient-to-br from-[#FF6934] to-[#FF8B34] text-white shadow-sm' : 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]'}`}>
                    {[29, 30, 31, 1, 2, 3, 4][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-white border-t border-gray-50">
            <div className="bg-gradient-to-br from-[#FFF8F6] via-[#FFF8F6] to-white rounded-xl p-3.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 mb-1">
                <BookOpen className="text-[#FF6934]" size={18} />
                <span className="font-medium text-[15px]">3 Courses</span>
              </div>
              <span className="text-[13px] text-gray-500">In Progress</span>
            </div>
            <div className="bg-gradient-to-br from-[#FFF8F6] via-[#FFF8F6] to-white rounded-xl p-3.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 mb-1">
                <Award className="text-[#FF6934]" size={18} />
                <span className="font-medium text-[15px]">17 Courses</span>
              </div>
              <span className="text-[13px] text-gray-500">Completed</span>
            </div>
          </div>

          {/* Weekly Watch Time Section */}
          <div className="px-4 py-4 bg-gradient-to-br from-[#FFF8F6] via-[#FFF8F6] to-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[15px] text-gray-900">Weekly Watch Time</h3>
              <div className="flex items-center gap-2 text-[13px]">
                <Calendar size={15} className="text-gray-400" />
                <span className="text-gray-600">May 2024</span>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 hover:text-gray-600 p-0.5">
                    <ArrowLeft size={15} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-0.5">
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-[13px] text-gray-500 mb-3">4/4 Weeks</div>
            <div className="relative h-[160px]">
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[13px] text-gray-400 py-2">
                <span>6hrs</span>
                <span>4hrs</span>
                <span>2hrs</span>
                <span>0hrs</span>
              </div>
              <div className="ml-10 h-full bg-[#FFF8F6] rounded-lg relative">
                <div className="absolute bottom-0 inset-x-0 flex items-end justify-around h-full px-2 pb-2">
                  <div className="w-[30px] h-[40%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                  <div className="w-[30px] h-[60%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                  <div className="w-[30px] h-[80%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white shadow-md rounded px-2 py-1 text-[13px] font-medium whitespace-nowrap">
                      4:24m
                    </div>
                  </div>
                  <div className="w-[30px] h-[30%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                  <div className="w-[30px] h-[45%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                  <div className="w-[30px] h-[65%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                  <div className="w-[30px] h-[25%] bg-gradient-to-t from-[#FF6934] to-[#FF8B34] rounded-t-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;