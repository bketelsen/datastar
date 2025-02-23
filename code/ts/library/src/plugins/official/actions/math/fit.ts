// Authors: Delaney Gillilan
// Icon: material-symbols-light:fit-width
// Slug: Linearly fit a value to a new range
// Description: This action linearly fits a value to a new range. The value is first scaled to the new range.  Note it is not clamped to the new range.

import { ActionPlugin, AttributeContext } from "../../../../engine";
import { PLUGIN_ACTION } from "../../../../engine/client_only_consts";

export const Fit: ActionPlugin = {
    pluginType: PLUGIN_ACTION,
    name: "fit",
    method: (
        _: AttributeContext,
        v: number,
        oldMin: number,
        oldMax: number,
        newMin: number,
        newMax: number,
    ) => {
        return ((v - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    },
};
