import { faqDefaultService } from '../services/faqDefaultService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.question || data.question.trim().length < 3 ) return 'question min 3 caractères'
  return null
}

export const faqDefaultController = createBaseController(faqDefaultService, {
  create: validateCreate,
  update: validateCreate
})

