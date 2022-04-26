import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../contollers/ProvidersController';
import ProviderDayAvailabilityController from '../contollers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../contollers/ProviderMonthAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index,
);

export default providersRouter;
