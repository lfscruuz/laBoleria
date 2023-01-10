CREATE TABLE "cakes" (
	"id" serial primary key,
	"name" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"image" varchar(255) NOT NULL,
	"description" TEXT NOT NULL
);



CREATE TABLE "clients" (
	"id" serial primary key,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL
);



CREATE TABLE "orders" (
	"id" serial primary key,
	"clientId" int NOT null references "clients"("id"),
	"cakeId" int NOT null references "cakes"("id"),
	"quantity" int NOT NULL,
	"createdAt" TIMESTAMP default now() NOT NULL,
	"totalPrice" numeric NOT null
);

// post clients
insert into clients (name, address, phone) values ('luis', 'endereco1', '6199999999')

// post cakes
insert into cakes (name, price, image, description) values ('chocolate', 4000, 'image1', 'bolo de chocolate')

//post orders
insert into orders ("clientId", "cakeId", quantity, "totalPrice") values (1, 1, 3, 12000)


// get orders/:id 
select (select json_build_array('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) from clients join orders on clients.id = orders."clientId" where orders.id = 8) as client, (select json_build_array('id', cakes.id, 'name', cakes."name", 'price', cakes.price, 'description', cakes.description, 'image', cakes.image) from cakes join orders on cakes.id = orders."cakeId"  where orders.id = 8) as cake, orders.id as "orderId", orders."createdAt", orders.quantity, orders."totalPrice" from orders where orders.id = 8


//get clients/:id/orders
select orders.id, cakes.name as "cakeName" from cakes left join orders on cakes.id = orders."cakeId" where orders."clientId" = 2

select orders.id as "orderId", orders.quantity, orders."createdAt", orders."totalPrice" from orders join clients on orders."clientId" = clients.id where orders."clientId" = 2
