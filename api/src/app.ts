import express, {  Response, NextFunction, Request } from "express";
import fs from "fs";
import path from "path";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
const app = express();

// middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

const filePath = path.join(__dirname, "../dev-data/data/products.json");

const products: Product[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: products.length,
    data: products,
  });
};

const getProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(prod => prod.id === id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
};

const postProduct = (req: Request, res: Response) => {
  const newId = products[products.length - 1].id + 1; //this is to create an id for the new product, this will be updated when db is implemented n connected.
  const newProduct = { id: newId, ...req.body };

  products.push(newProduct);

  fs.writeFile(filePath, JSON.stringify(products), err => {
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  });
};

app.route("/api/v1/products").get(getAllProducts).post(postProduct);
app.route("/api/v1/products/:id").get(getProduct);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app is fired up on port ${port}`);
});
