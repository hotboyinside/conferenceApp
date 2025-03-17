import { Router } from '../services/socket/router';
import { helloRouter } from './root/hello/router';
import { messageRouter } from './root/message/router';

const router = new Router();

router.addRouter('hello', helloRouter);

router.addRouter('message', messageRouter);

export const rootRouter = router;
