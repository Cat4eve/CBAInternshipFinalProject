import { IntentCode } from "../form_value_enums.js";
import { optionFiller } from "../utils/fill_options_in_select.js";

const form1choiceElement = document.getElementById('field-1');
const form2choiceElement = document.getElementById('field-2');
const form5choiceElement = document.getElementById('field-5');
const form12choiceElement = document.getElementById('field-12');
const form14choiceElement = document.getElementById('field-14');
const form15choiceElement = document.getElementById('field-15');
const form15extraElement = document.getElementById('field-15-extra');
const form21choiceElement = document.getElementById('field-21');
const form22choiceElement = document.getElementById('field-22');

form2choiceElement.addEventListener('change', function() {
    if (this.value == 'legalEntity') {
        form15extraElement.minLength = 8;
        form15extraElement.maxLength = 8;
    } else {
        form15extraElement.removeAttribute('minLength');
        form15extraElement.removeAttribute('maxLength');
    }

    if (this.value == 'legalEntity') {
        for (let i = 0; i < form22choiceElement.options.length; i++) {
            if (form22choiceElement.options[i].value == '3010') {
                form22choiceElement.remove(i);
                break;
            }
        }
    } else {
        for (let i = form22choiceElement.options.length - 1; i >= 0; i--) {
            form22choiceElement.remove(i);
        }
        optionFiller(form22choiceElement, IntentCode, true);
        const tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form22choiceElement.add(tempOption);
        form22choiceElement.value = "";
    }

    if (this.value == 'legalEntity' && form21choiceElement.value == 'nonCommercial') {
        for (let i = form22choiceElement.options.length - 1; i >= 0; i--) {
            const numericKeyFromValue = parseInt(Object.keys(IntentCode).find(key => 
                key === form22choiceElement.options[i].value
            ));
            if (numericKeyFromValue < 4000 || numericKeyFromValue >= 6000) {
                form22choiceElement.remove(i);
            }
        }
    } else {
        for (let i = form22choiceElement.options.length - 1; i >= 0; i--) {
            form22choiceElement.remove(i);
        }
        optionFiller(form22choiceElement, IntentCode, true);
        const tempOption = new Option("Ընտրել Տարբերակ", "", true, true);
        tempOption.disabled = true;
        tempOption.hidden = true;
        form22choiceElement.add(tempOption);
        form22choiceElement.value = "";
    }

    if (this.value == 'solePropriator' || this.value == 'naturalPerson') {
        form14choiceElement.value = 'notUsed';
        form14choiceElement.disabled = true;

        form15choiceElement.value = 'notUsed';
        form15choiceElement.disabled = true;
    } else {
        if (form1choiceElement.value != 'intercountry' && form5choiceElement.value != 'freeTyping' &&
            parseFloat(Number(form12choiceElement.value)) >= 20000
        ) {
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
        }
    }
});