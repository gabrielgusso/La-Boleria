CREATE TABLE "cakes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"price" numeric NOT NULL,
	"image" varchar(100) NOT NULL,
	"description" TEXT(100) NOT NULL
);



CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"address" varchar(100) NOT NULL,
	"phone" TEXT(11) NOT NULL
);



CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"cakeId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" numeric NOT NULL
);





ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id");



--------------------------------------

CREATE TABLE "cakes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"price" numeric NOT NULL,
	"image" varchar(100) NOT NULL,
	"description" TEXT(100) NOT NULL,
	"flavourId" integer NOT NULL
);



CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"address" varchar(100) NOT NULL,
	"phone" TEXT(11) NOT NULL
);



CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"cakeId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" numeric NOT NULL,
	"isDelivered" BOOLEAN NOT NULL DEFAULT false
);



CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"cakeId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
	"totalPrice" numeric NOT NULL,
	"isDelivered" BOOLEAN NOT NULL DEFAULT false
);




ALTER TABLE "cakes" ADD CONSTRAINT "cakes_fk0" FOREIGN KEY ("flavourId") REFERENCES "flavours"("id");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id");





