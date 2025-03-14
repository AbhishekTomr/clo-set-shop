import React, { useEffect, useState } from "react";
import { ProductServices } from "../../Services/ProductsServices";
import { IProducts, IProductsRes, PRICING_OPTION } from "../../types";
import { pricingMapper } from "../../helpers";

const productServices = new ProductServices();

type Props = {};

function ProductsGrid({}: Props) {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      let products = await productServices.fetchAllProducts();
      products = products.map((item: IProductsRes) => ({
        ...item,
        pricingOption: pricingMapper(item.pricingOption),
      }));
      setProducts(products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      ProductsGrid
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {products.map((item: IProducts) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default ProductsGrid;
