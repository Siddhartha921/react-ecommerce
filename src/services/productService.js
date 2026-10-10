const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load this product.");
  }

  return response.json();
}