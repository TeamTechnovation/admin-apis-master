CREATE OR REPLACE function GetReceived(restaurantid int)
	returns table(
		id integer,
		due integer,
		amount integer,
		"destinationType" character varying,
		"createdAt" timestamp without time zone,
		"originType" character varying,
		"warehouseName" character varying,
		"warehouseId" integer,
		"warehouseId2" integer,
		"warehouseName2" character varying,
		"outletName" character varying,
		"outletId" integer,
	    "outletName2" character varying,
		"outletId2" integer,
		"vendorName" character varying,
		"vendorId" integer,
		"itemQuantity" integer,
		"itemName" character varying,
		"restaurantName" character varying, 
		"restaurantId" integer
	)
LANGUAGE plpgsql 
as $$
begin
	RETURN QUERY select
		"tn".id,
		"tn".due,
		"tn".amount,
		"tn"."destinationType",
		"tn"."createdAt",
		"tn"."originType",
		"wh"."name" as "warehouseName",
		"wh"."id" as "warehouseId",
		"wh2"."id" as "warehouseId2",
		"wh2"."name" as "warehouseName2",
		"ot"."alias" as "outletName",
		"ot"."id" as "outletId",
		"ot2"."alias" as "outletName2",
		"ot2"."id" as "outletId2",
		"vd"."fullname" as "vendorName",
		"vd"."id" as "vendorId",
		"tItem"."quantity" as "itemQuantiy",
		"item"."name" as "ItemName",
		"restaurant"."restuarantName" as "restaurantName",
		"tn"."restaurantId" as "resaurantId"
		from tb_transaction "tn"
		left join
		tb_warehouse "wh" on case 
								when "tn"."destinationType" = 'warehouse' then "wh"."id" = "tn"."destinationId"
								when "tn"."originType" = 'warehouse' then "wh"."id" = "tn"."originId"
							end
		
		left join
		tb_warehouse "wh2" on case
								when "tn"."destinationType" = 'warehouse' and "tn"."originType" = 'warehouse' then "wh2"."id" = "tn"."originId"
							  end
		
		left join
		tb_outlet "ot" on case
							when "tn"."destinationType" = 'outlet' then "ot"."id" = "tn"."destinationId"
							when "tn"."originType" = 'outlet' then "ot"."id" = "tn"."originId"
						end
						
		left join
		tb_outlet "ot2" on case
							when "tn"."destinationType" = 'outlet' and "tn"."originType" = 'outlet' then "ot2"."id" = "tn"."originId"
						   end
						   
		left join
		tb_vendor "vd" on case when "tn"."originType" = 'vendor' then "vd"."id" = "tn"."originId" end
		
		left join
		tb_items_in_transaction "tItem" on "tItem"."transactionId" = "tn"."id"
		
		left join
		tb_item "item" on "tItem"."itemId" = "item"."id"
		
		left join
		tb_resturant "restaurant" on "restaurant"."id" = restaurantid
		
		where "tn"."restaurantId" = restaurantid
		;

end;
$$;


/*

select * from GetReceived(42)

drop function GetReceived()

*/
