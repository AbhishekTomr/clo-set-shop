import { useMemo, useState } from "react";
import { IProducts } from "../../types";

import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { Grid, Typography } from "@mui/material";
import "./Products.scss";
import Product from "./Product";
import LoadingSpinner from "../Common/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

function ProductsGrid({}: Props) {
  const [index, setIndex] = useState(16);

  const products = useSelector(
    (state: RootState) => state.products.visibleProducts
  );
  const isLoading = useSelector((state: RootState) => state.products.isLoading);

  const visibleItems = useMemo(
    () => (products as IProducts[]).slice(0, index),
    [products, index]
  );

  if (!isLoading && visibleItems.length === 0) {
    return <Typography className="no-data">No Products Found !!</Typography>;
  }

  return (
    <div className="product-grid">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={visibleItems.length}
          next={() =>
            setTimeout(() => {
              setIndex((index) => index + 8);
            }, 1000)
          }
          hasMore={index < (products as IProducts[]).length}
          loader={<LoadingSpinner />}
          endMessage={
            <div style={{ textAlign: "center", margin: "20px" }}>
              {" "}
              No more products!
            </div>
          }
          scrollableTarget="product-grid"
          className="infinite-wrapper"
        >
          <Grid container spacing={5} className="grid" id={"grid"}>
            {visibleItems.map((item: IProducts) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                height={600}
              >
                <Product product={item} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default ProductsGrid;
