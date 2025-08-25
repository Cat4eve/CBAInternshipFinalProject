import { ISO3166_1Alpha3Countries } from "../form_value_enums.js";
import { optionFiller } from "../utils/fill_options_in_select.js";

const form1choiceElement = document.getElementById('field-1');
const form3choiceElement = document.getElementById('field-3');
const form5choiceElement = document.getElementById('field-5');
const form7choiceElement = document.getElementById('field-7');
const form8choiceElement = document.getElementById('field-8');
const form9choiceElement = document.getElementById('field-9');
const form12choiceElement = document.getElementById('field-12');
const form14choiceElement = document.getElementById('field-14');
const form15choiceElement = document.getElementById('field-15');
const form17choiceElement = document.getElementById('field-17');
const form18choiceElement = document.getElementById('field-18');
const form22choiceElement = document.getElementById('field-22');

form1choiceElement.addEventListener('change', function() {
    if (this.value == 'international') {
        for (let i = 0; i < form9choiceElement.options.length; i++) {
            if (form9choiceElement.options[i].value == 'ARM') {
                form9choiceElement.remove(i);
                break;
            }
        }
    } else {
        for (let i = form9choiceElement.options.length - 1; i >= 0; i--) {
            form9choiceElement.remove(i);
        }
        optionFiller(form9choiceElement, ISO3166_1Alpha3Countries, true);
        const tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form9choiceElement.add(tempOption);
        form9choiceElement.value = "";
    }

    if (this.value == 'international' && form3choiceElement.value == 'received') {
        form7choiceElement.value = "notUsed"; 
        form7choiceElement.disabled = true;
    } else {
        const tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form7choiceElement.add(tempOption);
        form7choiceElement.value = "";
        form7choiceElement.disabled = false;
    }

    if (this.value == 'international' && form3choiceElement.value == 'sent') {
        form8choiceElement.value = 'notUsed';
        form8choiceElement.disabled = true;
    } else {
        const tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form8choiceElement.add(tempOption);
        form8choiceElement.value = "";
        form8choiceElement.disabled = false;
    }

    if (this.value == 'intercountry' || form5choiceElement.value == 'freeTyping' ||
        parseFloat(Number(form12choiceElement.value)) < 20000
    ) {
        form14choiceElement.value = 'notUsed';
        form14choiceElement.disabled = true;

        form15choiceElement.value = 'notUsed';
        form15choiceElement.disabled = true;

        form17choiceElement.value = 'notUsed';
        form17choiceElement.disabled = true;

        form18choiceElement.value = 'notUsed';
        form18choiceElement.disabled = true;

        form22choiceElement.value = 'notUsed';
        form22choiceElement.disabled = true;
    } else {
        let tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form14choiceElement.add(tempOption);
        form14choiceElement.value = "";
        form14choiceElement.disabled = false;

        tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form15choiceElement.add(tempOption);
        form15choiceElement.value = "";
        form15choiceElement.disabled = false;

        tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form17choiceElement.add(tempOption);
        form17choiceElement.value = "";
        form17choiceElement.disabled = false;

        tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form18choiceElement.add(tempOption);
        form18choiceElement.value = "";
        form18choiceElement.disabled = false;

        tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form22choiceElement.add(tempOption);
        form22choiceElement.value = "";
        form22choiceElement.disabled = false;
    }
});
