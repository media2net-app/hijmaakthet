'use client';

import { useState } from 'react';

interface TrelloCard {
  id: string;
  name: string;
  listName: string;
  dueDate?: string;
  members: string[];
  labels: string[];
  lastActivity: string;
}

export default function TrelloSyncPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const mockTrelloCards: TrelloCard[] = [
    {
      id: 'trello-001',
      name: 'Schuifdeur Woning Amsterdam - Productie',
      listName: 'In Productie',
      dueDate: '2024-02-15',
      members: ['Leonie', 'Jan'],
      labels: ['urgent', 'staal'],
      lastActivity: '2 uur geleden'
    },
    {
      id: 'trello-002',
      name: 'Taatsdeur Kantoor Rotterdam - Ontwerp',
      listName: 'Ontwerp',
      dueDate: '2024-02-20',
      members: ['Leonie'],
      labels: ['nieuw', 'deur'],
      lastActivity: '1 dag geleden'
    },
    {
      id: 'trello-003',
      name: 'Stalen Hekwerk Villa - Kwaliteitscontrole',
      listName: 'Kwaliteitscontrole',
      dueDate: '2024-02-10',
      members: ['Leonie', 'Piet'],
      labels: ['klaar', 'hekwerk'],
      lastActivity: '3 uur geleden'
    }
  ];

  const mockBoards = [
    { id: 'board-1', name: 'Hij Maakt Het - Productie 2024' },
    { id: 'board-2', name: 'Hij Maakt Het - Projecten Q1' },
    { id: 'board-3', name: 'Hij Maakt Het - Onderhoud' }
  ];

  const handleConnect = () => {
    if (apiKey && token) {
      setIsConnected(true);
      setSyncStatus('success');
    }
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    // Simuleer sync proces
    setTimeout(() => {
      setSyncStatus('success');
    }, 2000);
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'urgent': return 'bg-red-600';
      case 'nieuw': return 'bg-blue-600';
      case 'klaar': return 'bg-green-600';
      case 'staal': return 'bg-gray-600';
      case 'deur': return 'bg-yellow-600';
      case 'hekwerk': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getListColor = (listName: string) => {
    switch (listName) {
      case 'Ontwerp': return 'bg-blue-600';
      case 'In Productie': return 'bg-yellow-600';
      case 'Kwaliteitscontrole': return 'bg-orange-600';
      case 'Klaar': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
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
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
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
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
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
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Trello Synchronisatie</h1>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Connection Status */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Trello Verbinding</h2>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  isConnected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {isConnected ? 'Verbonden' : 'Niet Verbonden'}
                </div>
              </div>

              {!isConnected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Trello API Key
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Je Trello API key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Trello Token
                    </label>
                    <input
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Je Trello token"
                    />
                  </div>

                  <button
                    onClick={handleConnect}
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Verbind met Trello
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Selecteer Board
                    </label>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecteer een board</option>
                      {mockBoards.map((board) => (
                        <option key={board.id} value={board.id}>
                          {board.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleSync}
                      disabled={!selectedBoard || syncStatus === 'syncing'}
                      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {syncStatus === 'syncing' ? 'Synchroniseren...' : 'Synchroniseer Nu'}
                    </button>
                    
                    <button
                      onClick={() => setIsConnected(false)}
                      className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Verbreek Verbinding
                    </button>
                  </div>

                  {syncStatus === 'success' && (
                    <div className="p-4 bg-green-900 border border-green-600 rounded-lg">
                      <p className="text-green-200">Synchronisatie succesvol voltooid!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Trello Cards */}
            {isConnected && selectedBoard && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Trello Kaarten</h3>
                
                <div className="space-y-4">
                  {mockTrelloCards.map((card) => (
                    <div key={card.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{card.name}</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs text-white ${getListColor(card.listName)}`}>
                              {card.listName}
                            </span>
                            {card.dueDate && (
                              <span className="text-gray-400 text-sm">
                                Deadline: {new Date(card.dueDate).toLocaleDateString('nl-NL')}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">{card.lastActivity}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            {card.members.map((member, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium"
                              >
                                {member.charAt(0)}
                              </div>
                            ))}
                          </div>
                          <span className="text-gray-400 text-sm">
                            {card.members.join(', ')}
                          </span>
                        </div>

                        <div className="flex space-x-1">
                          {card.labels.map((label, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs text-white ${getLabelColor(label)}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-gray-800 rounded-lg p-6 mt-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Hoe krijg ik mijn Trello API gegevens?</h3>
              <div className="space-y-3 text-gray-300">
                <p>1. Ga naar <a href="https://trello.com/app-key" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">trello.com/app-key</a></p>
                <p>2. Kopieer je API Key</p>
                <p>3. Klik op &quot;Token&quot; om je persoonlijke token te genereren</p>
                <p>4. Voer beide gegevens hierboven in om te verbinden</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
