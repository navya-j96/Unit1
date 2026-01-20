import React, { useState } from 'react'
import './styles/bayer-theme.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import GlobalDashboard from './pages/GlobalDashboard'
import SquadDetailView from './pages/SquadDetailView'
import IntegrationsPage from './pages/IntegrationsPage'
import AlertsInbox from './pages/AlertsInbox'
import AnomalyModal from './components/AnomalyModal'

type Page = 'dashboard' | 'squad' | 'integrations' | 'alerts'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [selectedSquad, setSelectedSquad] = useState('Platform Engineering')
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <GlobalDashboard onSquadClick={() => setCurrentPage('squad')} />
      case 'squad':
        return <SquadDetailView squad={selectedSquad} onAnomalyClick={setSelectedAnomaly} />
      case 'integrations':
        return <IntegrationsPage />
      case 'alerts':
        return <AlertsInbox onAnomalyClick={setSelectedAnomaly} />
      default:
        return <GlobalDashboard onSquadClick={() => setCurrentPage('squad')} />
    }
  }

  return (
    <div className="min-h-screen lmnt-theme-background-bg">
      <Header 
        selectedSquad={selectedSquad}
        onSquadChange={setSelectedSquad}
      />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        <main className="flex-1 p-6">
          {renderPage()}
        </main>
      </div>

      {selectedAnomaly && (
        <AnomalyModal 
          anomaly={selectedAnomaly}
          onClose={() => setSelectedAnomaly(null)}
        />
      )}
    </div>
  )
}

export default App