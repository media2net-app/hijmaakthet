'use client';

import { useState } from 'react';

interface Workstation {
  id: string;
  name: string;
  description: string;
  currentProjects: number;
  capacity: number;
  status: 'actief' | 'onderhoud' | 'inactief';
  nextWorkstation?: string;
  icon: string;
}

export default function WerkstationsPage() {
  const [workstations] = useState<Workstation[]>([
    {
      id: 'ontvangst',
      name: 'Ontvangst',
      description: 'Nieuwe orders ontvangen en registreren',
      currentProjects: 2,
      capacity: 10,
      status: 'actief',
      nextWorkstation: 'lasafdeling',
      icon: '📥'
    },
    {
      id: 'lasafdeling',
      name: 'Lasafdeling',
      description: 'Lassen en bewerken van staal',
      currentProjects: 5,
      capacity: 8,
      status: 'actief',
      nextWorkstation: 'montage',
      icon: '🔥'
    },
    {
      id: 'montage',
      name: 'Montage',
      description: 'Assembleren van onderdelen',
      currentProjects: 3,
      capacity: 6,
      status: 'actief',
      nextWorkstation: 'afwerking',
      icon: '🔧'
    },
    {
      id: 'afwerking',
      name: 'Afwerking',
      description: 'Schuren, schilderen en afwerken',
      currentProjects: 4,
      capacity: 5,
      status: 'actief',
      nextWorkstation: 'kwaliteitscontrole',
      icon: '🎨'
    },
    {
      id: 'kwaliteitscontrole',
      name: 'Kwaliteitscontrole',
      description: 'Controle en goedkeuring',
      currentProjects: 2,
      capacity: 4,
      status: 'actief',
      nextWorkstation: 'verpakking',
      icon: '✅'
    },
    {
      id: 'verpakking',
      name: 'Verpakking',
      description: 'Inpakken voor verzending',
      currentProjects: 1,
      capacity: 3,
      status: 'actief',
      nextWorkstation: 'geleverd',
      icon: '📦'
    },
    {
      id: 'geleverd',
      name: 'Geleverd',
      description: 'Project voltooid en geleverd',
      currentProjects: 0,
      capacity: 999,
      status: 'actief',
      icon: '🚚'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actief': return 'bg-green-600';
      case 'onderhoud': return 'bg-yellow-600';
      case 'inactief': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">HMT</span>
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
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
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

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="ml-3">Uitloggen</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Werkstations</h1>
        </header>

        <main className="flex-1 p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Actieve Werkstations</p>
                  <p className="text-2xl font-semibold text-white">
                    {workstations.filter(w => w.status === 'actief').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Totaal Projecten</p>
                  <p className="text-2xl font-semibold text-white">
                    {workstations.reduce((sum, w) => sum + w.currentProjects, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Capaciteit Gebruik</p>
                  <p className="text-2xl font-semibold text-white">
                    {Math.round((workstations.reduce((sum, w) => sum + w.currentProjects, 0) / workstations.reduce((sum, w) => sum + w.capacity, 0)) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Onderhoud</p>
                  <p className="text-2xl font-semibold text-white">
                    {workstations.filter(w => w.status === 'onderhoud').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workstations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workstations.map((workstation) => (
              <div key={workstation.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{workstation.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold">{workstation.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(workstation.status)}`}>
                        {workstation.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{workstation.currentProjects}</div>
                    <div className="text-xs text-gray-400">projecten</div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{workstation.description}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Capaciteit</span>
                      <span className={`font-medium ${getCapacityColor(workstation.currentProjects, workstation.capacity)}`}>
                        {workstation.currentProjects}/{workstation.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (workstation.currentProjects / workstation.capacity) * 100 >= 90
                            ? 'bg-red-500'
                            : (workstation.currentProjects / workstation.capacity) * 100 >= 70
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min((workstation.currentProjects / workstation.capacity) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {workstation.nextWorkstation && (
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Volgende: {workstations.find(w => w.id === workstation.nextWorkstation)?.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Production Flow */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Productie Flow</h3>
            <div className="flex items-center justify-between overflow-x-auto">
              {workstations.map((workstation, index) => (
                <div key={workstation.id} className="flex items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">{workstation.icon}</span>
                    </div>
                    <div className="text-white text-sm font-medium">{workstation.name}</div>
                    <div className="text-gray-400 text-xs">{workstation.currentProjects} projecten</div>
                  </div>
                  {index < workstations.length - 1 && (
                    <svg className="w-6 h-6 text-gray-500 mx-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
