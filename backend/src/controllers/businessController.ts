import { businessService } from '../services/businessService'

import { createBaseController } from './baseController'


const validateCreate = (data: any) => {
  if(!data.name || data.name.trim().length < 3 ) return 'nom min 3 caractères'


  return null
}

export const businessController = createBaseController(businessService, {
  create: validateCreate,
  update: validateCreate
})