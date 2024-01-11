function transformProducts(products) {
  if (products.length <= 0) {
    return [];
  }
  let newProduct = [];
  let tempMap = new Map();

  if (products.length > 0) {
    products.forEach((product) => {
      if (!tempMap.has(product.productTitle)) {
        tempMap.set(product.productTitle, {
          title: product.productTitle,
          items: [],
        });
      }
      tempMap.get(product.productTitle).items.push(product);
    });
  }

  tempMap.forEach((value) => {
    newProduct.push(value);
  });
  //   console.log(newProduct);

  return newProduct;
}

module.exports = { transformProducts };
