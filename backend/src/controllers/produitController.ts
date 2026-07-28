import { produitService } from '../services/produitService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.name || data.name.trim().length < 3 ) return 'nom min 3 caractères'
  return null
}

export const produitController = createBaseController(produitService, {
  create: validateCreate,
  update: validateCreate
})

