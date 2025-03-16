import { IProducts, PRICING_OPTION } from "../../types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./Products.scss";

type Props = {
  product: IProducts;
};

const Product = ({ product }: Props) => {
  const getPrice = () => {
    switch (product.pricingOption) {
      case PRICING_OPTION.FREE:
        return "FREE";
      case PRICING_OPTION.VIEW_ONLY:
        return "View Only";
      default:
        return `$${product.price}.00`;
    }
  };
  return (
    <Card className="product">
      <CardMedia
        component={"img"}
        height={120}
        width={50}
        image={product.imagePath}
        alt={product.title}
        className="product-img"
      />
      <CardContent className="product-content">
        <span className="product-details">
          <span className="title">{product.title}</span>
          <span className="creator">{product.creator}</span>
        </span>
        <span className="product-price">{getPrice()}</span>
      </CardContent>
    </Card>
  );
};

export default Product;
