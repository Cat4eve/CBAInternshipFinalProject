import { optionFiller } from "../utils/fill_options_in_select.js";

import { TransferSystem } from "../form_value_enums.js";

const selectField = document.getElementById('field-5');

optionFiller(selectField, TransferSystem);

