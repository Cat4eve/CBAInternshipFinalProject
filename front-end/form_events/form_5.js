const form1choiceElement = document.getElementById('field-1');
const form5choiceElement = document.getElementById('field-5');
const form5extraElement = document.getElementById('field-5-extra');
const form5extraLabel = document.querySelector('label[for="field-5-extra"]');
const form12choiceElement = document.getElementById('field-12');
const form14choiceElement = document.getElementById('field-14');
const form15choiceElement = document.getElementById('field-15');
const form16choiceElement = document.getElementById('field-16');
const form18choiceElement = document.getElementById('field-18');
const form22choiceElement = document.getElementById('field-22');


form5choiceElement.addEventListener('change', function() {
    if (this.value == 'freeTyping') {
        form5extraElement.hidden = false;
        form5extraElement.disabled = false;
        form5extraLabel.style.display = 'block';
    } else {
        form5extraElement.hidden = true;
        form5extraElement.disabled = true;
        form5extraElement.value = '';
        form5extraLabel.style.display = 'none';
    }

    if (form1choiceElement.value == 'intercountry' || form5choiceElement.value == 'freeTyping' ||
        parseFloat(Number(form12choiceElement.value)) < 20000
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