import { services } from './app/Custom/pages/Services/catalog'
import type { Config } from '@react-router/dev/config'
export default {
  ssr: true,
  prerender: [
    '/',
    '/about',
    '/services',
    ...services.map((service) => '/services/' + service.slug),
  ],
  routeDiscovery: { mode: 'initial' },
} satisfies Config
