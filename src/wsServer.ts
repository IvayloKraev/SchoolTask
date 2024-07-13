import WebSocket, {WebSocketServer} from 'ws';
import {dbHandler} from "./dbHandler";
import {INewMessage} from "../models/message.model"
import {IGetAllMessages} from "../models/command.model";

export namespace wsServer {
    let wsServer: WebSocketServer;

    export function init() {
        wsServer = new WebSocketServer({
            host: "0.0.0.0",
            port: 8080
        });

        wsServer.on('connection', (ws) => {
            ws.on('message', message => {
                const m: INewMessage | IGetAllMessages = JSON.parse(message.toString("utf-8"));
                if ("authorUsername" in m) {
                    dbHandler.addMessage(m).then((value) => {
                        wsServer.clients.forEach(client => {
                            client.send(JSON.stringify(value))
                        })
                    });

                } else if("command" in m){
                    if(m.command == "getAllMessages"){
                        dbHandler.getAllMessages().then((value: any) => {
                            ws.send(JSON.stringify(value));
                        })
                    }
                }else {
                    ws.send("Error:")
                }


            });
        });
    }
}
