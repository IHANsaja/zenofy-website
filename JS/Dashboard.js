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

// Sales Analysis Charts
const ctxSales = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctxSales, {
    type: 'doughnut',
    data: {
        labels: ['Electric Screen', 'Manual Screen', 'Tripod Screen', 'Projector Stand', 'Projector Lift'],
        datasets: [{
            data: [30, 20, 20, 15, 15],
            backgroundColor: ['#BD2E31', '#176ba3', '#FFD51E', '#478E28', '#502a9b']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    function updateStatusStyles() {
        const statusCells = document.querySelectorAll('.status'); 
        
        statusCells.forEach(cell => {
            const statusText = cell.textContent.trim().toLowerCase();
            cell.classList.remove('status-pending', 'status-canceled', 'status-completed'); 
           
            if (statusText === 'pending') {
                cell.classList.add('status-pending');
            } else if (statusText === 'canceled') {
                cell.classList.add('status-canceled');
            } else if (statusText === 'completed') {
                cell.classList.add('status-completed');
            }
        });
    }

    updateStatusStyles();

    const table = document.querySelector('.status-table');
    const observer = new MutationObserver(updateStatusStyles);
    observer.observe(table, { childList: true, subtree: true });
});


//sidebar funtioning

function showContent(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).style.display = 'block';

    event.target.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    showContent('analytics');
});

const sidebarTabs = document.querySelectorAll(".sidebar ul li");

function handleTabClick(event) {
    sidebarTabs.forEach(tab => tab.classList.remove("active"));

    event.currentTarget.classList.add("active");
}
sidebarTabs.forEach(tab => {
    tab.addEventListener("click", handleTabClick);
});

document.addEventListener("DOMContentLoaded", () => {
    sidebarTabs[0].classList.add("active");
});

//sidebar ends here