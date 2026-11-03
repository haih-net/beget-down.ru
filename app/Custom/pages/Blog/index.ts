import { post as statement } from './posts/OfficialStatement/data'
import { post as forecast } from './posts/PersonalForecast/data'
import { post as current } from './posts/CurrentStatus/data'
import type { Post } from './interfaces'
export const posts: Post[] = [statement, forecast, current].sort(
  (left, right) => Date.parse(left.date) - Date.parse(right.date),
)
