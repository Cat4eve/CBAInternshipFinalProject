import { optionFiller } from "../utils/fill_options_in_select.js";

import { SideLegalStatus } from "../form_value_enums.js";

const selectField = document.getElementById('field-20');

optionFiller(selectField, SideLegalStatus);

