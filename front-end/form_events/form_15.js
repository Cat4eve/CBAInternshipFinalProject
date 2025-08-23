const form15choiceElement = document.getElementById('field-15');
const form15extraElement = document.getElementById('field-15-extra');
const form15extraLabel = document.querySelector('label[for="field-15-extra"]');

form15choiceElement.addEventListener('change', function() {
    if (this.value == 'freeTyping') {
        form15extraElement.hidden = false;
        form15extraElement.disabled = false;
        form15extraLabel.style.display = 'block';
    } else {
        form15extraElement.hidden = true;
        form15extraElement.disabled = true;
        form15extraElement.value = '';
        form15extraLabel.style.display = 'none';
    }
});