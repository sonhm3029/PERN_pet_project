CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    price INTEGER,
    on_sale BOOLEAN
);

CREATE TABLE restaurants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INTEGER
);

CREATE TABLE reviews (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <=5),
    restaurant_id uuid REFERENCES restaurants(id)
);

INSERT INTO restaurants(name, location, price_range)
VALUES  ('Mcdonalds', 'NewYork', 3),
        ('KFC', 'NewYork', 5);