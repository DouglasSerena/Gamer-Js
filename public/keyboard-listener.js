export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function subcribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function unsubcribe() {
        state.observers = [];
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    function registerPlayerId(playerId) {
        state.playerId = playerId;
        state.playerId
    }
    
    function handleKeyDown(event) {
        const keyPressed = event.key;

        const command = {
            type: "move-player",
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command);   
    }

    return {
        subcribe,
        unsubcribe,
        registerPlayerId
    }
}
