import type * as React from 'react'
import { ArrowDown, Unplug } from 'lucide-react'
import type { ServiceMapConnection } from '../interfaces'
import { ConnectionStyled } from './styles'

export const Connection: React.FC<{
  state: ServiceMapConnection
  layout?: 'full' | 'compact'
}> = ({ state, layout = 'full' }) => (
  <ConnectionStyled
    role="img"
    aria-label={
      state === 'connected' ? 'Переход к следующему шагу' : 'Связь недоступна'
    }
    data-state={state}
    data-layout={layout}
  >
    {state === 'connected' ? (
      <ArrowDown size={20} aria-hidden="true" />
    ) : (
      <Unplug size={18} aria-hidden="true" />
    )}
  </ConnectionStyled>
)
