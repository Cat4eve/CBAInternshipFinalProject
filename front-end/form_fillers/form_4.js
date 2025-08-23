import { optionFiller } from "../utils/fill_options_in_select.js";

import { MethodOfTransfer } from "../form_value_enums.js";

const selectField = document.getElementById('field-4');

optionFiller(selectField, MethodOfTransfer);

