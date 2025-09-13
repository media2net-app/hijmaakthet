'use client';

import { useState } from 'react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface Appointment {
  id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  type: 'plaatsing' | 'onderhoud' | 'inspectie' | 'overleg';
  status: 'gepland' | 'bevestigd' | 'uitgevoerd' | 'geannuleerd';
  projectId?: string;
}

export default function PlanningPage() {
  // Animated counters
  const totalAppointments = useAnimatedCounter(12, 1500);
  const confirmedAppointments = useAnimatedCounter(8, 2000);
  const pendingAppointments = useAnimatedCounter(4, 1800);

  const [appointments] = useState<Appointment[]>([
    {
      id: 'APT-001',
      title: 'Plaatsing Schuifdeur',
      client: 'Jan de Vries',
      location: 'Amsterdam Centrum',
      date: '2024-01-15',
      time: '09:00',
      duration: 4,
      type: 'plaatsing',
      status: 'bevestigd',
      projectId: 'HMT-2024-001'
    },
    {
      id: 'APT-002',
      title: 'Onderhoud Taatsdeur',
      client: 'Maria Jansen',
      location: 'Utrecht Oost',
      date: '2024-01-16',
      time: '14:00',
      duration: 2,
      type: 'onderhoud',
      status: 'gepland',
      projectId: 'HMT-2024-002'
    },
    {
      id: 'APT-003',
      title: 'Inspectie Nieuwe Installatie',
      client: 'Piet Bakker',
      location: 'Den Haag Zuid',
      date: '2024-01-17',
      time: '10:30',
      duration: 1,
      type: 'inspectie',
      status: 'bevestigd',
      projectId: 'HMT-2024-003'
    },
    {
      id: 'APT-004',
      title: 'Overleg Project Details',
      client: 'Lisa van der Berg',
      location: 'Rotterdam Centrum',
      date: '2024-01-18',
      time: '15:00',
      duration: 1,
      type: 'overleg',
      status: 'gepland'
    },
    {
      id: 'APT-005',
      title: 'Plaatsing Nieuwe Deur',
      client: 'Tom de Wit',
      location: 'Eindhoven Noord',
      date: '2024-01-19',
      time: '08:00',
      duration: 6,
      type: 'plaatsing',
      status: 'bevestigd',
      projectId: 'HMT-2024-004'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'plaatsing':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h2m2-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6l-4 4V8a2 2 0 012-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bevestigd': return 'bg-green-600';
      case 'gepland': return 'bg-blue-600';
      case 'uitgevoerd': return 'bg-gray-600';
      case 'geannuleerd': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plaatsing': return 'text-blue-400';
      case 'onderhoud': return 'text-yellow-400';
      case 'inspectie': return 'text-green-400';
      case 'overleg': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center p-1 border border-gray-600">
              <img 
                src="/svg/hij-maakt-het.svg" 
                alt="Hij Maakt Het Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="ml-3 text-white font-bold text-lg">Hij Maakt Het</span>
          </div>
        </div>

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="ml-3">Projecten</span>
              </a>
            </li>
            <li>
              <a
                href="/planning"
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="ml-3">Trello Sync</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Planning</h1>
            <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Nieuwe Afspraak
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover-lift animate-fade-in-up">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Totaal Afspraken</p>
                  <p className="text-2xl font-semibold text-white">{totalAppointments}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover-lift animate-fade-in-up">
              <div className="flex items-center">
                <div className="p-2 bg-green-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Bevestigd</p>
                  <p className="text-2xl font-semibold text-white">{confirmedAppointments}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover-lift animate-fade-in-up">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">In Behandeling</p>
                  <p className="text-2xl font-semibold text-white">{pendingAppointments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 hover-lift animate-fade-in-up">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Eerstvolgende 5 Afspraken</h2>
              <p className="text-gray-400 mt-1">Overzicht van komende plaatsingen en afspraken</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Datum & Tijd
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Afspraak
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Klant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Locatie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Duur
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {appointments.slice(0, 5).map((appointment, index) => (
                    <tr key={appointment.id} className="hover:bg-gray-700 transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium">
                          {formatDate(appointment.date)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`mr-3 ${getTypeColor(appointment.type)}`}>
                            {getTypeIcon(appointment.type)}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">
                              {appointment.title}
                            </div>
                            {appointment.projectId && (
                              <div className="text-sm text-gray-400">
                                {appointment.projectId}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{appointment.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{appointment.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeColor(appointment.type)} bg-gray-700`}>
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{appointment.duration}u</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar Placeholder */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8 border border-gray-700 hover-lift animate-fade-in-up">
            <h3 className="text-lg font-semibold text-white mb-4">Kalender View</h3>
            <div className="bg-gray-700 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-lg">Kalender view komt binnenkort beschikbaar</p>
              <p className="text-gray-500 text-sm mt-2">Hier wordt een volledige kalender weergave geïmplementeerd</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
