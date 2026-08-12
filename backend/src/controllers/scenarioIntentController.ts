import { scenarioIntentService } from '../services/scenarioIntentService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
 
  return null
}

export const scenarioIntentController = createBaseController(scenarioIntentService , {
  create: validateCreate,
  update: validateCreate
})

