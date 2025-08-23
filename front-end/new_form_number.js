import { fillForm, resetForm } from "./utils/fill_options_in_select.js";

const span = document.getElementById('form-number');
const h1 = document.getElementById("title");
const saveBtn = document.getElementById('save');
const deleteBtn = document.getElementById('delete');
const submitBtn = document.getElementById('submit');

span.addEventListener('input', async () => {
  let formNumber = span.textContent.trim();
  if (!formNumber) return;
  formNumber = Number(formNumber);
  
  let text = h1.childNodes[h1.childNodes.length - 1].textContent.trim();
  let words = text.split(" ");
  try {
    const response = await fetch(`http://localhost:3000/transactions/${formNumber}`);
    if (response.ok) {
        words[words.length - 1] = "փոփոխում";
        submitBtn.hidden = true;
        saveBtn.hidden = false;
        deleteBtn.hidden = false;
        fillForm(formNumber);
    } else {
        words[words.length - 1] = "լրացում";
        submitBtn.hidden = false;
        saveBtn.hidden = true;
        deleteBtn.hidden = true;
        resetForm(nextTransactionId);
    }
  } catch (err) {
    console.error('Failed to fetch next transaction ID:', err);
  }
  h1.childNodes[h1.childNodes.length - 1].textContent = " " + words.join(" ");
});

let nextTransactionId;

(async function fetchNextId() {
  try {
    const response = await fetch('http://localhost:3000/transactions/next-id');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
    const { nextId } = await response.json();
    nextTransactionId = nextId;

    const numberSpan = document.getElementById('form-number');
    numberSpan.textContent = `${nextId}`;

  } catch (err) {
    console.error('Failed to fetch next transaction ID:', err);
  }
})();