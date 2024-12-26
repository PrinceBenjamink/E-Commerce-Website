const showBillButton = document.getElementById('showBillButton');
const billDetails = document.getElementById('billDetails');
const downloadButton = document.getElementById('downloadInvoice');
const billTable = document.getElementById('billTable');
const customerDetails = document.getElementById('customerDetails');

// Load data from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails')) || { name: '', address: '', phone: '' };

// Populate customer details
customerDetails.textContent = `${paymentDetails.name}, ${paymentDetails.address}, ${paymentDetails.phone}`;

// Populate the bill table dynamically
let grandTotal = 0;
cartItems.forEach(item => {
    const total = item.price * item.quantity;
    grandTotal += total;
    const row = `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.price.toFixed(2)}</td>
            <td>Rs. ${total.toFixed(2)}</td>
        </tr>
    `;
    billTable.insertAdjacentHTML('beforeend', row);
});

// Add grand total row
billTable.insertAdjacentHTML('beforeend', `
    <tr>
        <td colspan="3" style="text-align: right;"><strong>Grand Total</strong></td>
        <td><strong>Rs. ${grandTotal.toFixed(2)}</strong></td>
    </tr>
`);

// Show the bill
showBillButton.addEventListener('click', () => {
    billDetails.style.display = 'block';
    showBillButton.style.display = 'none';
});

// Download the invoice as PDF
downloadButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title and customer details
    doc.text('Invoice', 105, 15, { align: 'center' });
    doc.text(`Customer: ${paymentDetails.name}`, 10, 30);
    doc.text(`Address: ${paymentDetails.address}`, 10, 40);
    doc.text(`Phone: ${paymentDetails.phone}`, 10, 50);
    doc.text('Payment Method: Cash on Delivery', 10, 60);

    // Add table
    const tableData = cartItems.map(item => [
        item.name,
        item.quantity,
        `Rs. ${item.price.toFixed(2)}`,
        `Rs. ${(item.price * item.quantity).toFixed(2)}`
    ]);
    tableData.push(['', '', 'Grand Total', `Rs. ${grandTotal.toFixed(2)}`]);

    doc.autoTable({
        head: [['Item', 'Quantity', 'Price', 'Total']],
        body: tableData,
        startY: 70,
    });

    doc.save('invoice.pdf');
});