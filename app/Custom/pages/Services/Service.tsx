import type * as React from 'react'
import type { Service } from './catalog'
import { NewSitePage } from './NewSite'
import { DiagnosticsPage } from './Diagnostics'
import { RestorePage } from './Restore'
import { DnsPage } from './Dns'
import { TemporaryPage } from './TemporaryPage'
import { BackupsPage } from './Backups'
import { StandbyPage } from './Standby'

export const ServicePage: React.FC<{ service: Service }> = ({ service }) => {
  switch (service.slug) {
    case 'new-site':
      return <NewSitePage />
    case 'diagnostics':
      return <DiagnosticsPage />
    case 'restore':
      return <RestorePage />
    case 'dns':
      return <DnsPage />
    case 'temporary-page':
      return <TemporaryPage />
    case 'backups':
      return <BackupsPage />
    case 'standby':
      return <StandbyPage />
    default:
      throw new Error('Неизвестная услуга: ' + service.slug)
  }
}
