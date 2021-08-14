export class Cart{
  product_id: number;
  quantity: number;
  name: string;
  price: number;

  constructor(){
      this.product_id = 0;
      this.quantity = 0;
      this.name = '';
      this.price = 0.00;
  }
}
