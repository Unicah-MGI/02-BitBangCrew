const fs = require('fs').promises;
const crypto = require('crypto');


function generateGUID() {
  return crypto.randomUUID();
}


async function fetchOpenFoodFactsProducts() {
  const baseUrl = 'https://world.openfoodfacts.org/api/v2/search';
  const fields = 'product_name,main_category,product_quantity,product_quantity_unit,brands,manufacturing_places,owner';
  const pageSize = 1000;
  const maxPages = 5;
  
  let allProducts = [];
  
  try {
    console.log('Iniciando descarga de productos...');
    
    for (let page = 1; page <= maxPages; page++) {
      console.log(`Obteniendo página ${page} de ${maxPages}...`);
      
      const url = `${baseUrl}?fields=${fields}&page=${page}&page_size=${pageSize}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} en página ${page}`);
      }
      
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        // Agregar product_id a cada producto
        const productsWithId = data.products.map(product => ({
          product_id: generateGUID(),
          ...product
        }));
        
        allProducts = allProducts.concat(productsWithId);
        console.log(`Página ${page}: ${data.products.length} productos obtenidos`);
        console.log(`Total acumulado: ${allProducts.length} productos`);
      } else {
        console.log(`Página ${page}: No hay más productos disponibles`);
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`Descarga completada: ${allProducts.length} productos obtenidos`);
    return allProducts;
    
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}


async function saveProductsAsJSON(products) {
  try {
    const jsonData = JSON.stringify(products, null, 2);
    await fs.writeFile('products.json', jsonData, 'utf8');
    console.log('Archivo products.json guardado correctamente');
  } catch (error) {
    console.error('Error al guardar el archivo JSON:', error);
  }
}

async function main() {
  try {
    const products = await fetchOpenFoodFactsProducts();
    await saveProductsAsJSON(products);
    return products;
  } catch (error) {
    console.error('Error en la ejecución:', error);
  }
}

main();