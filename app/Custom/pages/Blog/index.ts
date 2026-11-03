import { post as statement } from './posts/OfficialStatement/data'
import { post as forecast } from './posts/PersonalForecast/data'
import { post as current } from './posts/CurrentStatus/data'
import { post as incidentUpdate } from './posts/IncidentUpdate/data'
import type { Post } from './interfaces'
export const posts: Post[] = [
  statement,
  forecast,
  current,
  incidentUpdate,
].sort((left, right) => Date.parse(left.date) - Date.parse(right.date))
