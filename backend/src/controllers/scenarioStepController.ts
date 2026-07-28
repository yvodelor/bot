import { scenarioStepService } from '../services/scenarioStepService'

import { createBaseController } from './baseController'

const validateCreate = (data: any) => {
  if(!data.question || data.question.trim().length < 3 ) return 'Question min 3 caractères'
  return null
}

export const scenarioStepController = createBaseController(scenarioStepService, {
  create: validateCreate,
  update: validateCreate
})

