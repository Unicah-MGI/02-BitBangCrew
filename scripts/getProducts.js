const fs = require('fs').promises;
const crypto = require('crypto');

/**
 * Función para generar un GUID único
 */
function generateGUID() {
  return crypto.randomUUID();
}

/**
 * Función para obtener productos de OpenFoodFacts API
 * Obtiene hasta la página 10 con 1000 productos por página
 */

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
      
      // Agregar productos de esta página al array total
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
        break; // Salir si no hay más productos
      }
      
      // Pequeña pausa entre peticiones para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`✅ Descarga completada: ${allProducts.length} productos obtenidos`);
    return allProducts;
    
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    throw error;
  }
}

/**
 * Función para guardar los productos en un archivo JSON
 */
async function saveProductsAsJSON(products) {
  try {
    const jsonData = JSON.stringify(products, null, 2);
    await fs.writeFile('products.json', jsonData, 'utf8');
    console.log('✅ Archivo products.json guardado correctamente');
  } catch (error) {
    console.error('❌ Error al guardar el archivo JSON:', error);
  }
}

// Ejemplo de uso
async function main() {
  try {
    const products = await fetchOpenFoodFactsProducts();
    
    console.log('\n--- Resumen de productos ---');
    console.log(`Total de productos: ${products.length}`);
    
    // Mostrar algunos ejemplos
    if (products.length > 0) {
      console.log('\nPrimeros 3 productos:');
      products.slice(0, 3).forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.product_name || 'Sin nombre'}`);
        console.log(`   ID: ${product.product_id}`);
        console.log(`   Marca: ${product.brands || 'N/A'}`);
        console.log(`   Categoría: ${product.main_category || 'N/A'}`);
        console.log(`   Cantidad: ${product.product_quantity || 'N/A'} ${product.product_quantity_unit || ''}`);
      });
    }
    
    // Guardar productos en un archivo JSON
    await saveProductsAsJSON(products);
    
    return products;
    
  } catch (error) {
    console.error('Error en la ejecución:', error);
  }
}

// Ejecutar la función principal
main();