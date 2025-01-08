document.getElementById('loan-form').addEventListener('submit', function(e){
    e.preventDefault();

    // Ambil nilai dari input
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const interest = parseFloat(document.getElementById('interest').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    // Hitung angsuran
    const monthlyInterest = interest / 12;
    const numberOfPayments = years;
    const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

    // Tampilkan hasil
    const results = document.getElementById('results');
    results.style.display = 'block';

    const tableBody = document.querySelector('#results table tbody');
    tableBody.innerHTML = ''; // Bersihkan tabel sebelumnya

    let remainingBalance = amount;
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = remainingBalance * monthlyInterest;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        const dueDate = new Date(date);
        dueDate.setMonth(dueDate.getMonth() + i);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${dueDate.toLocaleDateString()}</td>
            <td>Rp${principalPayment.toFixed(2)}</td>
            <td>Rp${interestPayment.toFixed(2)}</td>
            <td>Rp${monthlyPayment.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    }
});
