# Release Notes for Datastar

## 0.20.0 - Unreleased

> [!WARNING]
> This update contains breaking changes to attributes, actions and SSE events.

### Added

- Added SDKs for Go, PHP, .NET  and TypeScript.
- Added the `data-persist` attribute.
- Added the `data-replace-url` attribute.
- Added the `datastar-execute-js` SSE event.
- Added `replaceUrl` examples from both signals and the backend.

### Changed

- Changed the `$$` prefix to `$` for action plugins.
- Changed the `data-header` syntax to accept an object of key-value pairs.
- Renamed the `datastar-delete` SSE event to `datastar-remove`.
- Renamed the `upsert_attributes` merge mode to `upsertAttributes` in the fragment event.
- Renamed the `settle` option to `settleDuration` in the fragment event and changed the default value to `300`.
- Renamed the `vt` option to `useViewTransition` in the fragment event and changed the default value to `false`.

### Removed

- Removed the `~ref` syntax. Use the new `$ref()` action instead.
- Removed the `local` and `session` modifiers from `data-store`. Use the new `data-persist` attribute instead.
- Removed the `datastar-redirect` and `datastar-console` SSE events.  Use the new `datastar-execute-js` SSE event instead.
