import { post as statement } from './posts/OfficialStatement/data'
import { post as forecast } from './posts/PersonalForecast/data'
import { post as current } from './posts/CurrentStatus/data'
import { post as incidentUpdate } from './posts/IncidentUpdate/data'
import { post as telegramComments } from './posts/TelegramComments/data'
import { post as hostingRecovery } from './posts/HostingRecovery/data'
import { post as websiteGuarantees } from './posts/WebsiteGuarantees/data'
import { post as backupRecovery } from './posts/BackupRecovery/data'
import type { Post } from './interfaces'
export const posts: Post[] = [
  statement,
  forecast,
  current,
  incidentUpdate,
  telegramComments,
  hostingRecovery,
  websiteGuarantees,
  backupRecovery,
].sort((left, right) => Date.parse(left.date) - Date.parse(right.date))
