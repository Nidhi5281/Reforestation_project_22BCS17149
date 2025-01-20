import * as console from "../shared/Logger";
export function updateListener(node, eventName, currentListener, incomingListener, eventLogName = eventName) {
    if (currentListener) {
        if (incomingListener) {
            if (incomingListener !== currentListener) {
                console.log(`Replacing '${eventLogName}' currentListener ${currentListener.toString()} with an incomingListener ${incomingListener.toString()}.`);
                node.off(eventName, currentListener);
                node.on(eventName, incomingListener);
            }
            else {
                // console.log(`No change to '${eventLogName}' incomingListener.`);
            }
        }
        else {
            console.log(`Removing '${eventLogName}' listener as there is a currentListener without an incomingListener.`);
            node.off(eventName, currentListener);
        }
    }
    else {
        if (incomingListener) {
            console.log(`Adding '${eventLogName}' incomingListener; currentListener was falsy.`);
            node.on(eventName, incomingListener);
        }
    }
}
//# sourceMappingURL=EventHandling.js.map