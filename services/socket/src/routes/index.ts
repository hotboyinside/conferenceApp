import { Router } from "../services/socket/router";
import { helloRouter } from "./root/hello/router";

const router = new Router();

router.addRouter("hello", helloRouter);

export const rootRouter = router;
