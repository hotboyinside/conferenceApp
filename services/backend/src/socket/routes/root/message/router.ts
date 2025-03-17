import { Router } from '../../../services/socket/router';
import * as controller from './controller';
import * as schemeValidator from './schemeValidator';

const router = new Router();

router.addRoute({ path: 'send' }, schemeValidator.message, controller.message);

export const messageRouter = router;
