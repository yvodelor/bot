import { agentService } from '../services/agentService'

import { createBaseController } from './baseController'





const validateCreate = (data:any) => {
  if(!data.name || data.name.trim().length < 3 ) return 'Nom min 3 caractères'
  return null
}



export const agentController = createBaseController(agentService, {
  create: validateCreate,
  update: validateCreate
})