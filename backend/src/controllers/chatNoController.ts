import { chatNoService } from '../services/chatNoService'

import { createBaseController } from './baseController'
/*
const validateCreate = (data: any) => {
  if(!data.nom || data.nom.trim().length < 3 ) return 'nom min 3 caractères'
  return null
}
  */

export const chatNoController = createBaseController(chatNoService, {
  
})
