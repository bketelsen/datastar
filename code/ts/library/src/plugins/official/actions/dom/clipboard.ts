// Authors: Delaney Gillilan
// Icon: mdi:clipboard
// Slug: Copy text to the clipboard
// Description: This action copies text to the clipboard using the Clipboard API.

import { ActionPlugin } from "../../../../engine";
import { PLUGIN_ACTION } from "../../../../engine/client_only_consts";

export const Clipboard: ActionPlugin = {
    pluginType: PLUGIN_ACTION,
    name: "clipboard",
    method: (_, text) => {
        if (!navigator.clipboard) {
            throw new Error("Clipboard API not available");
        }
        navigator.clipboard.writeText(text);
    },
};
