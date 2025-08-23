const deleteBtn = document.getElementById('delete');
const span = document.getElementById('form-number');

deleteBtn.addEventListener('click', async () => {
    const formNumber = Number(span.textContent.trim());
    const response = await fetch(`http://localhost:3000/transactions/${formNumber}`, {
        method: "DELETE"
    });
    location.reload();
});
