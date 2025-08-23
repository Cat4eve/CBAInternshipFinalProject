const form2choiceElement = document.getElementById('field-2');
const form5choiceElement = document.getElementById('field-5');
const form5extraElement = document.getElementById('field-5-extra');
const form5extraLabel = document.querySelector('label[for="field-5-extra"]');
const form20choiceElement = document.getElementById('field-20');
const form21choiceElement = document.getElementById('field-21');

form21choiceElement.addEventListener('change', function() {
    if (this.value == 'selfAccounts' && form2choiceElement.value == 'legalEntity') {
        form20choiceElement.value = 'legalEntity';
        form20choiceElement.disabled = true;
    } else {
        form20choiceElement.disabled = false;
    }

    if (this.value == 'selfAccounts') {
        if (form5choiceElement.value == 'freeTyping') {
            form5extraElement.hidden = true;
            form5extraElement.disabled = true;
            form5extraElement.value = '';
            form5extraLabel.style.display = 'none';
        }
        form5choiceElement.value = 'correspondentAccounts';
        form5choiceElement.disabled = true;
    } else {
        form5choiceElement.disabled = false;
    }
});