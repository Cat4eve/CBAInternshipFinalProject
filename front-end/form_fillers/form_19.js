import { optionFiller } from "../utils/fill_options_in_select.js";

import { SideResigency } from "../form_value_enums.js";

const selectField = document.getElementById('field-19');

optionFiller(selectField, SideResigency);

