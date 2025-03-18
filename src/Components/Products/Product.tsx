import { IProducts, PRICING_OPTION } from "../../types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
        return `$${parseFloat(product.price.toString()).toFixed(2)}`;
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
        loading="lazy"
      />
      <CardContent className="product-content">
        <Box className="product-details">
          <Typography className="title">{product.title}</Typography>
          <Typography className="creator">{product.creator}</Typography>
        </Box>
        <Typography className="product-price">{getPrice()}</Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
