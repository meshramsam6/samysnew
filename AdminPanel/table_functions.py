# table_functions.py

import pandas as pd

# Function to create a tabular format for the cart and user data
def create_table(data):
    rows = []
    
    for entry in data:
        name = entry["name"]
        phone = entry["phone"]
        address = entry["address"]
        country = entry["country"]
        city = entry["city"]
        email = entry["email"]
        timestamp = entry["timestamp"]
        
        # Process each product in the user's cart
        for product in entry["products"]:
            rows.append({
                "Name": name,
                "Phone": phone,
                "Address": address,
                "Country": country,
                "City": city,
                "Email": email,
                "Product ID": product["product_id"],
                "Product Name": product["product_name"],
                "Quantity": product["quantity"],
                "Total Quantity": entry["total_quantity"],
                "Total Price": entry["total_price"],
                "Timestamp": timestamp
            })
    
    # Create a DataFrame (table) using pandas
    df = pd.DataFrame(rows)
    
    return df

# Function to dynamically update the table when data changes
def update_data(data, new_data):
    data.extend(new_data)  # Add new data to the existing data
    return create_table(data)
