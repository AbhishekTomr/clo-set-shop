export class ProductServices {
  constructor() {}

  fetchAllProducts() {
    return fetch(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    ).then((response: Response) => response.json());
  }
}
