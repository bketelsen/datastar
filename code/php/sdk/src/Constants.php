<?php

namespace starfederation\datastar;

use starfederation\datastar\enums\FragmentMergeMode;

/**
 * This is auto-generated by Datastar. DO NOT EDIT.
 */
class Constants
{
    public const DatastarKey = 'datastar';
    public const Version = '0.20.0';
    public const VersionClientByteSize = 42817;
    public const VersionClientByteSizeGzip = 14684;
    public const DefaultSettleDuration = 300;
    public const DefaultSseRetryDuration = 1000;
    public const DefaultMergeFragmentsUseViewTransitions = false;
    public const DefaultMergeStoreOnlyIfMissing = false;
    public const DefaultExecuteJsAutoRemove = true;
    public const DefaultCustomEventCancelable = true;
    public const DefaultCustomEventComposed = true;
    public const DefaultCustomEventBubbles = true;
    public const DefaultExecuteJsType = 'module';
    public const DefaultCustomEventSelector = 'document';
    public const DefaultCustomEventDetailJson = '{}';
    public const DefaultFragmentMergeMode = FragmentMergeMode::Morph;
    public const SelectorDatalineLiteral = 'selector ';
    public const MergeModeDatalineLiteral = 'mergeMode ';
    public const SettleDurationDatalineLiteral = 'settleDuration ';
    public const FragmentDatalineLiteral = 'fragment ';
    public const UseViewTransitionDatalineLiteral = 'useViewTransition ';
    public const StoreDatalineLiteral = 'store ';
    public const OnlyIfMissingDatalineLiteral = 'onlyIfMissing ';
    public const PathsDatalineLiteral = 'paths ';
    public const ScriptDatalineLiteral = 'script ';
    public const TypeDatalineLiteral = 'type ';
    public const AutoRemoveDatalineLiteral = 'autoRemove ';
}