import {wsServer} from "./wsServer"
import {dbHandler} from "./dbHandler";

dbHandler.init();
wsServer.init();
