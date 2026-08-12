import { groupeService } from '../services/groupeService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.name || data.name.trim().length < 3 ) return 'name min 3 caractères'
  return null
}

export const groupeController = createBaseController(groupeService, {
  create: validateCreate,
  update: validateCreate
})
