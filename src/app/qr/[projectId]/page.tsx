'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  type: 'schuifdeur' | 'taatsdeur' | 'ander';
  client: string;
  status: 'nieuw' | 'in-productie' | 'klaar' | 'geleverd';
  currentWorkstation: string;
  createdAt: string;
  description?: string;
  progress: number;
}

interface Workstation {
  id: string;
  name: string;
  description: string;
  nextWorkstation?: string;
}

export default function QRDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [selectedWorkstation, setSelectedWorkstation] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const workstations: Workstation[] = [
    { id: 'ontvangst', name: 'Ontvangst', description: 'Nieuwe orders ontvangen' },
    { id: 'lasafdeling', name: 'Lasafdeling', description: 'Lassen en bewerken van staal', nextWorkstation: 'montage' },
    { id: 'montage', name: 'Montage', description: 'Assembleren van onderdelen', nextWorkstation: 'afwerking' },
    { id: 'afwerking', name: 'Afwerking', description: 'Schuren, schilderen en afwerken', nextWorkstation: 'kwaliteitscontrole' },
    { id: 'kwaliteitscontrole', name: 'Kwaliteitscontrole', description: 'Controle en goedkeuring', nextWorkstation: 'verpakking' },
    { id: 'verpakking', name: 'Verpakking', description: 'Inpakken voor verzending', nextWorkstation: 'geleverd' },
    { id: 'geleverd', name: 'Geleverd', description: 'Project voltooid en geleverd' }
  ];

  // Mock data - in een echte app zou dit van een API komen
  const mockProjects: Project[] = [
    {
      id: 'HMT-2024-001',
      name: 'Schuifdeur Woning Amsterdam',
      type: 'schuifdeur',
      client: 'Jan de Vries',
      status: 'in-productie',
      currentWorkstation: 'lasafdeling',
      createdAt: '2024-01-15',
      description: 'Stalen schuifdeur voor woonkamer, afmetingen 2.5m x 2.1m',
      progress: 45
    },
    {
      id: 'HMT-2024-002',
      name: 'Taatsdeur Kantoor Rotterdam',
      type: 'taatsdeur',
      client: 'ABC Bedrijven BV',
      status: 'nieuw',
      currentWorkstation: 'ontvangst',
      createdAt: '2024-01-16',
      description: 'Moderne taatsdeur voor kantoorgebouw, glas en staal',
      progress: 10
    },
    {
      id: 'HMT-2024-003',
      name: 'Stalen Hekwerk Villa',
      type: 'ander',
      client: 'Maria van der Berg',
      status: 'klaar',
      currentWorkstation: 'kwaliteitscontrole',
      createdAt: '2024-01-10',
      description: 'Decoratief hekwerk rondom villa, 15 meter totaal',
      progress: 90
    }
  ];

  useEffect(() => {
    // Simuleer het ophalen van project data
    const foundProject = mockProjects.find(p => p.id === projectId);
    setProject(foundProject || null);
  }, [projectId]);

  const handleWorkstationUpdate = async () => {
    if (!selectedWorkstation || !project) return;
    
    setIsUpdating(true);
    
    // Simuleer API call
    setTimeout(() => {
      setProject({
        ...project,
        currentWorkstation: selectedWorkstation,
        progress: Math.min(project.progress + 15, 100)
      });
      setUpdateMessage(`Project succesvol verplaatst naar ${workstations.find(w => w.id === selectedWorkstation)?.name}`);
      setIsUpdating(false);
      setSelectedWorkstation('');
    }, 1000);
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'taatsdeur':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Project niet gevonden</div>
          <div className="text-gray-400">QR Code: {projectId}</div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Terug naar Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/SVG/hij-maakt-het.svg" 
              alt="Hij Maakt Het" 
              className="h-10 w-auto object-contain mr-3"
            />
            <h1 className="text-2xl font-bold text-white">Project Details</h1>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Terug naar Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Project Info Card */}
        <div className="bg-black rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="text-blue-400 mr-4">
                {getTypeIcon(project.type)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-400">Project ID: {project.id}</span>
                  <span className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Project Informatie</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Klant:</span>
                  <span className="text-white">{project.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white capitalize">{project.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Aangemaakt:</span>
                  <span className="text-white">{new Date(project.createdAt).toLocaleDateString('nl-NL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Huidige Locatie:</span>
                  <span className="text-white font-medium">
                    {workstations.find(w => w.id === project.currentWorkstation)?.name}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Voortgang</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Voortgang</span>
                    <span className="text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                {project.description && (
                  <div>
                    <span className="text-gray-400 text-sm">Beschrijving:</span>
                    <p className="text-white text-sm mt-1">{project.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Project Acties</h3>
          
          {updateMessage && (
            <div className="mb-4 p-4 bg-green-900 border border-green-600 rounded-lg">
              <p className="text-green-200">{updateMessage}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Verplaats naar werkstation
              </label>
              <select
                value={selectedWorkstation}
                onChange={(e) => setSelectedWorkstation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecteer werkstation</option>
                {workstations.map((workstation) => (
                  <option key={workstation.id} value={workstation.id}>
                    {workstation.name} - {workstation.description}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleWorkstationUpdate}
              disabled={!selectedWorkstation || isUpdating}
              className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Bijwerken...' : 'Project Verplaatsen'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-md font-semibold text-white mb-3">Snelle Acties</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setSelectedWorkstation('kwaliteitscontrole');
                  handleWorkstationUpdate();
                }}
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Markeer als Klaar
              </button>
              <button
                onClick={() => {
                  setSelectedWorkstation('verpakking');
                  handleWorkstationUpdate();
                }}
                className="px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
              >
                Klaar voor Verpakking
              </button>
              <button
                onClick={() => {
                  setSelectedWorkstation('geleverd');
                  handleWorkstationUpdate();
                }}
                className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Markeer als Geleverd
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Info */}
        <div className="bg-black rounded-lg p-6 mt-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">QR Code Informatie</h3>
          <div className="text-gray-400 text-sm">
            <p>Deze pagina is bereikbaar via QR code: <span className="text-white font-mono">{project.id}</span></p>
            <p className="mt-2">Scan deze QR code op elk werkstation om de project status bij te werken.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
