import { optionFiller } from "../utils/fill_options_in_select.js";

import { IntentClassifier } from "../form_value_enums.js";

const selectField = document.getElementById('field-21');

optionFiller(selectField, IntentClassifier);

