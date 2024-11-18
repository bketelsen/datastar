// This is auto-generated by Datastar. DO NOT EDIT.

package datastar

import "time"

const (
    DatastarKey = "datastar"
    Version                   = "0.20.0"
    VersionClientByteSize     = 43016
    VersionClientByteSizeGzip = 14752

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
    DefaultMergeFragmentsUseViewTransitions = false
    DefaultMergeStoreOnlyIfMissing = false
    DefaultExecuteJsAutoRemove = true
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
    // An event dealing with HTML fragments.
    EventTypeMergeFragments EventType = "datastar-merge-fragments"

    // An event dealing with fine grain signals.
    EventTypeMergeStore EventType = "datastar-merge-store"

    // An event dealing with removing elements from the DOM
    EventTypeRemoveFragments EventType = "datastar-remove-fragments"

    // An event dealing with removing signals from the store.
    EventTypeRemoveFromStore EventType = "datastar-remove-from-store"

    // An event dealing with executing JavaScript in the browser.
    EventTypeExecuteJs EventType = "datastar-execute-js"

)