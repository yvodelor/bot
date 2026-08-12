import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'

import intentRoute from './intentRoute'
import faqRoute from './faqRoute'
import activiteRoute from './activiteRoute'

import responseRoute from './responseBaseRoute'
import scenarioRoute from './scenarioRoute'
import scenarioStepRoute from './scenarioStepRoute'
import scenarioIntentRoute from './scenarioIntentRoute'

import agentRoute from './agentRoute'
import businessRoute from './businessRoute'
import intentExRoute from './intentExRoute'

import produitRoute from './produitRoute'

import dashRoute from './dashboardRoute'

import groupeRoute from './groupeRoute'

import adRoute from './adRoute'



const router = Router()




router.use('/ad', adRoute)

// Route Privée
router.use(authMiddleware)

router.use('/intent', roleMiddleware(4), intentRoute, )
router.use('/scenario_intent', roleMiddleware(4), scenarioIntentRoute, )
router.use('/intent_exemple', roleMiddleware(4), intentExRoute)


router.use('/faq', faqRoute)
router.use('/activite', activiteRoute)
router.use('/groupe', groupeRoute)
router.use('/response_base', responseRoute)
router.use('/scenario', scenarioRoute)
router.use('/scenario_step', scenarioStepRoute)


router.use('/agent', agentRoute)
router.use('/produit', produitRoute)
router.use('/business', businessRoute)


router.use('/dashboard', dashRoute)


// Route admin


export default router;