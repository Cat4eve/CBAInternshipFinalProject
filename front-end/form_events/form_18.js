const form18choiceElement = document.getElementById('field-18');
const form18extraElement = document.getElementById('field-18-extra');
const form18extraLabel = document.querySelector('label[for="field-18-extra"]');

form18choiceElement.addEventListener('change', function() {
    if (this.value == 'freeTyping') {
        form18extraElement.hidden = false;
        form18extraElement.disabled = false;
        form18extraLabel.style.display = 'block';
    } else {
        form18extraElement.hidden = true;
        form18extraElement.disabled = true;
        form15extraElement.value = '';
        form18extraLabel.style.display = 'none';
    }
});