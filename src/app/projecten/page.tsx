'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface Project {
  id: string;
  name: string;
  type: 'schuifdeur' | 'taatsdeur' | 'ander';
  client: string;
  status: 'nieuw' | 'in-productie' | 'klaar' | 'geleverd';
  qrCode: string;
  createdAt: string;
  currentWorkstation: string;
}

export default function ProjectenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'HMT-2024-001',
      name: 'Schuifdeur Woning Amsterdam',
      type: 'schuifdeur',
      client: 'Jan de Vries',
      status: 'in-productie',
      qrCode: 'HMT-2024-001',
      createdAt: '2024-01-15',
      currentWorkstation: 'Lasafdeling'
    },
    {
      id: 'HMT-2024-002',
      name: 'Taatsdeur Kantoor Rotterdam',
      type: 'taatsdeur',
      client: 'ABC Bedrijven BV',
      status: 'nieuw',
      qrCode: 'HMT-2024-002',
      createdAt: '2024-01-16',
      currentWorkstation: 'Ontvangst'
    },
    {
      id: 'HMT-2024-003',
      name: 'Stalen Hekwerk Villa',
      type: 'ander',
      client: 'Maria van der Berg',
      status: 'klaar',
      qrCode: 'HMT-2024-003',
      createdAt: '2024-01-10',
      currentWorkstation: 'Kwaliteitscontrole'
    }
  ]);

  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState<{
    name: string;
    type: 'schuifdeur' | 'taatsdeur' | 'ander';
    client: string;
  }>({
    name: '',
    type: 'schuifdeur',
    client: ''
  });
  const [qrCodes, setQrCodes] = useState<{[key: string]: string}>({});

  const generateQRCode = async (projectId: string) => {
    const qrUrl = `${window.location.origin}/qr/${projectId}`;
    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  useEffect(() => {
    // Genereer QR codes voor alle projecten
    const generateAllQRCodes = async () => {
      const qrCodePromises = projects.map(async (project) => {
        const qrCode = await generateQRCode(project.id);
        return { projectId: project.id, qrCode };
      });
      
      const qrCodeResults = await Promise.all(qrCodePromises);
      const qrCodeMap: {[key: string]: string} = {};
      
      qrCodeResults.forEach(({ projectId, qrCode }) => {
        if (qrCode) {
          qrCodeMap[projectId] = qrCode;
        }
      });
      
      setQrCodes(qrCodeMap);
    };

    generateAllQRCodes();
  }, [projects]);

  const addProject = async () => {
    const projectId = `HMT-2024-${String(projects.length + 1).padStart(3, '0')}`;
    const project: Project = {
      id: projectId,
      name: newProject.name,
      type: newProject.type,
      client: newProject.client,
      status: 'nieuw',
      qrCode: projectId,
      createdAt: new Date().toISOString().split('T')[0],
      currentWorkstation: 'Ontvangst'
    };
    
    setProjects([...projects, project]);
    
    // Genereer QR code voor het nieuwe project
    const qrCode = await generateQRCode(projectId);
    if (qrCode) {
      setQrCodes(prev => ({ ...prev, [projectId]: qrCode }));
    }
    
    setNewProject({ name: '', type: 'schuifdeur', client: '' });
    setShowNewProject(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-600';
      case 'in-productie': return 'bg-yellow-600';
      case 'klaar': return 'bg-green-600';
      case 'geleverd': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'schuifdeur':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'taatsdeur':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

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
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
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
              
              <h1 className="text-xl lg:text-2xl font-bold text-white">Projecten</h1>
            </div>
            
            <button
              onClick={() => setShowNewProject(true)}
              className="px-3 lg:px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm lg:text-base"
            >
              Nieuw Project
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {/* Projecten grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-black rounded-lg p-6 border border-gray-800 hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getTypeIcon(project.type)}
                    <span className="ml-2 text-white font-semibold">{project.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-white font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-2">Klant: {project.client}</p>
                <p className="text-gray-400 text-sm mb-4">Type: {project.type}</p>
                
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-2">Huidige locatie:</p>
                  <p className="text-white font-medium">{project.currentWorkstation}</p>
                  
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-2">QR Code:</p>
                    {qrCodes[project.id] ? (
                      <div className="bg-white p-2 rounded text-center">
                        <img 
                          src={qrCodes[project.id]} 
                          alt={`QR Code voor ${project.id}`}
                          className="mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-30 lg:h-30"
                        />
                        <div className="text-xs text-gray-600 mt-1">Scan om project te bekijken</div>
                      </div>
                    ) : (
                      <div className="bg-white p-2 rounded text-center">
                        <div className="text-black font-mono text-sm">{project.qrCode}</div>
                        <div className="text-xs text-gray-600 mt-1">QR code wordt gegenereerd...</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Nieuw Project</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Projectnaam</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bijv. Schuifdeur Woning Amsterdam"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Type</label>
                <select
                  value={newProject.type}
                  onChange={(e) => setNewProject({...newProject, type: e.target.value as 'schuifdeur' | 'taatsdeur' | 'ander'})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="schuifdeur">Schuifdeur</option>
                  <option value="taatsdeur">Taatsdeur</option>
                  <option value="ander">Ander</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Klant</label>
                <input
                  type="text"
                  value={newProject.client}
                  onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Klantnaam"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={addProject}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Project Aanmaken
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
