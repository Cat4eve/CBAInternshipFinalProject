import { optionFiller } from "../utils/fill_options_in_select.js";

import { TransferType } from "../form_value_enums.js";

const selectField = document.getElementById('field-1');

optionFiller(selectField, TransferType);

