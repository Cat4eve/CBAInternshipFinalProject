import { optionFiller } from "../utils/fill_options_in_select.js";

import { ISO4217Currencies } from "../form_value_enums.js";

const selectField = document.getElementById('field-11');

optionFiller(selectField, ISO4217Currencies, true);

