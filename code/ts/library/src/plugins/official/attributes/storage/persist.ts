// Authors: Delaney Gillilan
// Icon: mdi:floppy-variant
// Slug: Persist data to local storage or session storage
// Description: This plugin allows you to persist data to local storage or session storage.  Once you add this attribute the data will be persisted to local storage or session storage.

import {
    AttributePlugin,
    DATASTAR,
    DATASTAR_EVENT,
    DatastarEvent,
} from "../../../../engine";
import {
    LOCAL,
    PLUGIN_ATTRIBUTE,
    REMOTE,
    SESSION,
} from "../../../../engine/client_only_consts";
import { remoteSignals } from "../../../../utils/signals";

export const Persist: AttributePlugin = {
    pluginType: PLUGIN_ATTRIBUTE,
    name: "persist",
    allowedModifiers: new Set([LOCAL, SESSION, REMOTE]),
    onLoad: (ctx) => {
        const key = ctx.key || DATASTAR;
        const expression = ctx.expression;
        const keys = new Set<string>();

        if (expression.trim() !== "") {
            const value = ctx.expressionFn(ctx);
            const parts = value.split(" ");
            for (const part of parts) {
                keys.add(part);
            }
        }

        let lastMarshalled = "";
        const storageType = ctx.modifiers.has(SESSION) ? SESSION : LOCAL;
        const useRemote = ctx.modifiers.has(REMOTE);

        const storeUpdateHandler = ((_: CustomEvent<DatastarEvent>) => {
            let store = ctx.store();
            if (useRemote) {
                store = remoteSignals(store);
            }
            if (keys.size > 0) {
                const newStore: Record<string, any> = {};
                for (const key of keys) {
                    const parts = key.split(".");
                    let newSubstore = newStore;
                    let subStore = store;
                    for (let i = 0; i < parts.length - 1; i++) {
                        const part = parts[i];
                        if (!newSubstore[part]) {
                            newSubstore[part] = {};
                        }
                        newSubstore = newSubstore[part];
                        subStore = subStore[part];
                    }

                    const lastPart = parts[parts.length - 1];
                    newSubstore[lastPart] = subStore[lastPart];
                }
                store = newStore;
            }

            const marshalledStore = JSON.stringify(store);

            if (marshalledStore === lastMarshalled) {
                return;
            }

            if (storageType === SESSION) {
                window.sessionStorage.setItem(key, marshalledStore);
            } else {
                window.localStorage.setItem(key, marshalledStore);
            }

            lastMarshalled = marshalledStore;
        }) as EventListener;

        window.addEventListener(DATASTAR_EVENT, storeUpdateHandler);

        let marshalledStore: string | null;

        if (storageType === SESSION) {
            marshalledStore = window.sessionStorage.getItem(key);
        } else {
            marshalledStore = window.localStorage.getItem(key);
        }

        if (!!marshalledStore) {
            const store = JSON.parse(marshalledStore);
            for (const key in store) {
                const value = store[key];
                ctx.upsertIfMissingFromStore(key, value);
            }
        }

        return () => {
            window.removeEventListener(DATASTAR_EVENT, storeUpdateHandler);
        };
    },
};
