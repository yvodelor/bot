import { responseService } from '../services/responseService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.response || data.response.trim().length < 3 ) return 'nom min 3 caractères'
  return null
}

export const responseController = createBaseController(responseService, {
  create: validateCreate,
  update: validateCreate
})

