<?php
// Load checkout data
$checkout_data = json_decode(file_get_contents('..\frontend\checkout.json'), true);
date_default_timezone_set('UTC');
// Get today's date in 'Y-m-d' format
$today_date = date('Y-m-d');

// Initialize variables for today's sale, revenue, and total sale, revenue
$today_sale = 0;
$today_revenue = 0;
$total_sale = 0;
$total_revenue = 0;

// Iterate through the checkout data and calculate totals
foreach ($checkout_data as $user_data) {
    foreach ($user_data as $order) {
        // Ensure the order has a valid timestamp
        if (isset($order['timestamp'])) {
            // Extract only the date part (Y-m-d) from the timestamp (format: 'YYYY-MM-DD HH:MM:SS')
            $order_date = substr($order['timestamp'], 0, 10);

            // Check if the order date matches today's date
            if ($order_date === $today_date) {
                // Add today's sale and revenue
                $today_sale += (float) $order['totalPrice'];
                $today_revenue += (float) $order['totalPrice']; // Assuming revenue = totalPrice
            }
        }

        // Add to overall sale and revenue regardless of date
        $total_sale += (float) $order['totalPrice'];
        $total_revenue += (float) $order['totalPrice']; // Assuming revenue = totalPrice
    }
}

// Return the calculated data as JSON
echo json_encode([
    'todaySale' => $today_sale,
    'todayRevenue' => $today_revenue,
    'totalSale' => $total_sale,
    'totalRevenue' => $total_revenue
]);
?> 