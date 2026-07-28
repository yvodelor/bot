import { intentExService } from '../services/intentExService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.phrase || data.phrase.trim().length < 3 ) return 'Phrase min 3 caractères'
  return null
}

export const intentExController = createBaseController(intentExService, {
  create: validateCreate,
  update: validateCreate
})