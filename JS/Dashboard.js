// Daily Income Chart
const ctxIncome = document.getElementById('incomeChart').getContext('2d');
const incomeChart = new Chart(ctxIncome, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Income',
            data: [300, 400, 450, 500, 600, 700, 750],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

// Sales Analysis Chart
const ctxSales = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctxSales, {
    type: 'doughnut',
    data: {
        labels: ['Electric Screen', 'Manual Screen', 'Tripod Screen', 'Projector Stand', 'Projector Lift'],
        datasets: [{
            data: [30, 20, 20, 15, 15],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});
