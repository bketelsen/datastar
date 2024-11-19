<?php

namespace starfederation\datastar;

use starfederation\datastar\enums\FragmentMergeMode;

/**
 * This is auto-generated by Datastar. DO NOT EDIT.
 */
class Consts
{
    public const DATASTAR_KEY = 'datastar';
    public const VERSION = '0.20.0-beta-1';
    public const VERSION_CLIENT_BYTE_SIZE = 42952;
    public const VERSION_CLIENT_BYTE_SIZE_GZIP = 14720;
    public const DEFAULT_SETTLE_DURATION = 300;
    public const DEFAULT_SSE_RETRY_DURATION = 1000;
    public const DEFAULT_FRAGMENTS_USE_VIEW_TRANSITIONS = false;
    public const DEFAULT_MERGE_SIGNALS_ONLY_IF_MISSING = false;
    public const DEFAULT_EXECUTE_SCRIPT_AUTO_REMOVE = true;
    public const DEFAULT_CUSTOM_EVENT_CANCELABLE = true;
    public const DEFAULT_CUSTOM_EVENT_COMPOSED = true;
    public const DEFAULT_CUSTOM_EVENT_BUBBLES = true;
    public const DEFAULT_EXECUTE_SCRIPT_ATTRIBUTES = 'type module';
    public const DEFAULT_CUSTOM_EVENT_SELECTOR = 'document';
    public const DEFAULT_CUSTOM_EVENT_DETAIL_JSON = '{}';
    public const DEFAULT_FRAGMENT_MERGE_MODE = FragmentMergeMode::Morph;
    public const SELECTOR_DATALINE_LITERAL = 'selector ';
    public const MERGE_MODE_DATALINE_LITERAL = 'mergeMode ';
    public const SETTLE_DURATION_DATALINE_LITERAL = 'settleDuration ';
    public const FRAGMENTS_DATALINE_LITERAL = 'fragments ';
    public const USE_VIEW_TRANSITION_DATALINE_LITERAL = 'useViewTransition ';
    public const SIGNALS_DATALINE_LITERAL = 'signals ';
    public const ONLY_IF_MISSING_DATALINE_LITERAL = 'onlyIfMissing ';
    public const PATHS_DATALINE_LITERAL = 'paths ';
    public const SCRIPT_DATALINE_LITERAL = 'script ';
    public const ATTRIBUTES_DATALINE_LITERAL = 'attributes ';
    public const AUTO_REMOVE_DATALINE_LITERAL = 'autoRemove ';
}