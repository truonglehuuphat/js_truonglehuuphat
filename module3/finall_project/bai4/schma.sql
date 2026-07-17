-- schema.sql
CREATE TYPE order_status as ENUM ('pending', 'confirmed', 'shiping', 'delivered', 'cancelled');

CREATE table categories (
id serial primary key,
name varchar(100) not null,
slug varchar(100) not null unique,
created_at timestamptz default now()
);

create table products (
id serial primary key,
title varchar(200) not null,
price numeric(15,2) not null check(price > 0),
thumbnail text not null,
description text,
brand varchar(100),
stock integer not null default 0 check (stock >=0),
rating numeric(3,2) default 0,
rating_count integer default 0,
category_id integer not null references categories(id) on delete restrict,
created_at timestamptz default now(),
updated_at timestamptz default now()
);

create table orders(
id serial primary key,
user_name varchar(100) NOT NULL,
user_email varchar(150) not null,
user_phone varchar(15) not null,
address text not null,
province_code varchar(20),
ward_code varchar(20),
delivery_date timestamptz,
note text,
total_amount numeric(15,2) not null,
status order_status default 'pending',
created_at timestamptz default now(),
updated_at timestamptz default now()
);

create table order_items (
id serial primary key,
order_id integer not null references orders(id) on delete cascade,
product_id integer not null references products(id) on delete restrict,
title varchar(200) not null,
price numeric(15,2) not null,
quantity integer not null check(quantity > 0)
thumbnail text not null
);

create or replace function set_updated_at()
returns trigger as $$ 
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger products_updated_at
before update on products
for each row execute fuction set_updated_at();