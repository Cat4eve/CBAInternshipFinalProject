export const optionFiller = (selectField, options, merged = false) => {
    for (const opt in options) {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = (merged && opt != 'notUsed') ? opt+" - "+options[opt] : options[opt];
        selectField.appendChild(optionElement);
    }
};

export async function fillForm(transactionId) {
    if (!transactionId) return console.warn('No transaction ID provided');

    try {
        const res = await fetch(`http://localhost:3000/transactions/${transactionId}`);
        if (!res.ok) throw new Error(`Failed to fetch transaction: ${res.status}`);
        const data = await res.json();

        const FIELD_MAP = {
            transferType: 'field-1',
            legalStatus: 'field-2',
            transactionType: 'field-3',
            methodOfTransfer: 'field-4',
            transferSystem: 'field-5',
            communicationType: 'field-6',
            senderRegion: 'field-7',
            receiverRegion: 'field-8',
            ISO3166_1Alpha3Countries: 'field-9',
            money: 'field-10',
            ISO4217Currencies: 'field-11',
            moneyToUSD: 'field-12',
            sizeClassifier: 'field-13',
            legalEntityName: 'field-14',
            taxPayerRegistrationNumber: 'field-15',
            segmentMembership: 'field-16',
            residency: 'field-17',
            sideLegalEntityName: 'field-18',
            sideResidency: 'field-19',
            sideLegalStatus: 'field-20',
            intentClassifier: 'field-21',
            intentCode: 'field-22',
            transferAmount: 'field-23',
            sidePayment: 'field-24',
        };

        const EXTRA_FIELDS = {
            'field-5': 'field-5-extra',
            'field-14': 'field-14-extra',
            'field-15': 'field-15-extra',
            'field-18': 'field-18-extra',
        };

        for (const [key, fieldId] of Object.entries(FIELD_MAP)) {
            const el = document.getElementById(fieldId);
            if (!el) continue;

            const value = data[key];
            if (!value) continue;

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = value;
            } else if (el.tagName === 'SELECT') {
                const optionExists = Array.from(el.options).some(opt => opt.value == value);
                if (optionExists) {
                    el.value = value;
                } else {
                    // fallback: add new option if it doesn't exist
                    const newOption = document.createElement('option');
                    newOption.value = value;
                    newOption.text = value;
                    el.add(newOption);
                    el.value = value;
                }
            }

            // Handle extra fields if applicable
            if (EXTRA_FIELDS[fieldId]) {
                const extraEl = document.getElementById(EXTRA_FIELDS[fieldId]);
                if (extraEl) {
                    if (!Array.from(el.options).some(opt => opt.value === value)) {
                        extraEl.value = value;
                        extraEl.hidden = false;
                        extraEl.disabled = false;
                        const extraLabel = extraEl.previousElementSibling;
                        if (extraLabel) extraLabel.style.display = 'inline';
                    } else {
                        extraEl.value = '';
                        extraEl.hidden = true;
                        extraEl.disabled = true;
                        const extraLabel = extraEl.previousElementSibling;
                        if (extraLabel) extraLabel.style.display = 'none';
                    }
                }
            }
        }

        // Update the form number in the title if applicable
        if ('id' in data) {
            const formNumberEl = document.getElementById('form-number');
            if (formNumberEl) formNumberEl.textContent = data.id;
        }

    } catch (err) {
        console.error('Error filling form:', err);
    }
}

export function resetForm(transactionId) {
    const form = document.getElementById('24form');
    if (!form) return;

    form.reset(); // resets inputs and selects to default

    // Hide and disable extra fields
    const extraFields = ['field-5-extra', 'field-14-extra', 'field-15-extra', 'field-18-extra'];
    extraFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = '';
            el.hidden = true;
            el.disabled = true;
            const label = el.previousElementSibling;
            if (label) label.style.display = 'none';
        }
    });

    // Set form number to transaction ID if provided, otherwise default symbol
    const formNumberEl = document.getElementById('form-number');
    if (formNumberEl) formNumberEl.textContent = transactionId ?? '№';
}