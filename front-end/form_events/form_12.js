import { getRate } from "../cba_api.js";
import { SizeClassifier } from "../form_value_enums.js";

const form1choiceElement = document.getElementById('field-1');
const form5choiceElement = document.getElementById('field-5');
const form12choiceElement = document.getElementById('field-12');
const form13choiceElement = document.getElementById('field-13');
const form14choiceElement = document.getElementById('field-14');
const form15choiceElement = document.getElementById('field-15');
const form16choiceElement = document.getElementById('field-16');
const form18choiceElement = document.getElementById('field-18');
const form22choiceElement = document.getElementById('field-22');

let todayUSDRate = null;

(async () => {
    todayUSDRate = await getRate('USD');
})();

form12choiceElement.addEventListener('change', function() {
    const sizeKeys = Object.keys(SizeClassifier);
    const comparableValueInUSD = parseFloat(form12choiceElement.value); 
    if (comparableValueInUSD <= 100) {
      form13choiceElement.value = sizeKeys[0];
    } else {
      let flag = false;
      for (let i = 1; i < sizeKeys.length-1; i++) {
        const [lower, upper] = sizeKeys[i].split('-');
        if (comparableValueInUSD >= parseInt(lower) && comparableValueInUSD <= parseInt(upper)) {
          form13choiceElement.value = sizeKeys[i];
          flag = true;
          break;
        }
      }
      if (!flag) {
        form13choiceElement.value = sizeKeys[sizeKeys.length-1];
      }
    }

    if (form1choiceElement.value == 'intercountry' || form5choiceElement.value == 'freeTyping' ||
        parseFloat(form12choiceElement.value) < 20000
    ) {
        form14choiceElement.value = 'notUsed';
        form14choiceElement.disabled = true;

        form15choiceElement.value = 'notUsed';
        form15choiceElement.disabled = true;

        form16choiceElement.value = 'notUsed';
        form16choiceElement.disabled = true;

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
        form16choiceElement.add(tempOption);
        form16choiceElement.value = "";
        form16choiceElement.disabled = false;

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