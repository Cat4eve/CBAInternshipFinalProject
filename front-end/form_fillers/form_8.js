import { optionFiller } from "../utils/fill_options_in_select.js";

import { ReceiverRegion } from "../form_value_enums.js";

const selectField = document.getElementById('field-8');

optionFiller(selectField, ReceiverRegion);

