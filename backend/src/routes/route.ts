import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'


import intentRoute from './intentRoute'
import faqRoute from './faqRoute'
import activiteRoute from './activiteRoute'

import responseRoute from './responseBaseRoute'
import scenarioRoute from './scenarioRoute'
import scenarioStepRoute from './scenarioStepRoute'

import agentRoute from './agentRoute'
import businessRoute from './businessRoute'
import intentExRoute from './intentExRoute'

import produitRoute from './produitRoute'



const router = Router()



router.use(authMiddleware)

router.use('/intent', intentRoute)
router.use('/intent_exemple', intentExRoute)
router.use('/faq_default', faqRoute)
router.use('/activite', activiteRoute)

router.use('/response_base', responseRoute)
router.use('/scenario', scenarioRoute)
router.use('/scenario_step', scenarioStepRoute)


router.use('/agent', agentRoute)
router.use('/produit', produitRoute)
router.use('/business', businessRoute)


export default router;