'use client';

import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface Workstation {
  id: string;
  name: string;
  description: string;
  nextWorkstation?: string;
}

export default function QRScannerPage() {
  const [scannedCode, setScannedCode] = useState('');
  const [selectedWorkstation, setSelectedWorkstation] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  const workstations: Workstation[] = [
    { id: 'ontvangst', name: 'Ontvangst', description: 'Nieuwe orders ontvangen' },
    { id: 'lasafdeling', name: 'Lasafdeling', description: 'Lassen en bewerken van staal', nextWorkstation: 'montage' },
    { id: 'montage', name: 'Montage', description: 'Assembleren van onderdelen', nextWorkstation: 'afwerking' },
    { id: 'afwerking', name: 'Afwerking', description: 'Schuren, schilderen en afwerken', nextWorkstation: 'kwaliteitscontrole' },
    { id: 'kwaliteitscontrole', name: 'Kwaliteitscontrole', description: 'Controle en goedkeuring', nextWorkstation: 'verpakking' },
    { id: 'verpakking', name: 'Verpakking', description: 'Inpakken voor verzending', nextWorkstation: 'geleverd' },
    { id: 'geleverd', name: 'Geleverd', description: 'Project voltooid en geleverd' }
  ];

  const mockProjects = [
    { id: 'HMT-2024-001', name: 'Schuifdeur Woning Amsterdam', currentWorkstation: 'lasafdeling' },
    { id: 'HMT-2024-002', name: 'Taatsdeur Kantoor Rotterdam', currentWorkstation: 'ontvangst' },
    { id: 'HMT-2024-003', name: 'Stalen Hekwerk Villa', currentWorkstation: 'kwaliteitscontrole' }
  ];

  const handleScan = () => {
    if (!scannedCode.trim()) {
      setScanResult('Voer een QR code in');
      return;
    }

    const project = mockProjects.find(p => p.id === scannedCode);
    if (!project) {
      setScanResult(`Project ${scannedCode} niet gevonden`);
      return;
    }

    if (!selectedWorkstation) {
      setScanResult('Selecteer eerst een werkstation');
      return;
    }

    // Simuleer het bijwerken van de project status
    setScanResult(`Project ${project.name} succesvol verplaatst naar ${workstations.find(w => w.id === selectedWorkstation)?.name}`);
    
    // Reset form
    setScannedCode('');
    setSelectedWorkstation('');
  };

  const handleManualInput = (code: string) => {
    setScannedCode(code);
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      setCameraActive(true);
      
      readerRef.current = new BrowserMultiFormatReader();
      
      const videoInputDevices = await readerRef.current.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        throw new Error('Geen camera gevonden');
      }

      // Gebruik de eerste beschikbare camera
      const selectedDeviceId = videoInputDevices[0].deviceId;
      
      await readerRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current!,
        (result, error) => {
          if (result) {
            const projectId = result.getText();
            // Extract project ID from URL if it's a full URL
            const match = projectId.match(/\/qr\/([^\/]+)/);
            const extractedId = match ? match[1] : projectId;
            
            setScannedCode(extractedId);
            setScanResult(`QR Code gescand: ${extractedId}`);
            stopCamera();
          }
          if (error && !(error instanceof Error && error.name === 'NotFoundException')) {
            console.error('Scan error:', error);
          }
        }
      );
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Kon camera niet starten. Controleer of camera toegang is toegestaan.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-black flex flex-col border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <img 
              src="/svg/hij-maakt-het.svg" 
              alt="Hij Maakt Het Logo" 
              className="h-10 w-auto object-contain"
            />
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
                className="flex items-center px-3 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
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
        <header className="bg-black border-b border-gray-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">QR Code Scanner</h1>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Camera Scanner */}
            <div className="bg-black rounded-lg p-6 mb-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Camera QR Scanner</h2>
              
              <div className="space-y-4">
                {!cameraActive ? (
                  <div className="text-center">
                    <button
                      onClick={startCamera}
                      className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                    >
                      Start Camera Scanner
                    </button>
                    <p className="text-gray-400 text-sm mt-2">
                      Klik om camera te starten en QR code te scannen
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full max-w-md mx-auto rounded-lg"
                        style={{ maxHeight: '300px' }}
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={stopCamera}
                          className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded text-sm"
                        >
                          Stop
                        </button>
                      </div>
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                      Richt de camera op een QR code om te scannen
                    </p>
                  </div>
                )}

                {cameraError && (
                  <div className="p-4 bg-red-900 border border-red-600 rounded-lg">
                    <p className="text-red-200">{cameraError}</p>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Of voer handmatig in:
                  </label>
                  <input
                    type="text"
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="HMT-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Werkstation
                  </label>
                  <select
                    value={selectedWorkstation}
                    onChange={(e) => setSelectedWorkstation(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecteer werkstation</option>
                    {workstations.map((workstation) => (
                      <option key={workstation.id} value={workstation.id}>
                        {workstation.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleScan}
                    className="px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                  >
                    Project Verplaatsen
                  </button>
                  <button
                    onClick={() => {
                      if (scannedCode) {
                        window.location.href = `/qr/${scannedCode}`;
                      }
                    }}
                    disabled={!scannedCode}
                    className="px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Bekijk Project Details
                  </button>
                </div>
              </div>

              {scanResult && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <p className="text-white">{scanResult}</p>
                </div>
              )}
            </div>

            {/* Quick Access - Demo Projecten */}
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Demo Projecten (Klik om te scannen)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleManualInput(project.id)}
                    className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                  >
                    <div className="text-white font-medium">{project.id}</div>
                    <div className="text-gray-400 text-sm">{project.name}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Huidig: {workstations.find(w => w.id === project.currentWorkstation)?.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow Info */}
            <div className="bg-black rounded-lg p-6 mt-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Productie Workflow</h3>
              <div className="space-y-2">
                {workstations.map((workstation, index) => (
                  <div key={workstation.id} className="flex items-center text-gray-300">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{workstation.name}</span>
                      <span className="text-gray-500 ml-2">- {workstation.description}</span>
                    </div>
                    {workstation.nextWorkstation && (
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
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
