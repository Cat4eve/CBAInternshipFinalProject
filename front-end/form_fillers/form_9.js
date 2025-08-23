import { optionFiller } from "../utils/fill_options_in_select.js";

import { ISO3166_1Alpha3Countries } from "../form_value_enums.js";

const selectField = document.getElementById('field-9');

optionFiller(selectField, ISO3166_1Alpha3Countries, true);

