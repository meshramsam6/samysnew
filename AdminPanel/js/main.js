const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const UsernameAdmin = localStorage.getItem('UsernameAdmin');
const EmailAdmin = localStorage.getItem('EmailAdmin');


window.onload = function () {
    // Check if the user is logged in
    if (localStorage.getItem('isLoggedInAdmin') !== 'true') {
        // If not logged in, redirect to the login page
        window.location.href = '/AdminPanel/login/login.html';
    }
};

function logout() {
    // Clear session data from localStorage
    localStorage.removeItem('isLoggedInAdmin');
    localStorage.removeItem('UsernameAdmin');
    localStorage.removeItem('EmailAdmin');
    
    // Alert the user about logout
    alert('You have been logged out.');
    
    // Redirect to login page
    window.location.href = '/AdminPanel/login/login.html';
    
    // Prevent back navigation after logout
    history.pushState(null, null, location.href); // Add current state to history
    history.back(); // Go back to the previous page
    history.forward(); // Go forward to the login page
}


if (EmailAdmin) {
    document.getElementById('user-name').textContent = EmailAdmin;
    document.getElementById('user-name-dropdown').textContent = EmailAdmin;
} else {
    document.getElementById('user-name').textContent = 'Guest';
    document.getElementById('user-name-dropdown').textContent = 'Guest';
}


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    $.getJSON('/frontend/checkout.json', function(data) {
        let userRevenue = [];
        let productRevenue = [];
        let productPurchasesByUser = {}; // Object to hold purchases by user
        let userTotalRevenue = 0;
    
        // Process data for charts and table
        for (let email in data) {
            let userOrders = data[email];
            let totalUserRevenue = 0;
    
            // Process all orders for the user
            userOrders.forEach(order => {
                order.cartItems.forEach(item => {
                    let productId = item.product_id;
                    let totalProductPrice = item.total_product_price;
    
                    // Accumulate revenue for each product
                    if (productRevenue[productId]) {
                        productRevenue[productId].revenue += totalProductPrice;
                        productRevenue[productId].quantity += item.quantity;
                    } else {
                        productRevenue[productId] = {
                            revenue: totalProductPrice,
                            quantity: item.quantity,
                            name: item.product_name
                        };
                    }
    
                    // Track purchases by user for grouped bar chart
                    if (!productPurchasesByUser[email]) {
                        productPurchasesByUser[email] = {};
                    }
                    if (productPurchasesByUser[email][productId]) {
                        productPurchasesByUser[email][productId] += item.quantity;
                    } else {
                        productPurchasesByUser[email][productId] = item.quantity;
                    }
    
                    // Accumulate user's total revenue
                    totalUserRevenue += totalProductPrice;
                });
            });
    
            userRevenue.push({
                email: email,
                revenue: totalUserRevenue
            });
    
            userTotalRevenue += totalUserRevenue;
        }
    
        // Sort products by revenue
        productRevenue = Object.values(productRevenue).sort((a, b) => b.revenue - a.revenue);
    
        // Sort Users by Revenue
        userRevenue.sort((a, b) => b.revenue - a.revenue);
    
        // Top 5 Users and Products
        let topUsers = userRevenue.slice(0, 5);
        let topProducts = productRevenue.slice(0, 5);
    
        // Debugging: Check the structure of productPurchasesByUser and data being passed
        console.log('Product Purchases by User:', productPurchasesByUser);
    
        // Chart 1: Bar Chart - Top 5 Users by Total Revenue
        let ctx1 = $("#bar-chart").get(0).getContext("2d");
        new Chart(ctx1, {
            type: "bar",
            data: {
                labels: topUsers.map(user => user.email),
                datasets: [{
                    label: "Revenue",
                    data: topUsers.map(user => user.revenue),
                    backgroundColor: "rgba(235, 22, 22, .7)"
                }]
            },
            options: {
                responsive: true
            }
        });
    
        // Chart 2: Pie Chart - Revenue Distribution Across Top 5 Users
        let ctx2 = $("#pie-chart").get(0).getContext("2d");
        new Chart(ctx2, {
            type: "pie",
            data: {
                labels: topUsers.map(user => user.email),
                datasets: [{
                    backgroundColor: [
                        "rgba(0, 123, 255, 0.7)",
                        "rgba(30, 144, 255, 0.6)",
                        "rgba(70, 130, 180, 0.7)",
                        "rgba(100, 149, 237, 0.6)",
                        "rgba(135, 206, 250, 0.7)"
                    ],
                    data: topUsers.map(user => (user.revenue / userTotalRevenue * 100).toFixed(2))
                }]
            },
            options: {
                responsive: true
            }
        });
    
        // Chart 3: Doughnut Chart - Top 5 Products by Revenue
        let ctx3 = $("#doughnut-chart").get(0).getContext("2d");
        new Chart(ctx3, {
            type: "doughnut",
            data: {
                labels: topProducts.map(product => product.name),
                datasets: [{
                    backgroundColor: [
                        "rgba(0, 123, 255, 0.7)",
                        "rgba(30, 144, 255, 0.6)",
                        "rgba(70, 130, 180, 0.7)",
                        "rgba(100, 149, 237, 0.6)",
                        "rgba(135, 206, 250, 0.7)"
                    ],
                    data: topProducts.map(product => product.revenue)
                }]
            },
            options: {
                responsive: true
            }
        });
    
        // Chart 4: Stacked Bar Chart - Product Quantity vs Revenue per Product
        let ctx4 = $("#stacked-bar-chart").get(0).getContext("2d");
        new Chart(ctx4, {
            type: "bar",
            data: {
                labels: topProducts.map(product => product.name),
                datasets: [
                    {
                        label: "Quantity",
                        data: topProducts.map(product => product.quantity),
                        backgroundColor: "rgba(235, 22, 22, .7)"
                    },
                    {
                        label: "Revenue",
                        data: topProducts.map(product => product.revenue),
                        backgroundColor: "rgba(235, 22, 22, .4)"
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    
        // Chart 5: Line Chart - Revenue Growth Over Time for Top 5 Products
        let ctx5 = $("#line-chart").get(0).getContext("2d");
        new Chart(ctx5, {
            type: "line",
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'], // Replace with actual timestamps
                datasets: topProducts.map(product => ({
                    label: product.name,
                    fill: false,
                    borderColor: "rgba(52, 152, 219, 0.7)",
                    data: [12, 19, 8, 15, 22] // Replace with actual data
                }))
            },
            options: {
                responsive: true
            }
        });
    
        // Chart 6: Grouped Bar Chart - Product Purchases by User
        let ctxGroupedBar = $("#grouped-bar-chart").get(0).getContext("2d");
        let labels = topUsers.map(user => user.email);  // User labels for the x-axis
    
        // Generate datasets for each product
        let datasets = topProducts.map(product => {
            let productPurchases = topUsers.map(user => {
                let email = user.email;
                return productPurchasesByUser[email] && productPurchasesByUser[email][product.product_id] ? productPurchasesByUser[email][product.product_id] : 0;
            });
    
            return {
                label: product.name,
                data: productPurchases,
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                borderWidth: 1
            };
        });
    
        new Chart(ctxGroupedBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: false,  // Allow bars to be side by side
                    },
                    y: {
                        stacked: false,  // Allow bars to be side by side
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    
        // Table: Top 5 Products by Total Revenue
        let tableBody = $("#top-products-table tbody");
        tableBody.empty(); // Ensure table is empty before appending
        topProducts.forEach(product => {
            tableBody.append(`
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.revenue}</td>
                    <td>${(product.revenue / product.quantity).toFixed(2)}</td>
                </tr>
            `);
        });
    });
    

})(jQuery);
