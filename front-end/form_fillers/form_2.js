import { optionFiller } from "../utils/fill_options_in_select.js";

import { LegalStatus } from "../form_value_enums.js";

const selectField = document.getElementById('field-2');

optionFiller(selectField, LegalStatus);

