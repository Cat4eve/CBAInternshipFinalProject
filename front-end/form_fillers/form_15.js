import { optionFiller } from "../utils/fill_options_in_select.js";

import { TaxPayerRegistrationNumber } from "../form_value_enums.js";

const selectField = document.getElementById('field-15');

optionFiller(selectField, TaxPayerRegistrationNumber);

