const form1choiceElement = document.getElementById('field-1');
const form3choiceElement = document.getElementById('field-3');
const form7choiceElement = document.getElementById('field-7');
const form8choiceElement = document.getElementById('field-8');

form3choiceElement.addEventListener('change', function() {
    if (form1choiceElement.value == 'international' && this.value == 'received') {
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

    if (form1choiceElement.value == 'international' && this.value == 'sent') {
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
});
