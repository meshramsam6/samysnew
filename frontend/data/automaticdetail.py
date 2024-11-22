import json

def generate_detail(product_name):
  """Generates a detailed description for a food product based on its name."""

  details = {
    "Tasty French Fries": "Crispy on the outside and soft on the inside, our Tasty French Fries are freshly cut and fried to golden perfection. A sprinkle of sea salt enhances their natural flavor, making them the perfect side or snack for any occasion.",
    "BBQ Ribs": "Succulent and smoky, our BBQ Ribs are slow-cooked to tender perfection and glazed with a rich, tangy barbecue sauce. Perfect for a hearty meal or a festive gathering, every bite bursts with flavor.",
    "Fish and Chips": "A classic favorite, our Fish and Chips feature flaky white fish fried in a light, crispy batter, paired with golden fries. Served with a side of tangy tartar sauce, this dish is a timeless treat.",
    "Gulab Jamun": "Indulge in the sweetness of Gulab Jamun, a traditional Indian dessert made from deep-fried dough balls soaked in aromatic sugar syrup. Soft, spongy, and irresistibly delicious.",
    "Ice Cream": "Cool down with our creamy and refreshing Ice Cream. Available in a variety of flavors, our ice cream is made with fresh ingredients and churned to perfection. Enjoy it in a cone, cup, or as a topping for your favorite desserts.",
    "Beef Wellington": "Experience gourmet dining with our Beef Wellington, featuring tender beef fillet encased in a layer of savory mushroom duxelles and wrapped in flaky puff pastry. A perfect choice for special occasions.",
    "Vegetable Fried Rice": "Savor the flavors of the Orient with our Vegetable Fried Rice. This dish features a medley of fresh vegetables and fluffy rice, stir-fried to perfection with aromatic spices. A wholesome and satisfying meal on its own or as a side dish.",
    "Toasted Bread": "Our Toasted Bread is a simple yet satisfying choice, offering warm slices of bread toasted to a light crunch. Perfectly paired with butter, jams, or dips, it complements any meal or serves as a quick snack on its own.",
    "Chicken Tikka": "Juicy and flavorful, our Chicken Tikka is marinated in a blend of aromatic spices and grilled to perfection. This Indian delicacy is a crowd-pleaser, whether served as an appetizer or main dish.",
    "Lemonade": "Quench your thirst with our refreshing Lemonade, made with freshly squeezed lemons, a touch of sweetness, and a hint of zest. Perfectly balanced and ideal for hot summer days.",
    "Vegetable Pad Thai": "Our Vegetable Pad Thai combines rice noodles, crisp vegetables, and a savory-sweet sauce made with tamarind and peanuts. A delightful take on the classic Thai street food, perfect for any meal.",
    "Fried Shrimp": "Enjoy the crispy delight of our Fried Shrimp, coated in a golden batter and deep-fried to perfection. Served with tangy dipping sauces, it’s a seafood lover's dream.",
    "Sweet and Sour Chicken": "Our Sweet and Sour Chicken features tender chicken pieces tossed in a vibrant sauce that balances tangy and sweet flavors. Served with rice or noodles, this dish is a hit for all ages.",
    "Tacos": "Dive into our Tacos, featuring soft or crunchy shells filled with a variety of flavorful fillings like seasoned meat, fresh vegetables, and tangy sauces. A handheld delight for any occasion.",
    "Meatball Sandwich": "Sink your teeth into our Meatball Sandwich, loaded with juicy meatballs, marinara sauce, and melted cheese, all nestled in a freshly baked sub roll. A hearty and satisfying choice.",
    "Veggie Burger": "Our Veggie Burger is a plant-based masterpiece, featuring a flavorful patty made from fresh vegetables and grains. Topped with crisp lettuce, ripe tomatoes, and your choice of condiments.",
    "Samosa": "Relish the crispy goodness of our Samosas, stuffed with a spiced potato and pea filling. These golden triangles are perfect as a snack, appetizer, or party treat.",
    "Burger Patty Recipe": "Craft the ultimate burger at home with our premium Burger Patty Recipe. Made with high-quality ground meat, expertly seasoned with aromatic herbs and spices, these patties are juicy and packed with flavor. Perfectly versatile, they pair wonderfully with any bun, toppings, and condiments.",
    "Vegetable Spring Rolls": "Crisp and flavorful, our Vegetable Spring Rolls are filled with a mix of fresh vegetables and seasoned to perfection. These rolls are deep-fried until golden and served with tangy dipping sauce.",
    "Burrito": "Wrap up your cravings with our Burrito, stuffed with seasoned meat, beans, rice, cheese, and fresh vegetables. Rolled in a soft tortilla, it’s a meal that satisfies every time.",
    "Fish Tacos": "Our Fish Tacos feature tender fish fillets seasoned and grilled to perfection, served in soft tortillas with fresh slaw and tangy sauces. A coastal favorite for any meal.",
    "Cheesecake": "Indulge in our creamy and luscious Cheesecake, made with smooth cream cheese and a buttery graham cracker crust. Perfect for dessert lovers of all ages.",
    "Crispy Fried Chicken": "A classic delight, our Crispy Fried Chicken is seasoned to perfection, marinated in flavorful spices, and deep-fried to achieve a golden, crunchy exterior. Each bite delivers a juicy, tender interior with a satisfying crunch, making it an irresistible favorite for any meal or snack.",
    "Caesar Salad": "Crisp romaine lettuce tossed in a rich, creamy Caesar dressing, topped with crunchy croutons and grated Parmesan cheese. A classic salad perfect for any occasion.",
    "Lentil Soup": "Our hearty Lentil Soup is a comforting blend of tender lentils, aromatic spices, and fresh vegetables. A nourishing and wholesome choice for a light meal or starter.",
    "Stuffed Peppers": "Vibrant bell peppers stuffed with a flavorful mix of rice, seasoned meat, and vegetables, then baked to perfection. A colorful and satisfying dish.",
    "Sushi": "Experience the art of Japanese cuisine with our Sushi, featuring perfectly rolled rice, fresh seafood, and crisp vegetables. Served with soy sauce, wasabi, and pickled ginger for the ultimate flavor experience.",
    "Lobster Tail": "Indulge in the luxurious taste of our Lobster Tail, perfectly grilled or butter-poached to highlight its tender, sweet meat. Served with drawn butter and a squeeze of lemon for a decadent experience.",
    "Spaghetti Bolognese": "Our Spaghetti Bolognese features a rich, savory meat sauce made from ground beef, tomatoes, and aromatic herbs, served over al dente spaghetti. A classic Italian dish that never goes out of style.",
    "Cheese Board": "Savor a selection of fine cheeses, accompanied by fresh fruits, nuts, and crackers. Perfect for pairing with wine, our Cheese Board offers a delightful variety of textures and flavors.",
    "Pancakes": "Start your day right with our fluffy and golden Pancakes, served with a drizzle of maple syrup and a dusting of powdered sugar. A breakfast classic for all ages.",
    "Egg Benedict": "Indulge in our Eggs Benedict, featuring poached eggs, savory ham or smoked salmon, and rich hollandaise sauce, all served on an English muffin. A luxurious breakfast or brunch option.",
    "Curry": "Our Curry is a flavorful, aromatic dish made with tender meat or vegetables simmered in a rich, spiced gravy. Served with rice or naan, it’s a comforting meal full of complex flavors.",
    "Biryani": "A fragrant and flavorful rice dish, our Biryani is made with long-grain basmati rice, spiced meat, and a blend of aromatic herbs. A rich, hearty meal that’s sure to please any palate.",
    "Tiramisu": "Experience the Italian indulgence of our Tiramisu. This classic dessert features layers of coffee-soaked ladyfingers and creamy mascarpone cheese, dusted with cocoa powder. A perfect ending to any meal.",
    "Vegan Bowl": "Our Vegan Bowl is a healthy and vibrant meal, featuring a base of fresh greens, quinoa or rice, topped with roasted vegetables, beans, and a flavorful dressing. A wholesome, plant-based option.",
    "Banh Mi": "Our Banh Mi is a Vietnamese sandwich packed with crispy pork, pickled vegetables, fresh herbs, and a zesty sauce, all served on a crusty baguette. A fusion of savory, tangy, and fresh flavors.",
    "Pavlova": "Enjoy the light and airy delight of our Pavlova, a meringue-based dessert topped with fresh fruits and whipped cream. A refreshing and indulgent treat.",
    "Fruit Tart": "Our Fruit Tart is a delicate pastry crust filled with rich custard and topped with an array of fresh, vibrant fruits. A beautiful and delicious dessert for any occasion.",
    "Chicken Alfredo": "Our Chicken Alfredo is a creamy pasta dish made with tender chicken, fettuccine noodles, and a rich, cheesy Alfredo sauce. A comforting and indulgent meal.",
    "Ratatouille": "This classic French dish features a medley of roasted vegetables, including zucchini, eggplant, and bell peppers, simmered in a rich tomato sauce. A wholesome and satisfying vegetarian dish.",
    "Falafel Bowl": "Savor the flavors of the Middle East with our Falafel Bowl, featuring crispy falafel balls served on a bed of fresh greens, topped with hummus, tabbouleh, and a tangy dressing.",
    "Beef Tacos": "Our Beef Tacos feature seasoned ground beef, crisp lettuce, cheese, and tangy salsa, all wrapped in soft or crunchy taco shells. A tasty and satisfying choice for any meal.",
    "Espresso": "Enjoy the bold and intense flavor of our Espresso, made with freshly ground beans and brewed to perfection. A classic coffee choice for those who love a strong, rich flavor.",
    "Buffalo Wings": "Our Buffalo Wings are deep-fried and tossed in a tangy, spicy sauce. Perfect for snacking or sharing, they’re served with a side of creamy blue cheese dressing.",
    "Falafel": "Enjoy the crispy, golden perfection of our Falafel, made from ground chickpeas, herbs, and spices. These Middle Eastern delights are perfect on their own or in pita bread with veggies and sauces.",
    "Ramen": "Our Ramen features soft, chewy noodles in a rich, flavorful broth, topped with tender meats, vegetables, and a boiled egg. A comforting and satisfying dish for any noodle lover.",
    "Chili Con Carne": "A hearty and spicy stew, our Chili Con Carne is made with ground beef, beans, tomatoes, and aromatic spices. Perfect for a filling meal, served with cornbread or rice.",
    "Chowder": "Warm up with our creamy, rich Chowder, made with tender seafood or vegetables, potatoes, and cream. A comforting dish perfect for a cold day.",
    "Garlic Bread": "Our Garlic Bread features soft, buttery bread toasted to perfection with a generous spread of garlic and herbs. A savory accompaniment to any meal.",
    "Minestrone Soup": "Our Minestrone Soup is a hearty vegetable and bean-based soup, packed with fresh ingredients and Italian herbs. A wholesome and nourishing choice.",
    "Quiche": "Savor the savory goodness of our Quiche, a flaky pastry filled with eggs, cheese, and a variety of fresh vegetables or meats. Perfect for brunch or a light meal.",
    "Poutine": "Indulge in our Poutine, a Canadian dish made with crispy fries, rich gravy, and melted cheese curds. A decadent comfort food favorite.",
    "Margherita Pizza": "Our Margherita Pizza features a thin crust topped with fresh mozzarella, tomato sauce, and fragrant basil leaves. A simple yet flavorful pizza for any pizza lover.",
    "Meat Lovers Pizza": "For those who crave meat, our Meat Lovers Pizza is loaded with savory toppings like pepperoni, sausage, bacon, and ham. A hearty and indulgent choice.",
    "Pork Fried Rice": "Our Pork Fried Rice is a flavorful stir-fry dish made with tender pork, vegetables, and rice, all tossed together in a savory sauce. A satisfying and comforting meal.",
    "Falafel Wrap": "Enjoy the flavors of the Middle East in our Falafel Wrap, featuring crispy falafel wrapped in warm pita bread with fresh veggies and creamy tahini sauce.",
    "Grilled Salmon": "Our Grilled Salmon is perfectly cooked to retain its natural flavors, served with a side of roasted vegetables or a light salad. A healthy and flavorful choice.",
    "Black Forest Cake": "Indulge in the rich and decadent Black Forest Cake, featuring layers of chocolate cake, whipped cream, and cherries. A classic dessert with a luxurious twist.",
    "Corn on the Cob": "Our Corn on the Cob is perfectly grilled or boiled, then brushed with butter and sprinkled with salt. A simple, yet delicious side dish.",
    "Caprese Salad": "A fresh and vibrant salad, our Caprese Salad features ripe tomatoes, mozzarella cheese, fresh basil, and a drizzle of balsamic glaze. A perfect summer dish.",
    "Mango Smoothie": "Enjoy the tropical sweetness of our Mango Smoothie, made with ripe mangoes, yogurt, and a touch of honey. A refreshing drink for any time of day.",
    "Chocolate Smoothie": "Our Chocolate Smoothie is a creamy blend of chocolate, milk, and banana, perfect for satisfying your sweet cravings while keeping things healthy.",
    "Vadapav": "A popular Indian street food, our Vadapav features a spiced potato patty, deep-fried and served in a soft pav (bun) with chutneys. A flavorful and filling snack.",
    "Biscuit": "Delight in the buttery goodness of our Biscuits, baked to golden perfection. These flaky treats are ideal as a snack, breakfast item, or paired with gravies and spreads. Each bite is a testament to timeless baking traditions.",
    "Baked Ziti": "Our Baked Ziti features tender pasta baked with a rich tomato sauce, melted cheese, and a blend of herbs. A comforting and hearty dish that’s perfect for any occasion.",
    "Greek Salad": "Our Greek Salad is a refreshing mix of crisp cucumbers, tomatoes, olives, and feta cheese, dressed in olive oil and oregano. A light, flavorful dish perfect for warm weather.",
    "Cobb Salad": "A hearty and satisfying Cobb Salad features a mix of lettuce, avocado, bacon, eggs, chicken, cheese, and a tangy dressing. Perfect for a filling lunch or dinner.",
    "Pulled Pork Sandwich": "Our Pulled Pork Sandwich features tender, slow-cooked pork, shredded and tossed in barbecue sauce, served on a soft bun. A smoky, flavorful sandwich that’s perfect for any meal.",
    "Pad See Ew": "A classic Thai dish, our Pad See Ew features stir-fried wide rice noodles, vegetables, and your choice of meat, all tossed in a savory sauce. A delicious and satisfying meal.",
    "Chocolate Chip Cookies": "Our Chocolate Chip Cookies are soft, chewy, and packed with rich, melty chocolate chips. A timeless treat perfect for any occasion.",
    "Café au Lait": "Enjoy a warm and comforting Café au Lait, made with freshly brewed coffee and steamed milk. A smooth and balanced coffee drink that’s perfect for any time of day.",
    "Chicken Nuggets": "Our Chicken Nuggets are crispy on the outside and tender on the inside. Served with your choice of dipping sauce, they’re a perfect snack or meal for all ages.",
    "Hawaiian Pizza": "A tropical twist on the classic pizza, our Hawaiian Pizza is topped with savory ham, sweet pineapple, and melted cheese. A deliciously unique combination.",
    "Pork Chops": "Tender and juicy, our Pork Chops are seasoned and grilled to perfection, served with a side of roasted vegetables or potatoes. A hearty, satisfying meal.",
    "Chocolate Fondue": "Indulge in our rich and creamy Chocolate Fondue, perfect for dipping fruits, marshmallows, and pastries. A decadent treat for dessert lovers.",
    "Must Try Dishes": "Explore our selection of Must Try Dishes, featuring a variety of hearty and flavorful rice-based meals. From aromatic biryanis to savory fried rice, each dish is crafted with premium ingredients and authentic recipes that offer a true culinary experience.",
    "Chocolate Lava Cake": "Indulge in the decadent delight of our Chocolate Lava Cake. With a warm, gooey chocolate center that oozes out with every bite, this dessert is a chocolate lover's dream. Perfect for a romantic dinner or a special occasion.",
    "Pesto Pasta": "Our Pesto Pasta features al dente pasta tossed in a rich, fragrant basil pesto sauce, made with garlic, pine nuts, and Parmesan cheese. A vibrant and flavorful dish.",
    "Duck Confit": "Experience the tender and flavorful Duck Confit, slow-cooked to perfection in its own fat, and served with crispy skin. A French delicacy that’s perfect for any special meal.",
    "Clam Chowder": "Warm up with our creamy Clam Chowder, made with tender clams, potatoes, and a rich, velvety base. A comforting and hearty soup.",
    "Margarita": "A classic cocktail, our Margarita is made with tequila, lime juice, and a touch of orange liqueur, served with a salted rim. A refreshing drink perfect for any occasion."
}


  return details.get(product_name, "A delicious food item.")  # Default description if not found

def update_products_json(file_path):
  """Updates the products.json file with detailed descriptions."""

  with open(file_path, 'r+') as file:
      data = json.load(file)
      for product in data['products']:
          if 'detail' not in product:
              product['detail'] = generate_detail(product['name'])
      file.seek(0)  # Rewind to the beginning of the file
      json.dump(data, file, indent=4)  # Write the updated data with indentation
      file.truncate()  # Truncate the file in case the updated data is smaller

# Example usage:
file_path = 'frontend/data/products.json'  # Replace with the actual path to your products.json file
update_products_json(file_path)

# Preventing Chrome from closing (This part is not possible with a simple Python script. 
# You would need to use Selenium or another browser automation tool to interact with Chrome and prevent it from closing.)