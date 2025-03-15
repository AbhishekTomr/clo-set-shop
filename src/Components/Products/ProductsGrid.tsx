import React, { useEffect, useState } from "react";
import { ProductServices } from "../../Services/ProductsServices";
import { IProducts, IProductsRes, PRICING_OPTION } from "../../types";
import { pricingMapper } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { initialSetup } from "../../Store/productsSlice";

const productServices = new ProductServices();

type Props = {};

function ProductsGrid({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const products = useSelector<RootState>(
    (state: RootState) => state.products.visibleProducts
  );

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      let products = await productServices.fetchAllProducts();
      products = products.map((item: IProductsRes) => ({
        ...item,
        pricingOption: pricingMapper(item.pricingOption),
      }));
      dispatch(
        initialSetup({
          allProducts: products,
          visibleProducts: products,
        })
      );
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
          {(products as IProducts[]).map((item: IProducts) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default ProductsGrid;
