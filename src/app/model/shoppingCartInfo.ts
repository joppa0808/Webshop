export class ShoppingCartInfo {
  productid: number;
  productname: string;
  price: number;
  imagepath: string;
  quantity: number;

  constructor(productid: number, productname: string, price: number, quantity: number, imagepath: string) {
    this.productname = productname;
    this.price = price;
    this.quantity = quantity;
    this.productid = productid;
    this.imagepath = imagepath;
  }

}
