import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Award, BookOpen, Briefcase, Building2, FileText, Video, MessageSquare, 
  TrendingUp, Shield, User, ChevronRight, CheckCircle2, Sparkles, AlertCircle, 
  Search, Filter, Plus, Trash2, ExternalLink, Download, Send, RefreshCw, Star, 
  Clock, Play, ArrowRight, Layers, Database, Code, ShieldCheck, Check, X, 
  HelpCircle, ChevronDown, Menu, LogOut, BarChart3, Target, Zap, Lightbulb, PlayCircle
} from 'lucide-react';

const INITIAL_DEMO_USER = {
  name: "Demo Student",
  email: "student@mponline.gov.in",
  college: "Maulana Azad National Institute of Technology (MANIT)",
  degree: "B.Tech Computer Science",
  gradYear: "2025",
  cgpa: "8.6",
  skills: [
    { name: "JavaScript", level: 80, target: 85, category: "Tech" },
    { name: "React.js", level: 65, target: 80, category: "Tech" },
    { name: "Python", level: 85, target: 80, category: "Tech" },
    { name: "SQL", level: 60, target: 75, category: "Tech" },
    { name: "Cloud Fundamentals", level: 25, target: 70, category: "Tech" },
    { name: "System Design", level: 30, target: 75, category: "Tech" },
    { name: "Communication", level: 75, target: 85, category: "Soft" }
  ],
  interests: ["Software Engineering", "Artificial Intelligence", "Web Development"],
  targetRole: "Full Stack Developer",
  careerMatchScore: 87,
  readinessScore: 82,
  completedCoursesCount: 4,
  appliedJobsCount: 5,
  avgInterviewScore: 78
};

const INITIAL_COURSES = [
  { id: 1, title: "Full-Stack React & Node.js Mastery", provider: "MP Tech Academy", skill: "React.js", level: "Intermediate", duration: "6 Weeks", rating: 4.8, certification: true, category: "Programming" },
  { id: 2, title: "AWS Cloud Practitioner & DevOps Basics", provider: "Cloud Skills India", skill: "Cloud Fundamentals", level: "Beginner", duration: "4 Weeks", rating: 4.9, certification: true, category: "Cloud" },
  { id: 3, title: "Scalable System Design for Engineers", provider: "Scaler Pro", skill: "System Design", level: "Advanced", duration: "8 Weeks", rating: 4.7, certification: true, category: "Programming" },
  { id: 4, title: "Python for Data Science & ML", provider: "NPTEL / IIT Madras", skill: "Python", level: "Intermediate", duration: "12 Weeks", rating: 4.9, certification: true, category: "AI/ML" },
  { id: 5, title: "Cybersecurity Essentials & Network Security", provider: "Govt Cybersecurity Cell", skill: "Security", level: "Beginner", duration: "5 Weeks", rating: 4.6, certification: true, category: "Cybersecurity" },
  { id: 6, title: "Corporate Communication & Interview Skills", provider: "SkillIndia Portal", skill: "Communication", level: "Beginner", duration: "3 Weeks", rating: 4.8, certification: true, category: "Communication" }
];

const INITIAL_JOBS = [
  { id: 1, title: "Junior Full Stack Engineer", company: "TCS Innovation Labs", location: "Indore, MP (Hybrid)", salary: "₹5.5 - ₹7.2 LPA", type: "Full-time", experience: "0-1 Yrs", match: 91, skills: ["React.js", "JavaScript", "SQL", "Node.js"], category: "Job" },
  { id: 2, title: "Software Development Intern", company: "Infosys Centre of Excellence", location: "Bhopal, MP (On-site)", stipend: "₹25,000 / mo", type: "Internship", duration: "6 Months", match: 95, skills: ["Python", "JavaScript", "React.js"], category: "Internship" },
  { id: 3, title: "Frontend Developer Trainee", company: "Cognizant", location: "Remote", salary: "₹4.8 LPA", type: "Full-time", experience: "Freshers", match: 84, skills: ["React.js", "HTML/CSS", "JavaScript"], category: "Job" },
  { id: 4, title: "Data Analyst Intern", company: "MP e-Governance Society (MAPIT)", location: "Bhopal, MP", stipend: "₹20,000 / mo", type: "Internship", duration: "3 Months", match: 88, skills: ["Python", "SQL", "Data Visualization"], category: "Internship" },
  { id: 5, title: "Cloud & DevOps Associate", company: "Wipro Cloud Services", location: "Pune (Remote option)", salary: "₹6.0 LPA", type: "Full-time", experience: "0-2 Yrs", match: 72, skills: ["Cloud Fundamentals", "Linux", "Python"], category: "Job" }
];

const INITIAL_GOVT_JOBS = [
  { id: 1, org: "MP Public Service Commission (MPPSC)", role: "Assistant System Manager / IT Officer", qualification: "B.E. / B.Tech / MCA", eligibility: "Age 21-40 yrs, Min 60% in degree", examDate: "2026-11-15", link: "https://mppsc.mp.gov.in", status: "Verified MPOnline Portal", seats: 42 },
  { id: 2, org: "National Informatics Centre (NIC MP)", role: "Scientific / Technical Assistant 'A'", qualification: "B.Tech CS/IT or MSc Electronics", eligibility: "Valid GATE score preferred", examDate: "2026-12-05", link: "https://nic.in", status: "Official Central Posting", seats: 85 },
  { id: 3, org: "MP State Electronics Development Corp (MPSEDC)", role: "Software Developer Grade-II", qualification: "B.Tech CS/IT or MCA", eligibility: "Resident of MP, Min 1 yr project exp", examDate: "2026-10-28", link: "https://mpsedc.mp.gov.in", status: "Verified MPOnline Portal", seats: 30 },
  { id: 4, org: "ISRO Telemetry & Tracking Centre (Bhopal Unit)", role: "Junior Research Fellow (Software & AI)", qualification: "B.Tech CS/AI/ECE", eligibility: "Valid GATE / ISRO Entrance", examDate: "2027-01-10", link: "https://isro.gov.in", status: "Official Central Posting", seats: 12 }
];

const CAREER_PROFILES_DATABASE = [
  { title: "Full Stack Developer", match: 91, reason: "Strong synergy with your JavaScript, React, and Python foundation. Minor gap in cloud deployment.", salary: "₹6 - ₹12 LPA", missing: ["System Design", "Cloud Fundamentals", "Docker"], trajectory: "High Demand in MP Tech Parks & National Remote roles" },
  { title: "Software Development Engineer (SDE-1)", match: 88, reason: "Your Python and core CS degree map closely to backend logic and problem-solving requirements.", salary: "₹7 - ₹14 LPA", missing: ["Advanced Data Structures", "System Design"], trajectory: "Core engineering track in tier-1 IT firms" },
  { title: "Data Analyst & Business Intelligence", match: 84, reason: "Solid SQL and Python base makes you highly suitable for analytical roles in e-governance and IT.", salary: "₹5 - ₹9 LPA", missing: ["PowerBI / Tableau", "Advanced Statistics"], trajectory: "Rapid growth across public sector & enterprise analytics" },
  { title: "AI/ML Solutions Associate", match: 78, reason: "Python background is great, but requires deeper specialization in machine learning frameworks.", salary: "₹8 - ₹15 LPA", missing: ["PyTorch/TensorFlow", "Math for ML", "MLOps"], trajectory: "Emerging domain with specialized roles" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // landing, onboarding, dashboard, career-match, skill-gap, roadmap, courses, jobs, govt-jobs, resume, interview, progress, admin, architecture
  const [user, setUser] = useState(INITIAL_DEMO_USER);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [govtJobs, setGovtJobs] = useState(INITIAL_GOVT_JOBS);
  const [toastMessage, setToastMessage] = useState(null);
  const [demoTourActive, setDemoTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: `Hello ${user.name}! I am your AI Career Assistant. How can I guide your tech journey today?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Onboarding Wizard State
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingForm, setOnboardingForm] = useState({
    name: user.name,
    email: user.email,
    college: user.college,
    degree: user.degree,
    gradYear: user.gradYear,
    cgpa: user.cgpa,
    skillsInput: "JavaScript, React.js, Python, SQL",
    targetRole: "Full Stack Developer",
    interestsInput: "Software Engineering, Web Development, AI"
  });

  // Resume Builder State
  const [resumeData, setResumeData] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 98765 43210",
    college: user.college,
    degree: user.degree,
    summary: "Motivated Computer Science graduate with strong skills in Python, JavaScript, and React. Passionate about building scalable web applications and solving complex algorithmic challenges.",
    skills: "JavaScript, React.js, Python, SQL, Git, HTML5, CSS3, REST APIs",
    projects: "• Smart E-Learning Portal: Built a web platform using React and Node.js serving 500+ active students.\n• Automated Data Parser: Developed a Python automation utility parsing 10,000+ records with 99.8% precision.",
    experience: "Software Development Intern at Tech Solutions (3 Months) - Worked on frontend UI optimization and API integration."
  });
  const [resumeEnhanceLoading, setResumeEnhanceLoading] = useState(false);

  // Mock Interview State
  const [interviewRole, setInterviewRole] = useState('Full Stack Developer');
  const [interviewDiff, setInterviewDiff] = useState('Intermediate');
  const [interviewState, setInterviewState] = useState('setup'); // setup, active, completed
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [interviewAnswers, setInterviewAnswers] = useState([]);
  const [interviewLoading, setInterviewLoading] = useState(false);

  const interviewQuestionsList = [
    "Can you explain the Virtual DOM in React and how it improves application rendering performance?",
    "How do you handle async operations in JavaScript? Compare Promises with Async/Await.",
    "Explain the difference between SQL and NoSQL databases. When would you choose one over the other for a project?",
    "Describe a challenging bug you encountered in a project and how you systematically diagnosed and fixed it."
  ];

  // Helper Toast Trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };


  // Chatbot Send Handler
  const handleSendChatMessage = (textToSend) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: messageText }];
    setChatMessages(newMessages);
    if (!textToSend) setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      let reply = "I'm analyzing your career request...";
      const query = messageText.toLowerCase();

      if (query.includes('career') || query.includes('suit') || query.includes('role')) {
        reply = `Based on your profile in ${user.degree}, your top match is **Full Stack Developer (91% Match)**. You also show high potential for Data Analyst roles!`;
      } else if (query.includes('skill') || query.includes('cloud') || query.includes('gap')) {
        reply = `Your primary skill gaps for Full Stack Engineering are **Cloud Fundamentals** (25%) and **System Design** (30%). I recommend starting the AWS Practitioner course.`;
      } else if (query.includes('interview') || query.includes('prepare')) {
        reply = `You can practice our **AI Mock Interview**! We have generated questions specifically tailored for ${user.targetRole} positions.`;
      } else if (query.includes('job') || query.includes('internship') || query.includes('government')) {
        reply = `There are currently **12 Jobs** and **4 Government opportunities (like MPPSC & NIC MP)** matching your profile! Check the Government tab.`;
      } else {
        reply = `Great question! As an AI career advisor, I recommend updating your skill matrix and completing 1 practical project this month to increase your readiness score above 85%.`;
      }

      setChatMessages([...newMessages, { sender: 'bot', text: reply }]);
      setChatLoading(false);
    }, 900);
  };

  // Onboarding Submit Handler
  const handleFinishOnboarding = () => {
    const rawSkills = onboardingForm.skillsInput.split(',').map(s => s.trim());
    const formattedSkills = rawSkills.map(s => ({
      name: s,
      level: 65 + Math.floor(Math.random() * 25),
      target: 80,
      category: "Tech"
    }));

    // Add missing target skills
    formattedSkills.push({ name: "Cloud Fundamentals", level: 25, target: 70, category: "Tech" });
    formattedSkills.push({ name: "System Design", level: 30, target: 75, category: "Tech" });

    setUser({
      ...user,
      name: onboardingForm.name,
      email: onboardingForm.email,
      college: onboardingForm.college,
      degree: onboardingForm.degree,
      gradYear: onboardingForm.gradYear,
      cgpa: onboardingForm.cgpa,
      targetRole: onboardingForm.targetRole,
      skills: formattedSkills
    });

    showToast("✨ Profile Analyzed Successfully! AI Recommendations updated.");
    setActiveTab('dashboard');
  };

  // Resume Enhancement AI Handler
  const handleEnhanceResume = () => {
    setResumeEnhanceLoading(true);
    setTimeout(() => {
      setResumeData({
        ...resumeData,
        summary: "Highly competent Computer Science Engineer with expertise in modern JavaScript frameworks (React), Python backend design, and relational database management (SQL). Proven ability in developing end-to-end web architectures.",
        projects: "• Smart E-Learning Platform: Architected a full-stack educational dashboard utilizing React.js, REST APIs, and Express; boosted student interaction metrics by 35%.\n• Automated ETL Data Pipeline: Formulated python-based data parsing pipelines processing 10k+ records daily with zero data degradation.",
      });
      setResumeEnhanceLoading(false);
      showToast("✨ AI Resume Enhancement Complete! Action verbs and project metrics added.");
    }, 1200);
  };

  // Mock Interview Handlers
  const handleStartInterview = () => {
    setInterviewState('active');
    setCurrentQuestionIdx(0);
    setInterviewAnswers([]);
    setUserAnswerInput('');
  };

  const handleNextQuestion = () => {
    if (!userAnswerInput.trim()) return;

    setInterviewLoading(true);
    setTimeout(() => {
      // Mock evaluation
      const score = Math.floor(70 + Math.random() * 25);
      const newAns = {
        question: interviewQuestionsList[currentQuestionIdx],
        answer: userAnswerInput,
        score: score,
        strengths: "Clear logical structure and concise explanation.",
        improvement: "Incorporate more real-world code examples or specific library details."
      };

      const updated = [...interviewAnswers, newAns];
      setInterviewAnswers(updated);
      setUserAnswerInput('');
      setInterviewLoading(false);

      if (currentQuestionIdx + 1 < interviewQuestionsList.length) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        setInterviewState('completed');
        showToast("🎉 Mock Interview Complete! Detailed AI Report Generated.");
      }
    }, 800);
  };

  // Quick 1-Click Demo Profile Switcher
  const handleTriggerDemoMode = () => {
    setUser(INITIAL_DEMO_USER);
    showToast("⚡ Demo Mode Activated! Student profile loaded for MPOnline Hackathon.");
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-[#26304E] font-sans antialiased flex flex-col selection:bg-[#E9E4FA] selection:text-[#6675D9]">
      
      {/* Top Banner for MPOnline Hackathon */}
      <div className="bg-gradient-to-r from-[#6675D9] via-[#8391F2] to-[#6675D9] text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase">MPOnline Hackathon 2026</span>
          <span className="hidden sm:inline">Official AI Career & Employability Engine</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleTriggerDemoMode}
            className="bg-white text-[#6675D9] hover:bg-slate-100 px-3 py-1 rounded-lg font-semibold text-xs transition shadow-sm flex items-center gap-1"
          >
            <Zap size={14} className="fill-[#6675D9]" /> 1-Click Demo Mode
          </button>
          <button 
            onClick={() => setActiveTab('architecture')}
            className="text-white hover:underline text-xs flex items-center gap-1"
          >
            <Code size={13} /> DB & API Docs
          </button>
        </div>
      </div>

      {/* Main Header / Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6675D9] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <Compass size={22} className="animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#6675D9] to-[#26304E] bg-clip-text text-transparent">
                CareerPath <span className="text-[#6675D9]">AI</span>
              </span>
              <span className="block text-[10px] text-slate-400 -mt-1 font-semibold uppercase tracking-wider">Employability Engine</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'dashboard' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <BarChart3 size={16} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('career-match')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'career-match' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Target size={16} /> AI Match
            </button>
            <button 
              onClick={() => setActiveTab('skill-gap')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'skill-gap' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <TrendingUp size={16} /> Skill Gap & Roadmap
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'courses' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <BookOpen size={16} /> Upskill
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'jobs' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Briefcase size={16} /> Jobs & Internships
            </button>
            <button 
              onClick={() => setActiveTab('govt-jobs')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'govt-jobs' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Building2 size={16} /> Govt Jobs
            </button>
            <button 
              onClick={() => setActiveTab('resume')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'resume' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText size={16} /> AI Resume
            </button>
            <button 
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${activeTab === 'interview' ? 'bg-[#E9E4FA] text-[#6675D9] font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Video size={16} /> Mock Interview
            </button>
          </nav>

          {/* User Profile & Mode Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${activeTab === 'admin' ? 'bg-[#26304E] text-white border-[#26304E]' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              title="Admin Mode Panel"
            >
              <Shield size={15} /> Admin
            </button>

            <div className="h-6 w-px bg-slate-200 my-auto hidden sm:block"></div>

            <button 
              onClick={() => setActiveTab('onboarding')}
              className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
            >
              <User size={15} /> {user ? user.name.split(' ')[0] : 'Profile'}
            </button>
          </div>
        </div>

        {/* Mobile Quick Navigation Strip */}
        <div className="lg:hidden border-t border-slate-100 overflow-x-auto flex items-center space-x-2 px-3 py-2 text-xs scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'career-match', label: 'AI Match', icon: Target },
            { id: 'skill-gap', label: 'Skill Gap', icon: TrendingUp },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'jobs', label: 'Jobs', icon: Briefcase },
            { id: 'govt-jobs', label: 'Govt Opportunities', icon: Building2 },
            { id: 'resume', label: 'Resume', icon: FileText },
            { id: 'interview', label: 'Interview', icon: Video },
            { id: 'progress', label: 'Progress', icon: Award }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg shrink-0 font-medium ${activeTab === item.id ? 'bg-[#6675D9] text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                <Icon size={14} /> {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        
        {}
        {activeTab === 'landing' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#E9E4FA]/50 via-[#F8FAFF] to-[#F8FAFF] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Hero Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9E4FA] text-[#6675D9] text-xs font-bold border border-[#6675D9]/20 shadow-xs">
                    <Sparkles size={14} /> AI-Powered Employability & Career Guidance
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26304E] leading-tight">
                    Your AI-Powered Career Journey <span className="bg-gradient-to-r from-[#6675D9] to-[#8391F2] bg-clip-text text-transparent">Starts Here.</span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Discover the right career, identify your skill gaps, build your resume, practice interviews, and find live job & government opportunities — all in one intelligent platform.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('onboarding')}
                      className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-[#6675D9]/25 hover:shadow-xl hover:-translate-y-0.5 transition flex items-center gap-2"
                    >
                      Get Started Free <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={() => setActiveTab('career-match')}
                      className="bg-white hover:bg-slate-50 text-[#26304E] border border-slate-200 px-6 py-3.5 rounded-2xl font-bold text-base shadow-xs hover:shadow-sm transition flex items-center gap-2"
                    >
                      Explore Careers <Compass size={18} className="text-[#6675D9]" />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start space-x-6 text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> MPOnline Aligned</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Real-time Skill Gap Analysis</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> 100% Free for Students</div>
                  </div>
                </div>

                {/* Right Hero Visual Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl relative backdrop-blur-sm">
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star size={12} className="fill-white" /> AI Live Analysis
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#DCEEF9] flex items-center justify-center text-[#6675D9]">
                          <User size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#26304E]">{user.name}</h4>
                          <p className="text-xs text-slate-400">{user.degree}</p>
                        </div>
                      </div>
                      <span className="bg-[#DDF4E8] text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                        Active Profile
                      </span>
                    </div>

                    <div className="py-4 space-y-4">
                      {/* Career Match Widget */}
                      <div className="bg-[#F8FAFF] p-4 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                          <span>RECOMMENDED CAREER</span>
                          <span className="text-[#6675D9]">{user.careerMatchScore}% Match</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="font-extrabold text-lg text-[#26304E]">{user.targetRole}</span>
                          <span className="text-xs bg-[#E9E4FA] text-[#6675D9] px-2 py-0.5 rounded-md font-semibold">High Synergy</span>
                        </div>
                      </div>

                      {/* Skill Readiness Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-600">Overall Employability Readiness</span>
                          <span className="text-emerald-600 font-extrabold">82%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#6675D9] to-emerald-400 rounded-full w-[82%] transition-all duration-1000"></div>
                        </div>
                      </div>

                      {/* Opportunities Counters */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-2">
                        <div className="bg-[#DCEEF9]/50 p-2.5 rounded-xl">
                          <p className="text-lg font-bold text-[#6675D9]">12</p>
                          <p className="text-[10px] font-semibold text-slate-500 uppercase">Live Jobs</p>
                        </div>
                        <div className="bg-[#FFE9D9]/50 p-2.5 rounded-xl">
                          <p className="text-lg font-bold text-orange-600">8</p>
                          <p className="text-[10px] font-semibold text-slate-500 uppercase">Internships</p>
                        </div>
                        <div className="bg-[#DDF4E8]/50 p-2.5 rounded-xl">
                          <p className="text-lg font-bold text-emerald-700">4</p>
                          <p className="text-[10px] font-semibold text-slate-500 uppercase">Govt Exams</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                    >
                      Open Interactive Student Hub <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Section: Why CareerPath AI */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#26304E]">Why CareerPath AI?</h2>
                <p className="text-slate-500 text-sm sm:text-base mt-2">
                  Traditional career portals only show job listings. We provide end-to-end intelligence from skill diagnosis to government employment.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Personalized Career Guidance", desc: "AI maps your academic background, skills, and projects to the highest-matching industry roles.", color: "bg-[#DCEEF9]", icon: Compass },
                  { title: "Skill Gap Analysis", desc: "Instant visual breakdown comparing your current skills against top recruiter requirements.", color: "bg-[#E9E4FA]", icon: TrendingUp },
                  { title: "Opportunity Discovery", desc: "Aggregated private tech jobs, internships, and verified MP/Central Govt exams in one place.", color: "bg-[#DDF4E8]", icon: Building2 },
                  { title: "AI Career Preparation", desc: "Interactive AI Resume enhancement and simulated role-specific mock interviews with live scoring.", color: "bg-[#FFE9D9]", icon: Sparkles }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-[#6675D9] mb-4`}>
                        <Icon size={22} />
                      </div>
                      <h3 className="font-bold text-base text-[#26304E] mb-2">{card.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-white border-y border-slate-100 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#26304E]">How It Works</h2>
                  <p className="text-slate-500 text-sm mt-2">A seamless 6-step roadmap engineered for complete employability</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                  {[
                    "1. Student Profile", "2. AI Analysis", "3. Skill Gap", 
                    "4. Career Roadmap", "5. Opportunities", "6. Career Readiness"
                  ].map((step, index) => (
                    <div key={index} className="bg-[#F8FAFF] p-4 rounded-2xl border border-slate-100 relative group hover:border-[#6675D9] transition">
                      <div className="w-8 h-8 rounded-full bg-[#E9E4FA] text-[#6675D9] font-extrabold text-xs flex items-center justify-center mx-auto mb-3">
                        {index + 1}
                      </div>
                      <p className="font-bold text-xs text-[#26304E]">{step.replace(/^\d+\.\s*/, '')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 px-4 text-center">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#6675D9] to-[#8391F2] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">Build Your Career Roadmap Today.</h2>
                <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto mb-6">
                  Join thousands of college students and fresh graduates in Madhya Pradesh unlocking their potential with CareerPath AI.
                </p>
                <button 
                  onClick={() => setActiveTab('onboarding')}
                  className="bg-white text-[#6675D9] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-2xl text-base shadow-md transition"
                >
                  Start Career Profiling
                </button>
              </div>
            </section>
          </div>
        )}

        {}
        {activeTab === 'onboarding' && (
          <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#26304E]">Student Onboarding Wizard</h2>
                  <p className="text-xs text-slate-500">Step {onboardingStep} of 5: Profile Initialization</p>
                </div>
                <span className="text-xs font-bold text-[#6675D9] bg-[#E9E4FA] px-3 py-1 rounded-full">
                  AI Career Setup
                </span>
              </div>

              {/* Wizard Steps Content */}
              {onboardingStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-700">Personal Information</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={onboardingForm.name} 
                      onChange={e => setOnboardingForm({...onboardingForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={onboardingForm.email} 
                      onChange={e => setOnboardingForm({...onboardingForm, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-700">Education Details</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">College / University</label>
                    <input 
                      type="text" 
                      value={onboardingForm.college} 
                      onChange={e => setOnboardingForm({...onboardingForm, college: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Degree / Branch</label>
                      <input 
                        type="text" 
                        value={onboardingForm.degree} 
                        onChange={e => setOnboardingForm({...onboardingForm, degree: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Graduation Year</label>
                      <input 
                        type="text" 
                        value={onboardingForm.gradYear} 
                        onChange={e => setOnboardingForm({...onboardingForm, gradYear: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-700">Technical & Soft Skills</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Skills (Comma Separated)</label>
                    <textarea 
                      rows={3}
                      value={onboardingForm.skillsInput} 
                      onChange={e => setOnboardingForm({...onboardingForm, skillsInput: e.target.value})}
                      placeholder="e.g. JavaScript, Python, SQL, React, Communication"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]" 
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-700">Career Goals & Target Role</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Desired Primary Role</label>
                    <select 
                      value={onboardingForm.targetRole}
                      onChange={e => setOnboardingForm({...onboardingForm, targetRole: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6675D9]"
                    >
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Software Engineer (SDE)">Software Engineer (SDE)</option>
                      <option value="Data Analyst">Data Analyst</option>
                      <option value="AI/ML Engineer">AI/ML Engineer</option>
                      <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    </select>
                  </div>
                </div>
              )}

              {onboardingStep === 5 && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#E9E4FA] text-[#6675D9] flex items-center justify-center mx-auto mb-2">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#26304E]">Ready for AI Analysis!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Clicking below will process your academic credentials, skill metrics, and interests through our Career Matching Engine.
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-100">
                {onboardingStep > 1 ? (
                  <button 
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    Back
                  </button>
                ) : <div></div>}

                {onboardingStep < 5 ? (
                  <button 
                    onClick={() => setOnboardingStep(onboardingStep + 1)}
                    className="px-6 py-2.5 bg-[#6675D9] hover:bg-[#5260c2] text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Next Step
                  </button>
                ) : (
                  <button 
                    onClick={handleFinishOnboarding}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
                  >
                    <Sparkles size={14} /> Analyze My Career Profile
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-white via-[#E9E4FA]/30 to-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#26304E]">
                  Good morning, {user.name} 👋
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Target Career: <span className="font-bold text-[#6675D9]">{user.targetRole}</span> • {user.college}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('interview')}
                  className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <Video size={14} /> Start AI Mock Interview
                </button>
              </div>
            </div>

            {/* Top Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Career Match Score</span>
                  <Target size={18} className="text-[#6675D9]" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-[#26304E]">{user.careerMatchScore}%</span>
                  <span className="text-xs font-bold text-emerald-600">High Fit</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Target: {user.targetRole}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Readiness Index</span>
                  <Award size={18} className="text-emerald-500" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-[#26304E]">{user.readinessScore}%</span>
                  <span className="text-xs font-bold text-slate-500">Top 15% in college</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[82%]"></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Courses & Skills</span>
                  <BookOpen size={18} className="text-amber-500" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-[#26304E]">{user.completedCoursesCount}</span>
                  <span className="text-xs text-slate-500">Completed</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">2 Skill gaps remaining</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Opportunities</span>
                  <Briefcase size={18} className="text-indigo-500" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-[#26304E]">26</span>
                  <span className="text-xs font-bold text-indigo-600">Matching</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">12 Jobs, 8 Internships, 6 Govt</p>
              </div>

            </div>

            {/* Middle Section: Skill Gap & Quick Recommended Actions */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Skill Visualizer Chart */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-extrabold text-base text-[#26304E]">Skill Level vs Target Profile</h3>
                    <p className="text-xs text-slate-400">Visual mapping for {user.targetRole}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('skill-gap')}
                    className="text-xs font-bold text-[#6675D9] hover:underline"
                  >
                    View Details →
                  </button>
                </div>

                <div className="space-y-4">
                  {user.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{skill.name}</span>
                        <div className="flex gap-2">
                          <span className="text-slate-500">Current: {skill.level}%</span>
                          <span className="text-slate-400">| Target: {skill.target}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                        <div 
                          className={`h-full rounded-full ${skill.level < 40 ? 'bg-rose-400' : 'bg-[#6675D9]'}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommended Quick Action Cards */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-[#26304E]">Priority Recommended Actions</h3>
                
                {[
                  { title: "Complete AWS Cloud Practitioner", category: "Course", tag: "High Priority", bg: "bg-[#DCEEF9]", action: () => setActiveTab('courses') },
                  { title: "Build System Design Practical Project", category: "Project", tag: "Skill Gap", bg: "bg-[#E9E4FA]", action: () => setActiveTab('skill-gap') },
                  { title: "Apply for TCS Innovation Internship", category: "Apply", tag: "95% Match", bg: "bg-[#DDF4E8]", action: () => setActiveTab('jobs') },
                  { title: "Run 10-min Software Dev Mock Interview", category: "Practice", tag: "Interview", bg: "bg-[#FFE9D9]", action: () => setActiveTab('interview') }
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl ${act.bg} flex items-center justify-center text-[#6675D9]`}>
                        <Zap size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#26304E]">{act.title}</h4>
                        <span className="text-[10px] text-slate-400">{act.category} • {act.tag}</span>
                      </div>
                    </div>
                    <button 
                      onClick={act.action}
                      className="text-xs font-bold text-[#6675D9] hover:bg-[#E9E4FA] px-2.5 py-1 rounded-lg transition"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {}
        {activeTab === 'career-match' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-extrabold text-[#26304E]">Find Your Best-Fit Career</h1>
              <p className="text-xs text-slate-500 mt-1">AI Recommendation Engine evaluating skills, academic discipline, and project experience.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {CAREER_PROFILES_DATABASE.map((profile, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#6675D9] bg-[#E9E4FA] px-2.5 py-0.5 rounded-md">
                        {profile.trajectory}
                      </span>
                      <h3 className="font-extrabold text-lg text-[#26304E] mt-1">{profile.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-[#6675D9]">{profile.match}%</span>
                      <p className="text-[10px] text-slate-400 font-semibold">Match Index</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-[#F8FAFF] p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    <span className="font-bold text-[#26304E]">Why it matches: </span> {profile.reason}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">Missing Key Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.missing.map((m, idx) => (
                        <span key={idx} className="bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Est Salary: {profile.salary}</span>
                    <button 
                      onClick={() => setActiveTab('skill-gap')}
                      className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition"
                    >
                      View Roadmap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'skill-gap' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-[#26304E]">Your Skill Gap & Career Roadmap</h1>
                <p className="text-xs text-slate-500 mt-1">Target Role: {user.targetRole}</p>
              </div>
            </div>

            {/* Skill Comparison Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
              <h3 className="font-extrabold text-base text-[#26304E] mb-4">Competency Matrix</h3>
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase">
                    <th className="py-2.5 font-bold">Skill Name</th>
                    <th className="py-2.5 font-bold">Current Level</th>
                    <th className="py-2.5 font-bold">Required Level</th>
                    <th className="py-2.5 font-bold">Gap Status</th>
                    <th className="py-2.5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {user.skills.map((s, idx) => {
                    const isGap = s.level < s.target;
                    return (
                      <tr key={idx}>
                        <td className="py-3 font-bold text-[#26304E]">{s.name}</td>
                        <td className="py-3">{s.level}%</td>
                        <td className="py-3">{s.target}%</td>
                        <td className="py-3">
                          {isGap ? (
                            <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                              Gap: {s.target - s.level}%
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                              Target Met
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          {isGap && (
                            <button 
                              onClick={() => setActiveTab('courses')}
                              className="text-[#6675D9] hover:underline font-bold"
                            >
                              Find Course
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 6-Month Timeline Roadmap */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-[#26304E]">6-Month Career Roadmap</h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { month: "Month 1", title: "Core Fundamentals & Advanced JS", tasks: ["Master Async JS & ES6+", "Build 2 vanilla DOM projects"] },
                  { month: "Month 2", title: "React & State Management", tasks: ["Complete React Mastery Course", "Implement Redux / Context API"] },
                  { month: "Month 3", title: "Backend & SQL Databases", tasks: ["Learn Express.js & REST APIs", "Design relational SQL schemas"] },
                  { month: "Month 4", title: "Cloud & System Design Basics", tasks: ["AWS Cloud Practitioner study", "Understand caching & load balancers"] },
                  { month: "Month 5", title: "AI Resume & Portfolio Polish", tasks: ["Generate ATS Resume with AI", "Deploy portfolio on Vercel"] },
                  { month: "Month 6", title: "Mock Interviews & Job Applications", tasks: ["Complete 5 AI Mock Interviews", "Apply to 10+ Tech / Govt openings"] }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#F8FAFF] p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[10px] font-extrabold text-white bg-[#6675D9] px-2 py-0.5 rounded-md">
                      {item.month}
                    </span>
                    <h4 className="font-bold text-xs text-[#26304E]">{item.title}</h4>
                    <ul className="text-[11px] text-slate-500 space-y-1 pt-1">
                      {item.tasks.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'courses' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#26304E]">Upskill & Certifications</h1>
              <p className="text-xs text-slate-500 mt-1">Recommended courses tailored to bridge your skill gaps.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#E9E4FA] text-[#6675D9] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                        {course.category}
                      </span>
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                        <Star size={12} className="fill-amber-500" /> {course.rating}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-[#26304E] leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-400">Provider: {course.provider}</p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><Clock size={13} /> {course.duration}</span>
                      <span>• {course.level}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Verified Cert
                    </span>
                    <button 
                      onClick={() => showToast(`Enrolled in "${course.title}"! Course added to your dashboard.`)}
                      className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'jobs' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#26304E]">Jobs & Internships</h1>
              <p className="text-xs text-slate-500 mt-1">Live opportunities matching your AI profile.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#DDF4E8] text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {job.match}% Match
                      </span>
                      <span className="text-xs font-bold text-slate-500">{job.type}</span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-[#26304E]">{job.title}</h3>
                      <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                    </div>

                    <p className="text-xs font-bold text-[#6675D9]">{job.salary || job.stipend}</p>

                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((s, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => showToast(`Application submitted to ${job.company}!`)}
                    className="w-full mt-4 py-2 bg-[#6675D9] hover:bg-[#5260c2] text-white text-xs font-bold rounded-xl transition"
                  >
                    Quick Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'govt-jobs' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#26304E]">Government Career Opportunities</h1>
              <p className="text-xs text-slate-500 mt-1">Public sector recruitment & MPOnline competitive exams.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {govtJobs.map((govt) => (
                <div key={govt.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-[#DCEEF9] text-[#6675D9] text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {govt.status}
                      </span>
                      <h3 className="font-extrabold text-base text-[#26304E] mt-1">{govt.org}</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {govt.seats} Posts
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-700">Role: {govt.role}</p>

                  <div className="text-xs text-slate-500 space-y-1 bg-[#F8FAFF] p-3 rounded-2xl">
                    <p><span className="font-semibold text-slate-700">Qualification:</span> {govt.qualification}</p>
                    <p><span className="font-semibold text-slate-700">Eligibility:</span> {govt.eligibility}</p>
                    <p><span className="font-semibold text-slate-700">Exam Date:</span> {govt.examDate}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <a 
                      href={govt.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-bold text-[#6675D9] flex items-center gap-1 hover:underline"
                    >
                      Official Portal <ExternalLink size={12} />
                    </a>
                    <button 
                      onClick={() => showToast(`Redirecting to MPOnline Exam Portal for ${govt.org}`)}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                    >
                      Register Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'resume' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-[#26304E]">AI Resume Builder</h1>
                <p className="text-xs text-slate-500 mt-1">Split-screen live interactive ATS resume generator.</p>
              </div>
              <button 
                onClick={handleEnhanceResume}
                disabled={resumeEnhanceLoading}
                className="bg-gradient-to-r from-[#6675D9] to-[#8391F2] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition flex items-center gap-1.5"
              >
                <Sparkles size={14} /> {resumeEnhanceLoading ? "Enhancing..." : "✨ AI Polish & Enhance"}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Resume Form Inputs */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-700">Resume Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={resumeData.name} 
                    onChange={e => setResumeData({...resumeData, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#6675D9]" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Professional Summary</label>
                  <textarea 
                    rows={3}
                    value={resumeData.summary} 
                    onChange={e => setResumeData({...resumeData, summary: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#6675D9]" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Skills</label>
                  <input 
                    type="text" 
                    value={resumeData.skills} 
                    onChange={e => setResumeData({...resumeData, skills: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#6675D9]" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Key Projects</label>
                  <textarea 
                    rows={4}
                    value={resumeData.projects} 
                    onChange={e => setResumeData({...resumeData, projects: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#6675D9]" 
                  />
                </div>
              </div>

              {/* Resume Live Preview Card */}
              <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                <div className="space-y-4 font-mono text-xs">
                  <div className="border-b border-slate-800 pb-3">
                    <h2 className="text-lg font-bold text-emerald-400">{resumeData.name}</h2>
                    <p className="text-slate-400">{resumeData.email} • {resumeData.phone}</p>
                    <p className="text-slate-400">{resumeData.college} ({resumeData.degree})</p>
                  </div>

                  <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider mb-1">Professional Summary</h4>
                    <p className="text-slate-300 leading-relaxed">{resumeData.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider mb-1">Skills Matrix</h4>
                    <p className="text-slate-300">{resumeData.skills}</p>
                  </div>

                  <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider mb-1">Projects</h4>
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs">{resumeData.projects}</pre>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] text-slate-500">ATS Formatting Score: 94%</span>
                  <button 
                    onClick={() => showToast("Resume PDF downloaded successfully!")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1"
                  >
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'interview' && (
          <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-2xl font-extrabold text-[#26304E]">AI Mock Interview Room</h1>
              <p className="text-xs text-slate-500 mt-1">Simulated interview with instant scoring & feedback.</p>
            </div>

            {interviewState === 'setup' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#E9E4FA] text-[#6675D9] flex items-center justify-center mx-auto">
                  <Video size={32} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Job Role</label>
                    <select 
                      value={interviewRole}
                      onChange={e => setInterviewRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Data Analyst">Data Analyst</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Difficulty</label>
                    <select 
                      value={interviewDiff}
                      onChange={e => setInterviewDiff(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleStartInterview}
                  className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition"
                >
                  Start Practice Session
                </button>
              </div>
            )}

            {interviewState === 'active' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#6675D9] bg-[#E9E4FA] px-2.5 py-1 rounded-md">
                    Question {currentQuestionIdx + 1} of {interviewQuestionsList.length}
                  </span>
                  <span className="text-xs text-slate-400">Role: {interviewRole}</span>
                </div>

                <div className="bg-[#F8FAFF] p-4 rounded-2xl border border-slate-100">
                  <h3 className="font-extrabold text-base text-[#26304E]">
                    {interviewQuestionsList[currentQuestionIdx]}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Response</label>
                  <textarea 
                    rows={4}
                    value={userAnswerInput}
                    onChange={e => setUserAnswerInput(e.target.value)}
                    placeholder="Type or speak your structured answer here..."
                    className="w-full p-4 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#6675D9]"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleNextQuestion}
                    disabled={interviewLoading || !userAnswerInput.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                  >
                    {interviewLoading ? "Evaluating..." : "Submit Answer & Proceed"}
                  </button>
                </div>
              </div>
            )}

            {interviewState === 'completed' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#26304E]">Interview Session Completed!</h2>
                  <p className="text-xs text-slate-500 mt-1">Average Score: 82 / 100</p>
                </div>

                <div className="space-y-3 text-left">
                  {interviewAnswers.map((ans, i) => (
                    <div key={i} className="bg-[#F8FAFF] p-4 rounded-2xl border border-slate-100 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#26304E]">Q{i+1}: {ans.question}</span>
                        <span className="text-emerald-600 font-extrabold">{ans.score}/100</span>
                      </div>
                      <p className="text-[11px] text-slate-500"><span className="font-semibold text-slate-700">Strengths:</span> {ans.strengths}</p>
                      <p className="text-[11px] text-slate-500"><span className="font-semibold text-slate-700">Improvement:</span> {ans.improvement}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setInterviewState('setup')}
                  className="bg-[#6675D9] hover:bg-[#5260c2] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                >
                  Try Another Role
                </button>
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'progress' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <h1 className="text-2xl font-extrabold text-[#26304E]">Progress Tracking & Employability Analytics</h1>
              <p className="text-xs text-slate-500 mt-1">Overall career growth telemetry.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Skills Verified</span>
                <p className="text-3xl font-extrabold text-[#26304E]">5 / 7</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6675D9] h-full w-[70%]"></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Applications Sent</span>
                <p className="text-3xl font-extrabold text-[#26304E]">{user.appliedJobsCount}</p>
                <p className="text-xs text-emerald-600 font-bold">2 Interviews Scheduled</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Avg Interview Score</span>
                <p className="text-3xl font-extrabold text-[#26304E]">{user.avgInterviewScore}%</p>
                <p className="text-xs text-slate-500 font-semibold">Above average</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-[#26304E]">Admin Control Panel</h1>
                <p className="text-xs text-slate-500 mt-1">Platform management simulator for recruiters & counselors.</p>
              </div>
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                Role: Admin / Recruiter
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#26304E]">Manage Government & Corporate Job Postings</h3>
              <div className="space-y-2">
                {jobs.map((j) => (
                  <div key={j.id} className="flex justify-between items-center p-3 rounded-2xl bg-[#F8FAFF] border border-slate-100 text-xs font-semibold">
                    <span>{j.title} — {j.company}</span>
                    <button 
                      onClick={() => {
                        setJobs(jobs.filter(item => item.id !== j.id));
                        showToast("Job posting removed!");
                      }}
                      className="text-rose-500 hover:text-rose-700 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'architecture' && (
          <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#26304E]">Database Schema & Architecture</h1>
              <p className="text-xs text-slate-500 mt-1">Technical specifications for hackathon judges.</p>
            </div>

            <div className="bg-slate-900 text-slate-200 p-6 rounded-3xl font-mono text-xs space-y-4 shadow-xl">
              <h3 className="text-emerald-400 font-bold text-sm">// PostgreSQL Table Definitions</h3>
              <pre className="overflow-x-auto text-slate-300">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  college VARCHAR(255),
  degree VARCHAR(255),
  grad_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  skill_name VARCHAR(100),
  current_level INT,
  target_level INT
);

CREATE TABLE career_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  career_title VARCHAR(255),
  match_percentage INT,
  missing_skills TEXT[]
);`}
              </pre>

              <h3 className="text-emerald-400 font-bold text-sm pt-2">// Key Server API Routes</h3>
              <div className="space-y-1 text-slate-300">
                <p><span className="text-amber-400 font-bold">POST</span> /api/ai/career-recommendation</p>
                <p><span className="text-amber-400 font-bold">POST</span> /api/ai/skill-gap</p>
                <p><span className="text-amber-400 font-bold">POST</span> /api/ai/interview</p>
                <p><span className="text-amber-400 font-bold">GET</span> /api/government-jobs</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      <div className="fixed bottom-5 right-5 z-40">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-[#6675D9] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group"
          >
            <MessageSquare size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[480px]">
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-[#6675D9] to-[#8391F2] p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles size={18} />
                <div>
                  <h4 className="font-bold text-sm">CareerPath AI Assistant</h4>
                  <span className="text-[10px] text-white/80">Online • Context Aware</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white hover:opacity-80">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#F8FAFF]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#6675D9] text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-2xs'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="text-slate-400 text-[10px] animate-pulse">AI Assistant is thinking...</div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 border-t border-slate-100 bg-white flex space-x-1.5 overflow-x-auto text-[10px] scrollbar-none">
              {[
                "Which career suits me?", "How to bridge Cloud gap?", "Prepare for interview"
              ].map((chip, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSendChatMessage(chip)}
                  className="bg-slate-100 hover:bg-[#E9E4FA] hover:text-[#6675D9] text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Ask about careers, skills, jobs..." 
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#6675D9]"
              />
              <button 
                onClick={() => handleSendChatMessage()}
                className="w-8 h-8 rounded-xl bg-[#6675D9] text-white flex items-center justify-center hover:bg-[#5260c2] transition"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <Sparkles size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 CareerPath AI — MPOnline Hackathon Prototype. Built for MP College Students.</p>
          <div className="flex space-x-4">
            <button onClick={() => setActiveTab('landing')} className="hover:underline">Home</button>
            <button onClick={() => setActiveTab('architecture')} className="hover:underline">System Architecture</button>
            <button onClick={() => setActiveTab('admin')} className="hover:underline">Admin Mode</button>
          </div>
        </div>
      </footer>

    </div>
  );
}