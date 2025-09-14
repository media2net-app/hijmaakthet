'use client';

import { useState } from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Appointment {
  id: string;
  client: string;
  type: 'installatie' | 'onderhoud' | 'inspectie' | 'overleg';
  date: Date;
  time: string;
  duration: number;
  location: string;
  status: 'bevestigd' | 'in_behandeling' | 'wachtend' | 'voltooid';
  description: string;
  contact: string;
  phone: string;
}

export default function PlanningPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state

  // Animated counters
  const totalAppointments = useAnimatedCounter(47);
  const confirmedAppointments = useAnimatedCounter(32);
  const pendingAppointments = useAnimatedCounter(15);

  // September 2025 appointments data
  const appointments: Appointment[] = [
    {
      id: 'APT-2025-001',
      client: 'Bouwbedrijf Amsterdam',
      type: 'installatie',
      date: new Date(2025, 8, 3), // 3 september
      time: '09:00',
      duration: 4,
      location: 'Amsterdam Centrum',
      status: 'bevestigd',
      description: 'Installatie schuifdeur kantoorgebouw',
      contact: 'Jan de Vries',
      phone: '06-12345678'
    },
    {
      id: 'APT-2025-002',
      client: 'Architectenbureau Rotterdam',
      type: 'overleg',
      date: new Date(2025, 8, 5), // 5 september
      time: '14:00',
      duration: 2,
      location: 'Rotterdam Zuid',
      status: 'bevestigd',
      description: 'Overleg nieuwe project specificaties',
      contact: 'Maria van der Berg',
      phone: '06-87654321'
    },
    {
      id: 'APT-2025-003',
      client: 'Projectontwikkelaar Utrecht',
      type: 'inspectie',
      date: new Date(2025, 8, 8), // 8 september
      time: '10:30',
      duration: 3,
      location: 'Utrecht Leidsche Rijn',
      status: 'in_behandeling',
      description: 'Inspectie bestaande installaties',
      contact: 'Peter Jansen',
      phone: '06-11223344'
    },
    {
      id: 'APT-2025-004',
      client: 'Aannemer Den Haag',
      type: 'onderhoud',
      date: new Date(2025, 8, 12), // 12 september
      time: '08:00',
      duration: 6,
      location: 'Den Haag Centrum',
      status: 'bevestigd',
      description: 'Onderhoud en reparatie taatsdeuren',
      contact: 'Lisa Bakker',
      phone: '06-55667788'
    },
    {
      id: 'APT-2025-005',
      client: 'Bouwbedrijf Amsterdam',
      type: 'installatie',
      date: new Date(2025, 8, 15), // 15 september
      time: '13:00',
      duration: 5,
      location: 'Amsterdam Noord',
      status: 'wachtend',
      description: 'Installatie nieuwe schuifdeur systeem',
      contact: 'Jan de Vries',
      phone: '06-12345678'
    },
    {
      id: 'APT-2025-006',
      client: 'Architectenbureau Rotterdam',
      type: 'overleg',
      date: new Date(2025, 8, 18), // 18 september
      time: '11:00',
      duration: 2,
      location: 'Rotterdam Centrum',
      status: 'bevestigd',
      description: 'Presentatie nieuwe productlijn',
      contact: 'Maria van der Berg',
      phone: '06-87654321'
    },
    {
      id: 'APT-2025-007',
      client: 'Projectontwikkelaar Utrecht',
      type: 'installatie',
      date: new Date(2025, 8, 22), // 22 september
      time: '09:30',
      duration: 4,
      location: 'Utrecht Centrum',
      status: 'in_behandeling',
      description: 'Installatie complete deur set',
      contact: 'Peter Jansen',
      phone: '06-11223344'
    },
    {
      id: 'APT-2025-008',
      client: 'Aannemer Den Haag',
      type: 'inspectie',
      date: new Date(2025, 8, 25), // 25 september
      time: '15:00',
      duration: 2,
      location: 'Den Haag Zuid',
      status: 'bevestigd',
      description: 'Kwaliteitscontrole na installatie',
      contact: 'Lisa Bakker',
      phone: '06-55667788'
    },
    {
      id: 'APT-2025-009',
      client: 'Bouwbedrijf Amsterdam',
      type: 'onderhoud',
      date: new Date(2025, 8, 28), // 28 september
      time: '07:30',
      duration: 3,
      location: 'Amsterdam Zuid',
      status: 'wachtend',
      description: 'Preventief onderhoud schuifdeuren',
      contact: 'Jan de Vries',
      phone: '06-12345678'
    },
    {
      id: 'APT-2025-010',
      client: 'Architectenbureau Rotterdam',
      type: 'installatie',
      date: new Date(2025, 8, 30), // 30 september
      time: '12:00',
      duration: 6,
      location: 'Rotterdam Noord',
      status: 'bevestigd',
      description: 'Installatie premium deur systeem',
      contact: 'Maria van der Berg',
      phone: '06-87654321'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'installatie':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'onderhoud':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'inspectie':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 'overleg':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bevestigd':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_behandeling':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'wachtend':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'voltooid':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'installatie':
        return 'text-blue-400';
      case 'onderhoud':
        return 'text-orange-400';
      case 'inspectie':
        return 'text-purple-400';
      case 'overleg':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  const next5Appointments = appointments
    .filter(apt => apt.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

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
        w-64 bg-black flex flex-col border-r border-gray-800
        fixed lg:relative z-50 h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300
      `}>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                <span className="ml-3">Dashboard</span>
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
                <span className="ml-3">Projecten</span>
              </a>
            </li>
            <li>
              <a
                href="/planning"
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="ml-3">Planning</span>
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
                <span className="ml-3">QR Scanner</span>
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
                <span className="ml-3">Werkstations</span>
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
                <span className="ml-3">Trello Sync</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-center">
            <img 
              src="/SVG/hij-maakt-het.svg" 
              alt="Hij Maakt Het" 
              className="h-16 w-full object-contain"
            />
          </div>
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
                <h1 className="text-xl lg:text-2xl font-bold text-white">Planning - September 2025</h1>
                <p className="text-sm lg:text-base text-gray-400 hidden sm:block">Beheer je afspraken en planning</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setView('table')}
                  className={`px-2 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                    view === 'table' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">Tabel</span>
                  <span className="sm:hidden">📋</span>
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`px-2 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                    view === 'calendar' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">Kalender</span>
                  <span className="sm:hidden">📅</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Totaal Afspraken</p>
                  <p className="text-3xl font-bold text-white">{totalAppointments}</p>
                  <p className="text-sm text-blue-400">September 2025</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Bevestigd</p>
                  <p className="text-3xl font-bold text-white">{confirmedAppointments}</p>
                  <p className="text-sm text-green-400">68% van totaal</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">In Behandeling</p>
                  <p className="text-3xl font-bold text-white">{pendingAppointments}</p>
                  <p className="text-sm text-yellow-400">32% van totaal</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-full">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle Content */}
          {view === 'table' ? (
            /* Table View */
            <div className="bg-black rounded-lg border border-gray-800 hover-lift animate-fade-in-up">
              <div className="px-4 lg:px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Volgende 5 Afspraken</h3>
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Datum & Tijd</th>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Klant</th>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Locatie</th>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black divide-y divide-gray-800">
                    {next5Appointments.map((appointment, index) => (
                      <tr key={appointment.id} className="hover:bg-gray-800/50 transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatDate(appointment.date)}</div>
                          <div className="text-sm text-gray-400">{appointment.time} ({appointment.duration}u)</div>
                          <div className="text-sm font-medium text-white sm:hidden mt-1">{appointment.client}</div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm font-medium text-white">{appointment.client}</div>
                          <div className="text-sm text-gray-400">{appointment.description}</div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`mr-2 ${getTypeColor(appointment.type)}`}>
                              {getTypeIcon(appointment.type)}
                            </span>
                            <span className="text-sm text-white capitalize">{appointment.type}</span>
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden md:table-cell">
                          {appointment.location}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-white">{appointment.contact}</div>
                          <div className="text-sm text-gray-400">{appointment.phone}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Calendar View */
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2">
                <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-white mb-4">Kalender - September 2025</h3>
                  <div className="calendar-container">
                    <Calendar
                      onChange={(value) => setSelectedDate(value as Date)}
                      value={selectedDate}
                      className="react-calendar"
                      tileContent={({ date }) => {
                        const dayAppointments = getAppointmentsForDate(date);
                        return dayAppointments.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {dayAppointments.slice(0, 2).map((apt, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  apt.type === 'installatie' ? 'bg-blue-500' :
                                  apt.type === 'onderhoud' ? 'bg-orange-500' :
                                  apt.type === 'inspectie' ? 'bg-purple-500' : 'bg-green-500'
                                }`}
                                title={`${apt.time} - ${apt.client}`}
                              />
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="w-2 h-2 rounded-full bg-gray-500" title={`+${dayAppointments.length - 2} meer`} />
                            )}
                          </div>
                        ) : null;
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Afspraken - {formatDate(selectedDate)}
                  </h3>
                  <div className="space-y-3">
                    {getAppointmentsForDate(selectedDate).length > 0 ? (
                      getAppointmentsForDate(selectedDate).map((appointment) => (
                        <div key={appointment.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className={`mr-2 ${getTypeColor(appointment.type)}`}>
                                {getTypeIcon(appointment.type)}
                              </span>
                              <span className="text-sm font-medium text-white">{appointment.time}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(appointment.status)}`}>
                              {appointment.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-white font-medium">{appointment.client}</div>
                          <div className="text-xs text-gray-400">{appointment.description}</div>
                          <div className="text-xs text-gray-400 mt-1">{appointment.location}</div>
                          <div className="text-xs text-gray-400">{appointment.contact} - {appointment.phone}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400">Geen afspraken op deze datum</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        .react-calendar {
          background: #000000;
          border: 1px solid #374151;
          border-radius: 8px;
          color: #F9FAFB;
          font-family: inherit;
        }
        
        .react-calendar__navigation {
          background: #1F2937;
          border-bottom: 1px solid #374151;
        }
        
        .react-calendar__navigation button {
          color: #F9FAFB;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 600;
        }
        
        .react-calendar__navigation button:hover {
          background: #374151;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: #374151;
        }
        
        .react-calendar__month-view__weekdays {
          background: #111827;
          border-bottom: 1px solid #374151;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          color: #9CA3AF;
          font-weight: 600;
          padding: 8px;
        }
        
        .react-calendar__tile {
          background: #000000;
          border: 1px solid #374151;
          color: #F9FAFB;
          padding: 8px;
        }
        
        .react-calendar__tile:hover {
          background: #1F2937;
        }
        
        .react-calendar__tile--active {
          background: #3B82F6;
          color: #FFFFFF;
        }
        
        .react-calendar__tile--active:hover {
          background: #2563EB;
        }
        
        .react-calendar__tile--now {
          background: #1F2937;
          color: #F9FAFB;
        }
        
        .react-calendar__tile--now:hover {
          background: #374151;
        }
      `}</style>
    </div>
  );
}