import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  Command, 
  BookOpen, 
  Trophy, 
  PieChart, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  Settings, 
  Flag, 
  ChevronRight, 
  Play, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Flame, 
  Target, 
  Medal, 
  Menu, 
  X, 
  LogOut, 
  Send, 
  Paperclip, 
  Smile, 
  Plus, 
  Phone, 
  Video, 
  MoreVertical, 
  FileText, 
  ShoppingBag,
  ChevronLeft,
  Users,
  Download,
  Upload,
  Calculator
} from 'lucide-react';
import logo from "./logo.png";
import flagImage from "./flag.png";
import bgImage from "./bg.jpg";
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';


type FileType = 'image' | 'document' | 'pdf';

interface AttachmentType {
  id: string;
  file: File;
  type: FileType;
  preview?: string;
}

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenuTray, setShowMenuTray] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>('Nathael Roy');
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    sender: 'user' | 'other';
    time: string;
    attachments?: Array<{ type: 'image' | 'file'; url: string; name?: string }>;
  }>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [chatHistory] = useState<Record<string, Array<{
    id: number;
    text: string;
    sender: 'user' | 'other';
    time: string;
    attachments?: Array<{ type: 'image' | 'file'; url: string; name?: string }>;
  }>>>({
    'Nathael Roy': [
      {
        id: 1,
        text: "Hello! How can I help you with your studies today?",
        sender: 'other',
        time: '09:30'
      },
      {
        id: 2,
        text: "I need help with the React course materials",
        sender: 'user',
        time: '09:31'
      },
      {
        id: 3,
        text: "Of course! I can help you with React. Which specific topic are you struggling with?",
        sender: 'other',
        time: '09:32'
      }
    ],
    'Paris Liana': [
      {
        id: 1,
        text: "Hi! I've reviewed your latest assignment.",
        sender: 'other',
        time: '10:15'
      },
      {
        id: 2,
        text: "Thank you! What do you think about it?",
        sender: 'user',
        time: '10:16'
      }
    ],
    'Dr. Sarah Wilson': [
      {
        id: 1,
        text: "Your progress in the course has been exceptional!",
        sender: 'other',
        time: '09:45'
      }
    ],
    'Prof. Michael Chen': [
      {
        id: 1,
        text: "Here's the study material for next week's session",
        sender: 'other',
        time: '09:15',
        attachments: [{
          type: 'file',
          url: '#',
          name: 'study_material.pdf'
        }]
      }
    ]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showNotificationTray, setShowNotificationTray] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "ViniIAS",
      subtitle: "Win upto 90% Scholarship",
      duration: "90 mins",
      enrolledCount: "7k+ students already enrolled",
      image: "path_to_pwsat_image.jpg" 
    },
   
  ];

  // First, add this new state for the assignment upload modal
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentFiles, setAssignmentFiles] = useState<AttachmentType[]>([]);
  const [assignmentDragging, setAssignmentDragging] = useState(false);

  // Add this state at the beginning of your App component, where other states are defined
  const [showCoursesTray, setShowCoursesTray] = useState(false);

  // Add this with other state declarations at the top
  const [showStudyToolsTray, setShowStudyToolsTray] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setShowDetails(false);
  };

  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  const handleSidebarClick = (section: string) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleSendMessage(file);
    }
  };

  const getFileType = (file: File): FileType => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'document';
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newAttachments: AttachmentType[] = [];
    
    Array.from(files).forEach(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        return;
      }

      const type = getFileType(file);
      const id = Math.random().toString(36).substr(2, 9);

 
      if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachments(prev => prev.map(att => 
            att.id === id ? { ...att, preview: e.target?.result as string } : att
          ));
        };
        reader.readAsDataURL(file);
      }

      newAttachments.push({
        id,
        file,
        type,
        preview: type === 'image' ? undefined : undefined
      });
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleSendMessage = (attachment?: File) => {
    if ((messageInput.trim() || attachment) && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: 'user' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachments: attachment ? [{
          type: attachment.type.startsWith('image/') ? 'image' : 'file',
          url: URL.createObjectURL(attachment),
          name: attachment.name
        }] : undefined
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      setSelectedFile(null);
    }
  };

  const handleLogoClick = () => {
    setActiveSection(null);
    setShowDetails(false);
  };

  const chatList = [
    { 
      name: 'Nathael Roy',
      msg: 'Good Morning!',
      time: '10:30',
      img: 'photo-1472099645785-5658abf4ff4e',
      unread: 2,
      online: true
    },
    { 
      name: 'Abhishek Saini',
      msg: 'Let me check that assignment!',
      time: '10:30',
      img: 'photo-1517841905240-472988babdf9',
      unread: 3,
      online: true
    },
    {
      name: 'Akshit',
      msg: 'Your progress is impressive...',
      time: '09:45',
      img: 'photo-1494790108377-be9c29b29330',
      unread: 0,
      online: true
    },
    {
      name: 'Ansh Dhiman',
      msg: "Here's the study material for...",
      time: '09:15',
      img: 'photo-1507003211169-00dcc994a43e',
      unread: 1,
      online: false
    },
    {
      name: 'Akshat Malik',
      msg: 'Thanks for your help with...',
      time: 'Yesterday',
      img: 'photo-1438761681033-6461ffad8d80',
      unread: 0,
      online: false
    },
    {
      name: 'Raju Yadav',
      msg: 'The group study session is...',
      time: 'Yesterday',
      img: 'photo-1500648767791-00dcc994a43e',
      unread: 0,
      online: true
    }
  ];

  const filteredChatList = useMemo(() => {
    return chatList.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.msg.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatList, searchQuery]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Add this new function to handle assignment files
  const handleAssignmentFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachmentType[] = [];
    
    Array.from(files).forEach(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        return;
      }

      const type = getFileType(file);
      const id = Math.random().toString(36).substr(2, 9);

      // Create preview for images
      if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAssignmentFiles(prev => prev.map(att => 
            att.id === id ? { ...att, preview: e.target?.result as string } : att
          ));
        };
        reader.readAsDataURL(file);
      }

      newFiles.push({
        id,
        file,
        type,
        preview: type === 'image' ? undefined : undefined
      });
    });

    setAssignmentFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="flex min-h-screen bg-white">
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
            className="w-auto h-auto transform scale-[1.35] -translate-x-2 cursor-pointer" 
            onClick={handleLogoClick}
          />
        </div>

        <div className="space-y-3 flex-1">
          <p className="text-xs text-gray-500 px-2">DASHBOARD</p>
          <button 
            className={`sidebar-link ${activeSection === 'courses' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`} 
            onClick={() => handleSidebarClick('courses')}
          >
            <Command size={20} />
            <span className="text-[15px]">My Courses</span>
          </button>

          <button 
            className={`sidebar-link relative overflow-hidden group ${activeSection === 'vini-ai' ? 'bg-[#8B5CF6]/10' : ''}`}
            onClick={() => handleSidebarClick('vini-ai')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 rounded-lg"></div>
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"></div>
            <BookOpen size={20} className={`${activeSection === 'vini-ai' ? 'text-[#8B5CF6] scale-110' : 'text-[#8B5CF6]'} group-hover:scale-110 transition-transform duration-300`} />
            <span className="text-[15px] flex items-center relative">
              <span className="font-hindi text-[#8B5CF6]">विनी</span>&nbsp;
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent font-semibold">AI</span>
            </span>
            <span className="absolute right-3 top-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-lg shadow-purple-500/20">
              NEW
            </span>
          </button>

          <button 
            className={`sidebar-link ${activeSection === 'practice' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('practice')}
          >
            <Trophy size={20} />
            <span className="text-[15px]">Practice</span>
          </button>

          <button 
            className={`sidebar-link ${activeSection === 'study-material' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('study-material')}
          >
            <PieChart size={20} />
            <span className="text-[15px]">Study Material</span>
          </button>

          <button 
            className={`sidebar-link relative overflow-hidden group ${activeSection === 'tuition-center' ? 'bg-[#FF6934]/10' : ''}`}
            onClick={() => handleSidebarClick('tuition-center')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6934]/10 to-[#FF8B34]/10 rounded-lg"></div>
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-[#FF6934]/20 to-[#FF8B34]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"></div>
            <GraduationCap size={20} className={`${activeSection === 'tuition-center' ? 'text-[#FF6934] scale-110' : 'text-[#FF6934]'} group-hover:scale-110 transition-transform duration-300`} />
            <span className="text-[15px] relative">
              <span className="bg-gradient-to-r from-[#FF6934] to-[#FF8B34] bg-clip-text text-transparent font-semibold">Tution Center</span>
            </span>
            <span className="absolute right-3 top-2.5 bg-gradient-to-r from-[#FF6934] to-[#FF8B34] text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-lg shadow-orange-500/20">
              NEW
            </span>
          </button>
          <button 
            className={`sidebar-link ${activeSection === 'chat' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('chat')}
          >
            <MessageSquare size={20} />
            <span className="text-[15px]">Chat</span>
          </button>
          <button 
            className={`sidebar-link ${activeSection === 'scholarship' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('scholarship')}
          >
            <Award size={20} />
            <span className="text-[15px]">Scholarship</span>
          </button>
          <button 
            className={`sidebar-link ${activeSection === 'contact' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('contact')}
          >
            <MessageSquare size={20} />
            <span className="text-[15px]">Contact us</span>
          </button>
          <button 
            className={`sidebar-link ${activeSection === 'settings' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('settings')}
          >
            <Settings size={20} />
            <span className="text-[15px]">Settings</span>
          </button>
          <button 
            className={`sidebar-link ${activeSection === 'logout' ? 'bg-[#FF6934]/10 text-[#FF6934]' : ''}`}
            onClick={() => handleSidebarClick('logout')}
          >
            <LogOut size={20} />
            <span className="text-[15px]">Logout</span>
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
      <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full ${
        showDetails ? 'lg:max-w-[calc(100%-600px)]' : 'lg:max-w-[calc(100%-580px)]'
      } ${activeSection ? 'hidden' : ''}`}>
        {/* Header */}
        <header className="header flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-16 sm:pt-0 mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:ml-8">
            <div className="search-container relative flex-1 w-full max-w-[640px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search here..."
                className="pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 w-full text-sm focus:outline-none focus:border-[#FF6934]"
              />
            </div>
            <div className="header-actions flex items-center gap-3 sm:gap-4">
              {/* Vini Store Button */}
              <button className="flex items-center gap-2.5 bg-[#4B83F7]/90 hover:bg-gradient-to-r hover:from-[#4B83F7] hover:to-[#6366F1] text-white px-6 py-2.5 rounded-lg transition-all duration-300 group">
                <MessageSquare size={20} className="group-hover:scale-105 transition-transform duration-300" />
                <span className="text-[0.9375rem] font-medium whitespace-nowrap flex items-center gap-2">
                  Vini Store
                  <span className="bg-white text-[#4B83F7] text-[10px] px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                </span>
              </button>

              {/* Skill Yaari Button */}
              <button className="flex items-center gap-2.5 bg-white hover:bg-gradient-to-r hover:from-white hover:to-[#F5F5F9] text-[#6366F1] px-6 py-2.5 rounded-lg transition-all duration-300 border border-[#E5E7EB]/60 group">
                <BookOpen size={20} className="group-hover:scale-105 transition-transform duration-300" />
                <span className="text-[0.9375rem] font-medium whitespace-nowrap">Skill Yaari</span>
              </button>

              {/* Notification Button */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotificationTray(!showNotificationTray)}
                  className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <Bell size={20} className="text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6934] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notification Tray */}
                {showNotificationTray && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotificationTray(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-[15px] font-semibold text-gray-900">Notifications</h3>
                          <button 
                            onClick={() => {
                              setUnreadNotifications(0);
                            }}
                            className="text-[13px] text-[#FF6934] font-medium hover:text-[#FF8B34]"
                          >
                            Mark all as read
                          </button>
                        </div>
                        <p className="text-[13px] text-gray-500">You have {unreadNotifications} unread notifications</p>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">
                        {/* Recent Notification */}
                        <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#FF6934] to-[#FF8B34]">
                              <ShoppingBag size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">New in Vini Store</p>
                              <p className="text-xs text-gray-500 mt-1">Check out our latest study materials!</p>
                              <p className="text-xs text-gray-400 mt-2">Just now</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-[#FF6934] mt-2"></div>
                          </div>
                        </div>

                        {/* SkillYaari Notification */}
                        <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#10B981] to-[#34D399]">
                              <GraduationCap size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">New Skill Course Available</p>
                              <p className="text-xs text-gray-500 mt-1">Master public speaking with our new course</p>
                              <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-[#FF6934] mt-2"></div>
                          </div>
                        </div>

                        {/* More notifications... */}
                        <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
                              <BookOpen size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Assignment Due Soon</p>
                              <p className="text-xs text-gray-500 mt-1">Complete your pending assignment</p>
                              <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                        <button className="w-full text-center text-[#FF6934] text-sm font-medium hover:text-[#FF8B34] transition-colors">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Profile Button */}
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

      {/* Right Quick Actions Sidebar */}
      <aside className={`hidden lg:flex w-[320px] bg-white shadow-sm h-screen overflow-y-auto border-l border-gray-100 ${
        showDetails ? 'lg:hidden' : ''
      } ${activeSection ? 'hidden' : ''}`}>
        <div className="w-full flex flex-col">
          {/* Quick Actions Section */}
          <div className="p-5">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            {/* Vini Store Button */}
            <button className="w-full bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white group-hover:scale-110 transition-transform duration-200">
                  <MessageSquare size={20} />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[15px] text-gray-900">Ask a Mentor</h3>
                  </div>
                  <p className="text-[13px] text-gray-500">Get expert guidance</p>
                </div>
              </div>
            </button>

            {/* Submit Assignment Button */}
            <button 
              onClick={() => setShowAssignmentModal(true)}
              className="w-full bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white group-hover:scale-110 transition-transform duration-200">
                  <BookOpen size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[15px] text-gray-900">Submit Assignment</h3>
                  <p className="text-[13px] text-gray-500">Upload your work</p>
                </div>
              </div>
            </button>

            {/* Live Classes Button */}
            <button className="w-full bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#EF4444] to-[#F87171] text-white group-hover:scale-110 transition-transform duration-200">
                  <Video size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[15px] text-gray-900">Live Classes</h3>
                  <p className="text-[13px] text-gray-500">Join interactive sessions</p>
                </div>
              </div>
            </button>

            {/* Study Tool Button */}
            <button 
              onClick={() => setShowStudyToolsTray(true)}
              className="w-full bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#10B981] to-[#34D399] text-white group-hover:scale-110 transition-transform duration-200">
                  <BookOpen size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[15px] text-gray-900">Study Tool</h3>
                  <p className="text-[13px] text-gray-500">Access learning resources</p>
                </div>
              </div>
            </button>
          </div>

          {/* Upcoming Courses Section */}
          <div className="p-5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-gray-900">Upcoming Courses</h3>
              <button 
                onClick={() => setShowCoursesTray(true)}
                className="text-[13px] text-[#FF6934] font-medium hover:text-[#FF8B34]"
              >
                View All
              </button>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="p-5 border-t border-gray-100">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Quick Access Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-[13px] font-medium">Study Material</span>
              </button>
              <button className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-[13px] font-medium">Practice Tests</span>
              </button>
              <button className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-[13px] font-medium">Results</span>
              </button>
              <button className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-[13px] font-medium">Schedule</span>
              </button>
            </div>
          </div>

          {/* Download App Section */}
          <div className="mt-auto p-5 border-t border-gray-100">
            <div className="bg-gradient-to-r from-[#1D1B48] to-[#2E2B5F] rounded-xl p-5 text-white">
              <h3 className="font-semibold text-[15px] mb-3">Download our App</h3>
              <p className="text-[13px] text-gray-200 mb-4">Get access to exclusive features on our mobile app</p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Play Store" 
                  className="h-8"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store" 
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Profile Details Sidebar */}
      {showDetails && (
        <aside className="fixed lg:static w-full sm:w-[320px] lg:w-[320px] bg-gradient-to-b from-white to-[#FEFEFE] shadow-sm h-screen overflow-y-auto border-l border-gray-100 top-0 right-0 z-50">
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

      {/* Section Windows */}
      {activeSection && activeSection !== 'chat' && activeSection !== 'scholarship' && (
        <div className="fixed top-0 right-0 bottom-0 left-[280px] bg-gradient-to-br from-white to-gray-50/50 z-40">
          {/* Close Button */}
          <button 
            onClick={() => setActiveSection(null)} 
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <div className="h-full overflow-y-auto p-6">
            {/* Content for each section */}
            {activeSection === 'courses' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">My Courses</h1>
                {/* Add your courses content here */}
              </div>
            )}

            {activeSection === 'vini-ai' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">VINI AI</h1>
                {/* Add your VINI AI content here */}
              </div>
            )}

            {activeSection === 'practice' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Practice</h1>
                {/* Add your practice content here */}
              </div>
            )}

            {activeSection === 'study-material' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Study Material</h1>
                {/* Add your study material content here */}
              </div>
            )}

            {activeSection === 'tuition-center' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Tuition Center</h1>
                {/* Add your tuition center content here */}
              </div>
            )}

            {activeSection === 'contact' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
                {/* Add your contact content here */}
              </div>
            )}

            {activeSection === 'settings' && (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Settings</h1>
                {/* Add your settings content here */}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {activeSection === 'chat' && (
        <div className="fixed top-0 right-0 bottom-0 left-[280px] bg-gradient-to-br from-white to-gray-50/50 z-40">
          {/* Add Close Button */}
          <button 
            onClick={() => setActiveSection(null)} 
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <div className="flex h-full">
            {/* Chat List Sidebar */}
            <div className="w-[300px] bg-white border-r border-gray-100 flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Chat</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search contacts or messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-[#FF6934]/20 text-sm"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  )}
              </div>
            </div>

              {/* Tabs */}
              <div className="flex p-1 mx-4 mt-4 bg-gray-50 rounded-full">
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-full bg-white text-gray-900 shadow-sm">
                  Instructors
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Peers
                </button>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto mt-4">
                {filteredChatList.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No contacts found</p>
                  </div>
                ) : (
                  filteredChatList.map((chat, i) => (
                    <div 
                      key={i}
                      onClick={() => setSelectedChat(chat.name)}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedChat === chat.name 
                          ? 'bg-[#FF6934]/5 border-l-4 border-[#FF6934]' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={`https://images.unsplash.com/${chat.img}?w=40&h=40&fit=crop`}
                            alt={chat.name}
                            className="w-12 h-12 rounded-full"
                          />
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[15px] text-gray-900 truncate">{chat.name}</h3>
                            <span className="text-[12px] text-gray-500">{chat.time}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[13px] text-gray-500 truncate">{chat.msg}</p>
                            {chat.unread && (
                              <span className="ml-2 bg-[#FF6934] text-white text-[11px] font-medium h-5 w-5 flex items-center justify-center rounded-full">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* New Chat Button */}
              <div className="p-4">
                <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6934] to-[#FF8B34] text-white flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-shadow">
                  <Plus size={24} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                      alt="Chat User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] text-gray-900">Nathael Roy</h3>
                    <p className="text-[13px] text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Phone className="text-gray-400" size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video className="text-gray-400" size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="text-gray-400" size={20} />
                  </button>
                </div>
              </div>

              {/* Messages and Input Container */}
              <div className="flex-1 flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Time Separator */}
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-400 bg-white px-3">Today</span>
                    <div className="h-px bg-gray-100 flex-1"></div>
                  </div>

                  {/* Display chat history for selected chat */}
                  {selectedChat && chatHistory[selectedChat]?.map(message => (
                    <div key={message.id} className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'justify-end' : ''
                    }`}>
                      {message.sender !== 'user' && (
                        <img
                          src={`https://images.unsplash.com/${
                            chatList.find(chat => chat.name === selectedChat)?.img
                          }?w=32&h=32&fit=crop`}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className={`${
                          message.sender === 'user' 
                            ? 'bg-[#FF6934] text-white' 
                            : 'bg-gray-50 text-gray-800'
                        } p-3 rounded-2xl ${
                          message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                        } max-w-[420px]`}>
                          {message.attachments?.map((attachment, index) => (
                            <div key={index} className="mb-2">
                              {attachment.type === 'image' ? (
                                <img 
                                  src={attachment.url} 
                                  alt="Attachment" 
                                  className="rounded-lg max-w-full h-auto"
                                />
                              ) : (
                                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                                  <FileText size={20} />
                                  <span className="text-sm truncate">{attachment.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                          {message.text && <p className="text-sm">{message.text}</p>}
                        </div>
                        <span className={`text-[11px] text-gray-400 mt-1 block ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}>{message.time}</span>
                      </div>
                      {message.sender === 'user' && (
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                          alt="You"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                  ))}

                  {/* Display new messages */}
                  {messages.map(message => (
                    <div key={message.id} className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'justify-end' : ''
                    }`}>
                      {message.sender !== 'user' && (
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className={`${
                          message.sender === 'user' 
                            ? 'bg-[#FF6934] text-white' 
                            : 'bg-gray-50 text-gray-800'
                        } p-3 rounded-2xl ${
                          message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                        } max-w-[420px]`}>
                          {message.attachments?.map((attachment, index) => (
                            <div key={index} className="mb-2">
                              {attachment.type === 'image' ? (
                                <img 
                                  src={attachment.url} 
                                  alt="Attachment" 
                                  className="rounded-lg max-w-full h-auto"
                                />
                              ) : (
                                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                                  <FileText size={20} />
                                  <span className="text-sm truncate">{attachment.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                          {message.text && <p className="text-sm">{message.text}</p>}
                        </div>
                        <span className={`text-[11px] text-gray-400 mt-1 block ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}>{message.time}</span>
                      </div>
                      {message.sender === 'user' && (
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                          alt="You"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-100 relative">
                  <div 
                    className={`flex items-end gap-3 bg-gray-50 rounded-2xl p-3 ${
                      isDragging ? 'border-2 border-dashed border-[#FF6934]' : ''
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Paperclip className="text-gray-400" size={20} />
                      </button>
                    </label>
                    <div className="flex-1">
                      <textarea
                        rows={1}
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm resize-none"
                        style={{ height: '28px' }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <Smile className="text-gray-400" size={20} />
                        </button>
                        {showEmojiPicker && (
                          <div className="absolute bottom-12 right-0 z-50">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleSendMessage()}
                        className="p-2 bg-[#FF6934] text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-shadow"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Attachment Preview */}
                  {attachments.length > 0 && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {attachments.map(attachment => (
                          <div key={attachment.id} className="relative group">
                            {attachment.type === 'image' ? (
                              <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <img 
                                  src={attachment.preview} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center">
                                <FileText size={24} className="text-gray-400" />
                              </div>
                            )}
                            <button 
                              onClick={() => setAttachments(prev => prev.filter(a => a.id !== attachment.id))}
                              className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} className="text-gray-600" />
                            </button>
                            <span className="absolute bottom-0 left-0 right-0 text-[10px] text-center bg-black/50 text-white truncate px-1">
                              {attachment.file.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scholarship Interface */}
      {activeSection === 'scholarship' && (
        <div className="fixed top-0 right-0 bottom-0 left-[280px] bg-white z-40 overflow-y-auto">
          {/* Close Button */}
          <button 
            onClick={() => setActiveSection(null)} 
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-50"
          >
            <X size={20} className="text-gray-600" />
          </button>

          {/* Hero Section */}
          <div className="bg-[#1D1B48] h-[400px] relative">
            <div className="max-w-6xl mx-auto px-8 h-full flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="text-white">
                  <h1 className="text-5xl font-bold mb-4">PWSAT</h1>
                  <h2 className="text-3xl font-semibold mb-6">Win upto 90% Scholarship</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>Duration: 90 mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={20} />
                      <span>7k+ students already enrolled</span>
                    </div>
                  </div>
                  <button className="bg-white text-[#1D1B48] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                    Register for free
                  </button>
                </div>
                <div className="w-[400px]">
                  <img 
                    src="/instructor.png" 
                    alt="Instructor" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Exam Details */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Exam Details</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                  <Download size={18} />
                  Syllabus
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Calendar className="text-[#FF6934]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Exam Dates</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        Online: 10th March 2025 to 25th March 2025
                      </p>
                      <p className="text-gray-600 text-sm">
                        Offline: 16th March 2025 & 23rd March 2025
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Exam Timings</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        Online: 12:00 PM to 11:59 PM
                      </p>
                      <p className="text-gray-600 text-sm">
                        Offline: 10:00 AM to 11:00 AM & 04:00 PM to 05:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What is PWSAT */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What is PWSAT</h2>
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <p className="text-gray-600">
                  PWSAT stands for Physics Wallah Scholarship cum Admission Test. PW has created this scholarship test to identify and nurture talented students who aspire to pursue careers in Medical and Engineering domains. PWSAT provides up to 90% Scholarship.
                </p>
              </div>
            </div>

            {/* How PWSAT benefits students */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">How PWSAT benefit students</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-[#FF6934] font-bold text-2xl mb-2">45K+</div>
                  <p className="text-gray-600 text-sm">Students received the PW scholarship</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-[#FF6934] font-bold text-2xl mb-2">INR 40 Cr+</div>
                  <p className="text-gray-600 text-sm">Worth of scholarships already given</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-[#FF6934] font-bold text-2xl mb-2">3.7L+</div>
                  <p className="text-gray-600 text-sm">Tests have been already conducted across India</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <button className="flex justify-between items-center w-full">
                    <span className="font-semibold">What will be the PWSAT Syllabus?</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
                {/* Add more FAQ items as needed */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Upload Modal */}
      {showAssignmentModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowAssignmentModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-2xl shadow-xl z-50">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-semibold">Submit Assignment</h3>
                <button 
                  onClick={() => setShowAssignmentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Upload your assignment files (PDF, JPG, JPEG, PNG)</p>
            </div>

            <div className="p-6">
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  assignmentDragging ? 'border-[#8B5CF6] bg-purple-50' : 'border-gray-200'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setAssignmentDragging(true);
                }}
                onDragLeave={() => setAssignmentDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setAssignmentDragging(false);
                  handleAssignmentFiles(e.dataTransfer.files);
                }}
              >
                <input
                  type="file"
                  id="assignment-upload"
                  className="hidden"
                  onChange={(e) => handleAssignmentFiles(e.target.files)}
                  multiple
                  accept="image/*,.pdf"
                />
                <label 
                  htmlFor="assignment-upload" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="p-3 bg-purple-100 rounded-xl mb-4">
                    <Upload size={24} className="text-[#8B5CF6]" />
                  </div>
                  <p className="text-sm font-medium mb-1">
                    Drag and drop your files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 10MB
                  </p>
                </label>
              </div>

              {/* File Preview Section */}
              {assignmentFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Uploaded Files</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {assignmentFiles.map(file => (
                      <div key={file.id} className="relative group">
                        <div className="p-3 border border-gray-100 rounded-lg">
                          <div className="flex items-center gap-3">
                            {file.type === 'image' ? (
                              <img 
                                src={file.preview} 
                                alt="Preview" 
                                className="w-10 h-10 rounded object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-purple-50 rounded flex items-center justify-center">
                                <FileText size={20} className="text-[#8B5CF6]" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {file.file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setAssignmentFiles(prev => prev.filter(f => f.id !== file.id))}
                          className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} className="text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Handle assignment submission here
                    setShowAssignmentModal(false);
                    setAssignmentFiles([]);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg"
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add this Courses Side Tray right before the closing </div> of your main container */}
      {showCoursesTray && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setShowCoursesTray(false)}
          />
          <div className="fixed top-20 left-[calc(100%-600px)] w-[280px] bg-white shadow-lg z-[70] rounded-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold">Upcoming Courses</h3>
                <button 
                  onClick={() => setShowCoursesTray(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Learn Math */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BookOpen className="text-blue-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Learn Math</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-blue-600">View Details</span>
                        <ChevronRight size={12} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learn Science */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <BookOpen className="text-purple-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Learn Science</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-purple-600">View Details</span>
                        <ChevronRight size={12} className="text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spoken English */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <MessageSquare className="text-green-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Spoken English</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-green-600">View Details</span>
                        <ChevronRight size={12} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Robotics */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-100">
                      <Command className="text-orange-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Robotics</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-orange-600">View Details</span>
                        <ChevronRight size={12} className="text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Study Tools Tray */}
      {showStudyToolsTray && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setShowStudyToolsTray(false)}
          />
          <div className="fixed top-20 left-[calc(100%-600px)] w-[280px] bg-white shadow-lg z-[70] rounded-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold">Study Tools</h3>
                <button 
                  onClick={() => setShowStudyToolsTray(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Formula Sheet */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <FileText className="text-blue-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Formula Sheet</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-blue-600">Access Formulas</span>
                        <ChevronRight size={12} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculator */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Calculator className="text-purple-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Calculator</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-purple-600">Scientific Calculator</span>
                        <ChevronRight size={12} className="text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Year Papers */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <BookOpen className="text-green-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Previous Year Papers</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-green-600">View Papers</span>
                        <ChevronRight size={12} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-100">
                      <Trophy className="text-orange-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[14px]">Result</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[12px] text-orange-600">Check Results</span>
                        <ChevronRight size={12} className="text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
