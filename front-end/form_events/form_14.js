const form14choiceElement = document.getElementById('field-14');
const form14extraElement = document.getElementById('field-14-extra');
const form14extraLabel = document.querySelector('label[for="field-14-extra"]');

form14choiceElement.addEventListener('change', function() {
    if (this.value == 'freeTyping') {
        form14extraElement.hidden = false;
        form14extraElement.disabled = false;
        form14extraLabel.style.display = 'block';
    } else {
        form14extraElement.hidden = true;
        form14extraElement.disabled = true;
        form14extraElement.value = '';
        form14extraLabel.style.display = 'none';
    }
});