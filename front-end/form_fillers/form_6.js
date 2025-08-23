import { optionFiller } from "../utils/fill_options_in_select.js";

import { CommunicationType } from "../form_value_enums.js";

const selectField = document.getElementById('field-6');

optionFiller(selectField, CommunicationType);

