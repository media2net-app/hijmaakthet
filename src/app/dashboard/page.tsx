'use client';

import { useState, useEffect } from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useModal } from '@/contexts/ModalContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [currentTime, setCurrentTime] = useState(new Date());
  const { openModal } = useModal();

  // Animated counters
  const totalUsers = useAnimatedCounter(127);
  const totalProjects = useAnimatedCounter(89);
  const monthlyRevenue = useAnimatedCounter(245000);
  const efficiency = useAnimatedCounter(94);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 180000, orders: 45 },
    { month: 'Feb', revenue: 220000, orders: 52 },
    { month: 'Mar', revenue: 195000, orders: 48 },
    { month: 'Apr', revenue: 245000, orders: 61 },
    { month: 'Mei', revenue: 280000, orders: 68 },
    { month: 'Jun', revenue: 265000, orders: 64 }
  ];

  const projectStatusData = [
    { name: 'Voltooid', value: 45, color: '#10B981' },
    { name: 'In Productie', value: 23, color: '#3B82F6' },
    { name: 'Wachtend', value: 12, color: '#F59E0B' },
    { name: 'Geannuleerd', value: 3, color: '#EF4444' }
  ];

  const workstationData = [
    { name: 'Lasafdeling', efficiency: 95, capacity: 88, orders: 24 },
    { name: 'Montage', efficiency: 92, capacity: 76, orders: 18 },
    { name: 'Afwerking', efficiency: 89, capacity: 82, orders: 21 },
    { name: 'Kwaliteit', efficiency: 98, capacity: 90, orders: 15 },
    { name: 'Verpakking', efficiency: 94, capacity: 85, orders: 19 }
  ];

  const recentActivity = [
    { id: 1, type: 'order', message: 'Nieuwe order HMT-2024-089 ontvangen', time: '2 min geleden', status: 'success' },
    { id: 2, type: 'production', message: 'Project HMT-2024-075 voltooid in Lasafdeling', time: '15 min geleden', status: 'info' },
    { id: 3, type: 'quality', message: 'Kwaliteitscontrole HMT-2024-071 goedgekeurd', time: '32 min geleden', status: 'success' },
    { id: 4, type: 'delivery', message: 'Levering HMT-2024-068 verzonden', time: '1 uur geleden', status: 'info' },
    { id: 5, type: 'alert', message: 'Onderhoud Lasafdeling gepland voor morgen', time: '2 uur geleden', status: 'warning' }
  ];

  // Mock data for modals
  const usersData = [
    { id: 1, name: 'Jan de Vries', role: 'Project Manager', lastActive: '2 min geleden', status: 'online' },
    { id: 2, name: 'Maria van der Berg', role: 'Productie Leider', lastActive: '15 min geleden', status: 'online' },
    { id: 3, name: 'Peter Jansen', role: 'Kwaliteitscontrole', lastActive: '1 uur geleden', status: 'away' },
    { id: 4, name: 'Lisa de Wit', role: 'Administratie', lastActive: '2 uur geleden', status: 'offline' },
    { id: 5, name: 'Tom Bakker', role: 'Lasser', lastActive: '3 uur geleden', status: 'offline' }
  ];

  const projectsData = [
    { id: 'HMT-2024-001', name: 'Schuifdeur Woning Amsterdam', client: 'Jan de Vries', status: 'in-productie', progress: 75 },
    { id: 'HMT-2024-002', name: 'Taatsdeur Kantoor Rotterdam', client: 'ABC Bedrijven BV', status: 'nieuw', progress: 10 },
    { id: 'HMT-2024-003', name: 'Stalen Hekwerk Villa', client: 'Maria van der Berg', status: 'klaar', progress: 100 },
    { id: 'HMT-2024-004', name: 'Schuifdeur Woning Utrecht', client: 'Peter Jansen', status: 'in-productie', progress: 45 },
    { id: 'HMT-2024-005', name: 'Taatsdeur Woning Den Haag', client: 'Lisa de Wit', status: 'wachtend', progress: 0 }
  ];

  const revenueDataDetailed = [
    { month: 'Januari', revenue: 180000, orders: 45, clients: 12 },
    { month: 'Februari', revenue: 220000, orders: 52, clients: 15 },
    { month: 'Maart', revenue: 195000, orders: 48, clients: 13 },
    { month: 'April', revenue: 245000, orders: 61, clients: 18 },
    { month: 'Mei', revenue: 280000, orders: 68, clients: 20 },
    { month: 'Juni', revenue: 265000, orders: 64, clients: 19 }
  ];

  const efficiencyData = [
    { workstation: 'Lasafdeling', efficiency: 95, capacity: 88, orders: 24, avgTime: '2.5u' },
    { workstation: 'Montage', efficiency: 92, capacity: 76, orders: 18, avgTime: '3.2u' },
    { workstation: 'Afwerking', efficiency: 89, capacity: 82, orders: 21, avgTime: '1.8u' },
    { workstation: 'Kwaliteit', efficiency: 98, capacity: 90, orders: 15, avgTime: '0.5u' },
    { workstation: 'Verpakking', efficiency: 94, capacity: 85, orders: 19, avgTime: '0.3u' }
  ];

  // Modal handlers
  const openUsersModal = () => {
    openModal({
      title: 'Gebruikers Overzicht',
      size: 'lg',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {usersData.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    user.status === 'online' ? 'bg-green-500' :
                    user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.role}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">{user.lastActive}</div>
              </div>
            ))}
          </div>
        </div>
      )
    });
  };

  const openProjectsModal = () => {
    openModal({
      title: 'Projecten Overzicht',
      size: 'xl',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {projectsData.map((project) => (
              <div key={project.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{project.id}</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'klaar' ? 'bg-green-600' :
                    project.status === 'in-productie' ? 'bg-blue-600' :
                    project.status === 'nieuw' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="text-gray-300 mb-2">{project.name}</div>
                <div className="text-gray-400 text-sm mb-3">Klant: {project.client}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-gray-400 text-xs mt-1">{project.progress}% voltooid</div>
              </div>
            ))}
          </div>
        </div>
      )
    });
  };

  const openRevenueModal = () => {
    openModal({
      title: 'Omzet Details',
      size: 'xl',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Maandelijkse Omzet</h4>
              <div className="space-y-3">
                {revenueDataDetailed.map((month) => (
                  <div key={month.month} className="flex justify-between items-center">
                    <span className="text-gray-300">{month.month}</span>
                    <span className="text-white font-medium">€{month.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Top Klanten</h4>
              <div className="space-y-3">
                {topClients.map((client) => (
                  <div key={client.name} className="flex justify-between items-center">
                    <span className="text-gray-300">{client.name}</span>
                    <span className="text-white font-medium">€{client.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    });
  };

  const openEfficiencyModal = () => {
    openModal({
      title: 'Efficiency Details',
      size: 'lg',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {efficiencyData.map((ws) => (
              <div key={ws.workstation} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-medium">{ws.workstation}</div>
                  <div className="text-green-400 font-medium">{ws.efficiency}%</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Capaciteit</div>
                    <div className="text-white">{ws.capacity}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Orders</div>
                    <div className="text-white">{ws.orders}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Gem. Tijd</div>
                    <div className="text-white">{ws.avgTime}</div>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${ws.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    });
  };

  const topClients = [
    { name: 'Bouwbedrijf Amsterdam', orders: 12, revenue: 45000, status: 'active' },
    { name: 'Architectenbureau Rotterdam', orders: 8, revenue: 32000, status: 'active' },
    { name: 'Projectontwikkelaar Utrecht', orders: 6, revenue: 28000, status: 'pending' },
    { name: 'Aannemer Den Haag', orders: 5, revenue: 22000, status: 'active' }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-64' : 'w-16'} 
        bg-black transition-all duration-300 flex flex-col border-r border-gray-800
        fixed lg:relative z-50 h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <img 
              src="/SVG/hij-maakt-het.svg" 
              alt="Hij Maakt Het" 
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a
                href="/projecten"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {sidebarOpen && <span className="ml-3">Projecten</span>}
              </a>
            </li>
            <li>
              <a
                href="/planning"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {sidebarOpen && <span className="ml-3">Planning</span>}
              </a>
            </li>
            <li>
              <a
                href="/qr-scanner"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {sidebarOpen && <span className="ml-3">QR Scanner</span>}
              </a>
            </li>
            <li>
              <a
                href="/werkstations"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                {sidebarOpen && <span className="ml-3">Werkstations</span>}
              </a>
            </li>
            <li>
              <a
                href="/trello-sync"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {sidebarOpen && <span className="ml-3">Trello Sync</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black border-b border-gray-800 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">Dashboard 2.0</h1>
                <p className="text-sm lg:text-base text-gray-400 hidden sm:block">Welkom terug! Hier is een overzicht van je bedrijf.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-400">Live tijd</p>
                <p className="text-lg font-mono text-white">
                  {currentTime.toLocaleTimeString('nl-NL')}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <button 
              onClick={openUsersModal}
              className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up w-full text-left transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Totaal Gebruikers</p>
                  <p className="text-3xl font-bold text-white">{totalUsers}</p>
                  <p className="text-sm text-green-400">+12% deze maand</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </button>

            <button 
              onClick={openProjectsModal}
              className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up w-full text-left transition-all duration-200 hover:border-green-500/50 hover:bg-gray-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Actieve Projecten</p>
                  <p className="text-3xl font-bold text-white">{totalProjects}</p>
                  <p className="text-sm text-blue-400">+8% deze week</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </button>

            <button 
              onClick={openRevenueModal}
              className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up w-full text-left transition-all duration-200 hover:border-yellow-500/50 hover:bg-gray-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Maandelijkse Omzet</p>
                  <p className="text-3xl font-bold text-white">€{monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-400">+15% vs vorige maand</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-full">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </button>

            <button 
              onClick={openEfficiencyModal}
              className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up w-full text-left transition-all duration-200 hover:border-purple-500/50 hover:bg-gray-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Efficiëntie Score</p>
                  <p className="text-3xl font-bold text-white">{efficiency}%</p>
                  <p className="text-sm text-green-400">+3% deze week</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Revenue Chart */}
            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <h3 className="text-lg font-semibold text-white mb-4">Omzet Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Project Status Pie Chart */}
            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Workstation Performance */}
          <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
            <h3 className="text-lg font-semibold text-white mb-4">Werkstation Prestaties</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workstationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="efficiency" fill="#10B981" name="Efficiëntie %" />
                <Bar dataKey="capacity" fill="#3B82F6" name="Capaciteit %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Recent Activity */}
            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <h3 className="text-lg font-semibold text-white mb-4">Recente Activiteit</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Clients */}
            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <h3 className="text-lg font-semibold text-white mb-4">Top Klanten</h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{client.name}</p>
                      <p className="text-xs text-gray-400">{client.orders} orders • €{client.revenue.toLocaleString()}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      client.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {client.status === 'active' ? 'Actief' : 'Wachtend'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}