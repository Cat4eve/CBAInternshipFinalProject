import { optionFiller } from "../utils/fill_options_in_select.js";

import { SideLegalEntityName } from "../form_value_enums.js";

const selectField = document.getElementById('field-18');

optionFiller(selectField, SideLegalEntityName);

