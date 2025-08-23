import { optionFiller } from "../utils/fill_options_in_select.js";

import { SenderRegion } from "../form_value_enums.js";

const selectField = document.getElementById('field-7');

optionFiller(selectField, SenderRegion);

