import { builder } from '../../../../builder'
import {
  diagnoseDomain,
  type Probe,
  type Snapshot,
} from '../helpers/diagnostics'

const probe = builder.objectRef<Probe>('DomainProbe').implement({
  fields: (t) => ({
    label: t.exposeString('label', { nullable: false }),
    state: t.exposeString('state', { nullable: false }),
    detail: t.exposeString('detail', { nullable: false }),
  }),
})
const diagnostics = builder.objectRef<Snapshot>('DomainDiagnostics').implement({
  fields: (t) => ({
    domain: t.exposeString('domain', { nullable: false }),
    checkedAt: t.exposeString('checkedAt', { nullable: false }),
    checks: t.field({
      type: [probe],
      nullable: false,
      resolve: (row) => row.checks,
    }),
  }),
})
builder.queryField('domainDiagnostics', (t) =>
  t.field({
    type: diagnostics,
    args: { domain: t.arg.string(), refresh: t.arg.boolean() },
    resolve: (_root, args) =>
      diagnoseDomain(args.domain ?? undefined, args.refresh ?? false),
  }),
)
