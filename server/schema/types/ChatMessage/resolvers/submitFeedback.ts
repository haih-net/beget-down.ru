import { ChatMessageSubmitFeedbackDataInput } from '../inputs'
import { builder } from '../../../builder'
import { feedback } from '../helpers/feedback'

builder.mutationField('submitFeedback', (t) =>
  t.string({
    nullable: false,
    args: {
      data: t.arg({ type: ChatMessageSubmitFeedbackDataInput, required: true }),
    },
    resolve: (_root, { data }, ctx) => feedback.submit(data, ctx.req),
  }),
)
