import { optionFiller } from "../utils/fill_options_in_select.js";

import { IntentCode } from "../form_value_enums.js";

const selectField = document.getElementById('field-22');

optionFiller(selectField, IntentCode, true);

