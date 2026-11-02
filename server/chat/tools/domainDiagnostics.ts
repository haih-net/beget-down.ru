import { diagnoseDomain } from '../../schema/types/Custom/DomainDiagnostics/helpers/diagnostics'
import type { ChatTool } from '../types'

export const domainDiagnosticsTool: ChatTool = {
  definition: {
    type: 'function',
    function: {
      name: 'diagnose_domain',
      description:
        'Проверь текущие NS, регистратора, DNS и HTTP-интерфейсы Beget с сервера сводки.',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description:
              'Домен или поддомен в любой зоне. По умолчанию beget.ru.',
          },
          reasoning: { type: 'string' },
        },
        required: ['reasoning'],
        additionalProperties: false,
      },
    },
  },
  prepare: ({ reasoning, domain }) => {
    if (domain !== undefined && typeof domain !== 'string') {
      throw new Error('Expected a domain name')
    }
    return {
      reasoning,
      execute: async ({ signal }) => {
        signal.throwIfAborted()
        return JSON.stringify(await diagnoseDomain(domain, true))
      },
    }
  },
}
