import { activiteService } from '../services/activiteService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.nom || data.nom.trim().length < 3 ) return 'nom min 3 caractères'
  return null
}

export const activiteController = createBaseController(activiteService, {
  create: validateCreate,
  update: validateCreate
})
