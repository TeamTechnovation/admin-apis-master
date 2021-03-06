CREATE OR REPLACE function GetProductByOutletAndTypeIds(typeids character varying, outletid int)
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
	"productTypeId" integer,
	"productAddOns" integer[]
)

LANGUAGE plpgsql 
as $$
DECLARE
       ids INT[];
begin
ids = string_to_array(typeids,',');
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
"prtp"."id" as "productTypeId",
"product"."addOns" as "productAddOns"

from product_and_type "pt"
left join tb_product "product" on "product"."id" = "pt"."product"
inner join tb_product_size "pz" on "pz"."id" = "product"."productSizeId"
inner join tb_product_group "pg" on "pg"."id" = "product"."productGroupId"
inner join tb_product_category "pc" on "pc"."id" = "product"."productCategoryId"
left join tb_product_type "prtp" on "prtp"."id" = "pt"."type"
where "pt"."type" = ANY(ids) and "pt"."product" in (select
"op"."product"
from outlets_and_products "op"
where "op".outlet = outletid
);

end;
$$;


DROP FUNCTION GetProductByOutletAndTypeIds(typeids character varying,outletids int)

select * from GetProductByOutletAndTypeIds('1,2,3', 26)

