CREATE OR REPLACE function GetProductByRestaurantAndTypeIds(typids character varying, restaurantid int)
returns table(
	"id" integer,
	"alias" character varying,
	"basePrice" double precision,
	"description" character varying,
	"image" character varying,
	"name" character varying,
	"price" double precision,
	"restaurantId" integer,
	"tax" double precision,
	"productSize" character varying,
	"productSizeId" integer,
	"productGroup" character varying,
    "productGroupId" integer,
    "productCategory" character varying,
 	"productCategoryId" integer,
	"productType" character varying,
	"productTypeId" integer
)

LANGUAGE plpgsql 
as $$
DECLARE
       ids INT[];
begin
ids = string_to_array($1,',');
	RETURN QUERY select 

"product"."id",
"product"."alias",
"product"."basePrice",
"product"."description",
"product"."image",
"product"."name",
"product"."price",
"product"."restaurantId",
"product"."tax",
"pz"."name" as "productSize",
"pz"."id" as "productSizeId",
"pg"."name" as "productGroup",
"pg"."id" as "productGroupId",
"pc"."name" as "productCategory",
"pc"."id" as "productCategoryId",
"prtp"."name" as "productType",
"prtp"."id" as "productTypeId"

from product_and_type "pt"
left join tb_product "product" on "product"."id" = "pt"."product" and "product"."restaurantId" = restaurantid
inner join tb_product_size "pz" on "pz"."id" = "product"."productSizeId"
inner join tb_product_group "pg" on "pg"."id" = "product"."productGroupId"
inner join tb_product_category "pc" on "pc"."id" = "product"."productCategoryId"
left join tb_product_type "prtp" on "prtp"."id" = "pt"."type"
where "pt"."type" = ANY(ids);

end;
$$;