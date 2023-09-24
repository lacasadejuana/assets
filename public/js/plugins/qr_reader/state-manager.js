/**
 * @fileoverview
 * State handler.
 *
 * @author mebjas <minhazav@gmail.com>
 */
/** Different states of scanner */
export var Html5QrcodeScannerState;
(function (Html5QrcodeScannerState) {
    // Invalid internal state, do not set to this state.
    Html5QrcodeScannerState[Html5QrcodeScannerState["UNKNOWN"] = 0] = "UNKNOWN";
    // Indicates the scanning is not running or user is using file based
    // scanning.
    Html5QrcodeScannerState[Html5QrcodeScannerState["NOT_STARTED"] = 1] = "NOT_STARTED";
    // Camera scan is running.
    Html5QrcodeScannerState[Html5QrcodeScannerState["SCANNING"] = 2] = "SCANNING";
    // Camera scan is paused but camera is running.
    Html5QrcodeScannerState[Html5QrcodeScannerState["PAUSED"] = 3] = "PAUSED";
})(Html5QrcodeScannerState || (Html5QrcodeScannerState = {}));
/**
 * Implementation of {@interface StateManager} and
 * {@interface StateManagerTransaction}.
 */
class StateManagerImpl {
    constructor() {
        this.state = Html5QrcodeScannerState.NOT_STARTED;
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
        //#endregion
    }
    directTransition(newState) {
        this.failIfTransitionOngoing();
        this.validateTransition(newState);
        this.state = newState;
    }
    startTransition(newState) {
        this.failIfTransitionOngoing();
        this.validateTransition(newState);
        this.onGoingTransactionNewState = newState;
        return this;
    }
    execute() {
        if (this.onGoingTransactionNewState
            === Html5QrcodeScannerState.UNKNOWN) {
            throw "Transaction is already cancelled, cannot execute().";
        }
        const tempNewState = this.onGoingTransactionNewState;
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
        this.directTransition(tempNewState);
    }
    cancel() {
        if (this.onGoingTransactionNewState
            === Html5QrcodeScannerState.UNKNOWN) {
            throw "Transaction is already cancelled, cannot cancel().";
        }
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
    }
    getState() {
        return this.state;
    }
    //#region private methods
    failIfTransitionOngoing() {
        if (this.onGoingTransactionNewState
            !== Html5QrcodeScannerState.UNKNOWN) {
            throw "Cannot transition to a new state, already under transition";
        }
    }
    validateTransition(newState) {
        switch (this.state) {
            case Html5QrcodeScannerState.UNKNOWN:
                throw "Transition from unknown is not allowed";
            case Html5QrcodeScannerState.NOT_STARTED:
                this.failIfNewStateIs(newState, [Html5QrcodeScannerState.PAUSED]);
                break;
            case Html5QrcodeScannerState.SCANNING:
                // Both state transitions legal from here.
                break;
            case Html5QrcodeScannerState.PAUSED:
                // Both state transitions legal from here.
                break;
        }
    }
    failIfNewStateIs(newState, disallowedStatesToTransition) {
        for (const disallowedState of disallowedStatesToTransition) {
            if (newState === disallowedState) {
                throw `Cannot transition from ${this.state} to ${newState}`;
            }
        }
    }
}
export class StateManagerProxy {
    constructor(stateManager) {
        this.stateManager = stateManager;
    }
    startTransition(newState) {
        return this.stateManager.startTransition(newState);
    }
    directTransition(newState) {
        this.stateManager.directTransition(newState);
    }
    getState() {
        return this.stateManager.getState();
    }
    canScanFile() {
        return this.stateManager.getState() === Html5QrcodeScannerState.NOT_STARTED;
    }
    isScanning() {
        return this.stateManager.getState() !== Html5QrcodeScannerState.NOT_STARTED;
    }
    isStrictlyScanning() {
        return this.stateManager.getState() === Html5QrcodeScannerState.SCANNING;
    }
    isPaused() {
        return this.stateManager.getState() === Html5QrcodeScannerState.PAUSED;
    }
}
/**
 * Factory for creating instance of {@class StateManagerProxy}.
 */
export class StateManagerFactory {
    static create() {
        return new StateManagerProxy(new StateManagerImpl());
    }
}
//# sourceMappingURL=state-manager.js.map