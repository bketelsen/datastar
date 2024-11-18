// This is auto-generated by Datastar. DO NOT EDIT.

package datastar

import "time"

const (
    DatastarKey = "datastar"
    Version                   = "0.20.0-beta-1"
    VersionClientByteSize     = 42831
    VersionClientByteSizeGzip = 14683

    // Default durations
    DefaultSettleDuration = 300 * time.Millisecond
    DefaultSseRetryDuration = 1000 * time.Millisecond

    // Default strings
    DefaultExecuteJsType = "module"
    DefaultCustomEventSelector = "document"
    DefaultCustomEventDetailJson = "{}"

    // Dataline literals
    SelectorDatalineLiteral = "selector "
    MergeModeDatalineLiteral = "mergeMode "
    SettleDurationDatalineLiteral = "settleDuration "
    FragmentDatalineLiteral = "fragment "
    UseViewTransitionDatalineLiteral = "useViewTransition "
    StoreDatalineLiteral = "store "
    OnlyIfMissingDatalineLiteral = "onlyIfMissing "
    PathsDatalineLiteral = "paths "
    ScriptDatalineLiteral = "script "
    TypeDatalineLiteral = "type "
    AutoRemoveDatalineLiteral = "autoRemove "
)

var (
    // Default booleans
    DefaultFragmentsUseViewTransitions = false
    DefaultMergeSignalsOnlyIfMissing = false
    DefaultExecuteJsautoRemove = true
    DefaultCustomEventCancelable = true
    DefaultCustomEventComposed = true
    DefaultCustomEventBubbles = true
)

// Enums
type FragmentMergeMode string

const (
    // Default value for FragmentMergeMode
    DefaultFragmentMergeMode = FragmentMergeModeMorph

    // Morphs the fragment into the existing element using idiomorph.
    FragmentMergeModeMorph FragmentMergeMode = "morph"

    // Replaces the inner HTML of the existing element.
    FragmentMergeModeInner FragmentMergeMode = "inner"

    // Replaces the outer HTML of the existing element.
    FragmentMergeModeOuter FragmentMergeMode = "outer"

    // Prepends the fragment to the existing element.
    FragmentMergeModePrepend FragmentMergeMode = "prepend"

    // Appends the fragment to the existing element.
    FragmentMergeModeAppend FragmentMergeMode = "append"

    // Inserts the fragment before the existing element.
    FragmentMergeModeBefore FragmentMergeMode = "before"

    // Inserts the fragment after the existing element.
    FragmentMergeModeAfter FragmentMergeMode = "after"

    // Upserts the attributes of the existing element.
    FragmentMergeModeUpsertAttributes FragmentMergeMode = "upsertAttributes"

)

type EventType string

const (
    // An event for merging HTML fragments into the DOM.
    EventTypeMergeFragments EventType = "datastar-merge-fragments"

    // An event for merging signals into the store.
    EventTypeMergeSignals EventType = "datastar-merge-signals"

    // An event for removing HTML fragments from the DOM.
    EventTypeRemoveFragments EventType = "datastar-remove-fragments"

    // An event for removing signals from the store.
    EventTypeRemoveSignals EventType = "datastar-remove-signals"

    // An event for executing JavaScript in the browser.
    EventTypeExecuteJs EventType = "datastar-execute-js"

)