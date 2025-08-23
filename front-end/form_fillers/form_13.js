import { optionFiller } from "../utils/fill_options_in_select.js";

import { SizeClassifier } from "../form_value_enums.js";

const selectField = document.getElementById('field-13');

optionFiller(selectField, SizeClassifier, false);

