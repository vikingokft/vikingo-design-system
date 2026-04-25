/*
 * Vikingo Design System — Web Components entry
 *
 * Importing this module registers all `<vk-*>` Custom Elements with the global
 * customElements registry. Safe to import multiple times — registrations are
 * guarded with `customElements.get(...)` checks.
 *
 * Consumer:
 *   <script type="module" src="@vikingo/ui/html"></script>
 *
 * Or, programmatically:
 *   import '@vikingo/ui/html'
 *
 * For the imperative toast API:
 *   import { vkToast } from '@vikingo/ui/html'
 *   vkToast.success('Mentve')
 *
 * Version 0.7 ships these elements:
 *   - <vk-switch>     toggle (form-associated)
 *   - <vk-checkbox>   checkbox (form-associated)
 *   - <vk-radio-group> + <vk-radio>  roving-tabindex radio set
 *   - <vk-tooltip>    hover/focus reveal
 *   - <vk-tabs> + <vk-tab>  tab list with keyboard nav
 *   - <vk-accordion> + <vk-accordion-item>  collapsible panels
 *   - <vk-dialog>     native <dialog>-based modal (focus trap + backdrop free)
 *   - <vk-toast-host> + vkToast()  notifications
 *
 * v0.8 adds: vk-drawer, vk-popover, vk-dropdown-menu, vk-combobox,
 * vk-date-picker, vk-data-table, vk-command-palette.
 */

import './vk-switch'
import './vk-checkbox'
import './vk-radio-group'
import './vk-tooltip'
import './vk-tabs'
import './vk-accordion'
import './vk-dialog'
import './vk-toast'

export { VkSwitch } from './vk-switch'
export { VkCheckbox } from './vk-checkbox'
export { VkRadioGroup, VkRadio } from './vk-radio-group'
export { VkTooltip } from './vk-tooltip'
export { VkTabs, VkTab } from './vk-tabs'
export { VkAccordion, VkAccordionItem } from './vk-accordion'
export { VkDialog } from './vk-dialog'
export { VkToastHost, vkToast } from './vk-toast'
export type { ToastOptions } from './vk-toast'
