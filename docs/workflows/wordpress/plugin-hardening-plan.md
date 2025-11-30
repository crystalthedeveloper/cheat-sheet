# WordPress Plugin Hardening Plan

Break the effort into smaller tickets (e.g., sanitize/escape audit, admin UX/nonce review, JS/CSS linting, block registration cleanup) so each phase remains manageable and testable.

## Ticket Breakdown

1. **Sanitize & Escape Audit**
   - Inventory every output path (shortcodes, blocks, template snippets, admin notices) and ensure `esc_html()`, `esc_url()`, etc., are used consistently.
   - Double-check data coming from the beats JSON file, options, AJAX payloads, and shortcodes.
   - **Deliverable:** diff covering escaping functions plus helper utilities if needed.
2. **Admin UX & Nonce Review**
   - Verify every POST form, AJAX handler, and bulk action has the correct nonce and capability checks.
   - Clean up admin notices/messages, normalize field labels, and ensure settings pages use WordPress form helpers.
   - **Deliverable:** updated admin forms with consistent nonce handling and any UX polish discovered along the way.
3. **JS / CSS Lint & Optimization**
   - Run through `public/js` and `admin/js` for code-style consistency (indentation, `eqeqeq`, `const`/`let` usage, etc.).
   - Apply equivalent cleanup to CSS (group variables, remove dead selectors, ensure consistent naming).
   - **Deliverable:** linted/beautified assets and potentially a starter stylelint/eslint config for automated checks.
4. **Block & Shortcode Registration Cleanup**
   - Review `blocks/` and `includes/beats-shortcodes.php` to ensure metadata matches `block.json`, scripts/styles enqueue only when needed, and naming follows WP standards.
   - Check for unused shortcodes or duplicated logic that can be consolidated.
   - **Deliverable:** tidy block registration (possibly a `register_block_type_from_metadata` pass) and streamlined shortcode handlers.

Pick whichever ticket should kick off the hardening (e.g., start with sanitization) and tackle them sequentially.

## Risk Focus & Priorities

1. **Frontend File Upload (highest risk)** – Only checks `is_user_logged_in()` plus a basic nonce. Uses `move_uploaded_file()` directly and trusts extension lists without MIME inspection, file-size limits, or capabilities. Image upload lacks WP sanitizers, and metadata (price, buy URL) is only lightly validated.
2. **AJAX `load_more_beats` endpoint (medium risk)** – Relies on a single nonce. Offset is cast to `int`, but any visitor with the nonce can hammer infinite-scroll or probe the data store. No rate limiting and no caps on `$limit`.
3. **Shortcode/block output (lower risk after recent cleanup)** – Rendering helper now centralizes escaping, but legacy shortcodes still echo HTML manually. Several templates (`beats_cltd_category_search`, overlay markup) mix PHP/HTML without a consistent escaping policy, so regressions are possible, especially if new JSON fields are added.

## Actionable Tickets

1. **Upload Pipeline Hardening**
   - Require a capability (e.g., `upload_files`) and bail for subscribers if not allowed.
   - Swap manual `move_uploaded_file()` for `wp_handle_upload()`/`media_handle_sideload()` to leverage core MIME/type validation, size enforcement, and sanitized filenames.
   - Enforce maximum file sizes (audio + artwork) and validate MIME via `wp_check_filetype_and_ext()`.
   - Normalize and sanitize metadata before persistence (e.g., `sanitize_text_field`, `sanitize_textarea_field`, `esc_url_raw`), and reject malformed prices/URLs with clear errors.
   - Store uploads with randomized names inside the plugin’s private folders plus add `.htaccess`/`web.config` (or rewrite rules) to block direct PHP execution.
2. **AJAX Endpoint Controls**
   - Add a `beats_ajax_can_request()` helper that checks the nonce and throttles requests per IP/user (transient-based rate limiting).
   - Introduce a maximum `$limit` cap and early bail if `$offset` exceeds total categories to stop scanning.
   - Return `wp_send_json_error` with HTTP status codes (`wp_send_json_error(..., 429/400)`) to simplify client handling and logging.
   - Log repeated failures (via `error_log` or a custom action) so abuse is traceable.
3. **Shortcode/Renderer Audit**
   - Move every shortcode output to the new `beats_render_shortcode_block()` conventions: build strings with `sprintf` + escaping helpers (`esc_attr`, `wp_kses_post`, `wp_kses` with a whitelist).
   - Extract repeated markup (cards, overlays, search container) into template helpers that rigorously escape attributes/content.
   - Add PHPUnit (or basic integration) tests that snapshot rendered HTML given sample JSON entries to guard against future unsafe output.

Once those tickets land, iterate through the plugin review checklist (coding standards, text domain, assets, translation strings, readme requirements, etc.).

## Plugin Review Checklist (Current Status)

1. **Plugin headers & licensing** – `temp_plugin/beats-upload-player/beats-upload-player.php#L1-14` already contains the required header fields (name, URI, description, version, author, license). GPL v2+ is declared, so licensing requirements are satisfied.
2. **Coding standards / escaping** – Recent work centralized output in helpers like `beats_render_beat_card()` (`includes/beats-functions.php#L147-210`), so the front-end cards, overlay buttons, and data attributes all go through `esc_html()`/`esc_attr()`/`esc_url()`. Shortcodes that still echo HTML (e.g., `beats_cltd_upload_form_shortcode()` in `includes/beats-shortcodes.php#L266-324`) now rely on sanitized helpers and localized strings. No remaining `echo` statements with raw user data spotted, but future additions should be reviewed.
3. **Text domain / internationalization** – All `__()`, `_e()`, etc., use `beats-upload-player`, and new user-facing strings (upload form button, JS status messages) go through `wp_localize_script()` in `beats-upload-player.php#L323-333`, keeping them translatable.
4. **Ajax / file uploads** – The upload form posts to the registered `beats_frontend_upload` AJAX action (`includes/beats-shortcodes.php#L161-213`). Nonce verification, permission filtering, and file handling sit in `beats_process_frontend_upload_submission()`, which uses `wp_handle_upload` to enforce MIME/size rules. Rate limiting for the infinite scroll endpoint was added earlier in `includes/beats-functions.php#L109-144`.
5. **Security hygiene** – Private upload directories (`beats_paths()`, `beats_ensure_storage_locations()`) write `.htaccess` and `index.html` files, and front-end uploads are only allowed for logged-in users by default (overridable via `beats_user_can_frontend_upload()`). All AJAX handlers exit via `wp_send_json_*`.
6. **Assets / script enqueues** – Every block/shortcode enqueues its CSS/JS via `beats_register_public_assets()` and there are no inline `<script>` blocks inserting raw data. The new `public/js/beats-upload-form.js` is registered and localized properly.
7. **Readme / documentation** – README already explains how to launch Playground, mentions bundled ZIP, environment flags, etc. Before submission add the standard sections (Description, Installation, FAQ, Changelog) if they aren’t structured per WordPress.org expectations; otherwise this requirement is covered.

## Submission Prep

Everything on the checklist now passes locally. Before pushing, clear any lingering `.git/index.lock`, stage `assets/beats-upload-player.zip` plus `temp_plugin`, commit, and push. Ask if you’d like help drafting the final readme formatting or prepping the ZIP for submission.
