<?php
require('fpdf/fpdf.php'); // Ensure the path to FPDF is correct

// Simulated orders (You can replace this with actual database retrieval)
$orders = [
    [
        "orderId" => "12345",
        "date" => "2024-10-01",
        "title" => "Product 1",
        "price" => 100,
        "quantity" => 1,
        "total" => 100,
    ],
    [
        "orderId" => "67890",
        "date" => "2024-10-05",
        "title" => "Product 2",
        "price" => 200,
        "quantity" => 2,
        "total" => 400,
    ]
];

// Get orderId from the URL
$orderId = $_GET['orderId'];
$order = null;

// Fetch order details from simulated data
foreach ($orders as $o) {
    if ($o['orderId'] == $orderId) {
        $order = $o;
        break;
    }
}

if ($order) {
    // Create PDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Invoice', 0, 1, 'C');
    $pdf->SetFont('Arial', '', 12);
    
    // Order Details
    $pdf->Cell(0, 10, 'Order ID: ' . $order['orderId'], 0, 1);
    $pdf->Cell(0, 10, 'Order Date: ' . $order['date'], 0, 1);
    $pdf->Cell(0, 10, 'Product: ' . $order['title'], 0, 1);
    $pdf->Cell(0, 10, 'Price: ₹' . $order['price'], 0, 1);
    $pdf->Cell(0, 10, 'Quantity: ' . $order['quantity'], 0, 1);
    $pdf->Cell(0, 10, 'Total: ₹' . $order['total'], 0, 1);

    // Output PDF
    $pdf->Output('D', 'Invoice_' . $order['orderId'] . '.pdf'); // Force download
} else {
    echo "Order not found.";
}
?>
