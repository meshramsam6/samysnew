# main.py

# Import the functions from table_functions.py
from table_functions import create_table, update_data

# Example data (initial data)
data = [
    {
        "name": "durga gajanan bavane",
        "phone": "08010388532",
        "address": "yg",
        "country": "West Bengal",
        "city": "YML",
        "email": "samm9421@gmail.com",
        "products": [
            {"product_id": 8, "product_name": "-", "quantity": 1},
            {"product_id": 1, "product_name": "-", "quantity": 1},
            {"product_id": 3, "product_name": "-", "quantity": 1},
            {"product_id": 18, "product_name": "-", "quantity": 1},
            {"product_id": 19, "product_name": "-", "quantity": 2},
            {"product_id": 20, "product_name": "-", "quantity": 1},
            {"product_id": 2, "product_name": "-", "quantity": 1}
        ],
        "total_quantity": 8,
        "total_price": 32522.00,
        "timestamp": "2024-11-14 14:51:04"
    }
]

# Create the initial table
df_table = create_table(data)
print("Original Table:")
print(df_table)

# New data to add dynamically
new_data = [
    {
        "name": "john doe",
        "phone": "08010000001",
        "address": "street 123",
        "country": "India",
        "city": "Mumbai",
        "email": "john.doe@example.com",
        "products": [
            {"product_id": 10, "product_name": "Delicious Pizza", "quantity": 2},
            {"product_id": 12, "product_name": "Cheesy Garlic Bread", "quantity": 1}
        ],
        "total_quantity": 3,
        "total_price": 10000.00,
        "timestamp": "2024-11-15 10:00:00"
    }
]

# Dynamically update the data and generate the new table
updated_table = update_data(data, new_data)
print("\nUpdated Table after adding new data:")
print(updated_table)
