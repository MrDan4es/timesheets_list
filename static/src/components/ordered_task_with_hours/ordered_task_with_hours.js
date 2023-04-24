/** @odoo-module **/

import { registry } from "@web/core/registry";
import { AutoComplete } from "@web/core/autocomplete/autocomplete";
import { Many2OneField } from "@web/views/fields/many2one/many2one_field";
import { Many2XAutocomplete } from "@web/views/fields/relational_utils";

class OrderedTaskWithHours extends Many2OneField {
  get canCreate() {
    return Boolean(this.context.default_project_id);
  }

  /**
   * @override
   */
  get displayName() {
    const displayName = super.displayName;
    return displayName ? displayName.split("\u00A0")[0] : displayName;
  }

  /**
   * @override
   */
  get context() {
    return { ...super.context, hr_timesheet_display_remaining_hours: true };
  }

  /**
   * @override
   */
  get Many2XAutocompleteProps() {
    const props = super.Many2XAutocompleteProps;
    if (!this.canCreate) {
      props.quickCreate = null;
    }
    return props;
  }

  /**
   * @override
   */
  computeActiveActions(props) {
    super.computeActiveActions(props);
    const activeActions = this.state.activeActions;
    activeActions.create = activeActions.create && this.canCreate;
    activeActions.createEdit = activeActions.create;
  }
}

// class OrderedMany2XAutocomplete extends Many2XAutocomplete {
//   async loadOptionsSource(request) {
//     if (this.lastProm) {
//       this.lastProm.abort(false);
//     }
//     this.lastProm = this.orm.call(this.props.resModel, "name_search", [], {
//       name: request,
//       operator: "ilike",
//       args: this.props.getDomain(),
//       limit: this.props.searchLimit + 1,
//       context: this.props.context,
//     });
//     const records = await this.lastProm;

//     const options = records.map((result) => ({
//       value: result[0],
//       label: result[1].split("\n")[0],
//     }));

//     if (this.props.quickCreate && request.length) {
//       options.push({
//         label: sprintf(this.env._t(`Create "%s"`), request),
//         classList: "o_m2o_dropdown_option o_m2o_dropdown_option_create",
//         action: async (params) => {
//           try {
//             await this.props.quickCreate(request, params);
//           } catch {
//             const context = this.getCreationContext(request);
//             return this.openMany2X({ context });
//           }
//         },
//       });
//     }

//     if (!this.props.noSearchMore && this.props.searchLimit < records.length) {
//       options.push({
//         label: this.env._t("Search More..."),
//         action: this.onSearchMore.bind(this, request),
//         classList: "o_m2o_dropdown_option o_m2o_dropdown_option_search_more",
//       });
//     }

//     const canCreateEdit =
//       "createEdit" in this.activeActions
//         ? this.activeActions.createEdit
//         : this.activeActions.create;
//     if (
//       !request.length &&
//       !this.props.value &&
//       (this.props.quickCreate || canCreateEdit)
//     ) {
//       options.push({
//         label: this.env._t("Start typing..."),
//         classList: "o_m2o_start_typing",
//         unselectable: true,
//       });
//     }

//     if (request.length && canCreateEdit) {
//       const context = this.getCreationContext(request);
//       options.push({
//         label: this.env._t("Create and edit..."),
//         classList: "o_m2o_dropdown_option o_m2o_dropdown_option_create_edit",
//         action: () => this.openMany2X({ context }),
//       });
//     }

//     if (!records.length && !this.activeActions.create) {
//       options.push({
//         label: this.env._t("No records"),
//         classList: "o_m2o_no_result",
//         unselectable: true,
//       });
//     }

//     return options;
//   }
// }
// OrderedMany2XAutocomplete.template = "web.Many2XAutocomplete";
// OrderedMany2XAutocomplete.components = { AutoComplete };
// OrderedMany2XAutocomplete.defaultProps = {
//   searchLimit: 7,
//   searchMoreLimit: 320,
//   nameCreateField: "name",
//   value: "",
//   setInputFloats: () => {},
//   quickCreate: null,
// };
// OrderedTaskWithHours.components = {
//   OrderedMany2XAutocomplete,
// };

registry
  .category("fields")
  .add("ordered_task_with_hours", OrderedTaskWithHours);
