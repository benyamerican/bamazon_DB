DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;
CREATE TABLE productS(
-- item_id (unique id for each product)
ID INT(11) NOT NULL AUTO_INCREMENT,
-- product_name (Name of product)
product_name VARCHAR(50),
-- department_name
department_name VARCHAR(50),
-- price (cost to customer)
price DECIMAL(10,2),
-- stock_quantity (how much of the product is available in stores)
stock_quantity INT(11),
-- primary id
PRIMARY KEY ID (ID)
);





-- SELECT * FROM products;