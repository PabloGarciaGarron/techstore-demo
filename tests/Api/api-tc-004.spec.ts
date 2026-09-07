// ============================================================
// 1. IMPORTAMOS LAS HERRAMIENTAS DE PLAYWRIGHT

import { test, expect } from "@playwright/test";

// 2. CREAMOS EL CASO DE PRUEBA

test("API-TC-004: consulta y filtra el catálogo por texto", async ({
  request,
}) => {

  // 3. REINICIAMOS LA TIENDA

  const resetStore = await request.post("/api/test/reset");

  // 4. COMPROBAMOS QUE EL RESET FUE EXITOSO
 
  expect(resetStore.ok()).toBeTruthy();

  // 5. ACTIVAMOS LA CONFIGURACIÓN DE BUGS
  
  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });

  // 6. COMPROBAMOS QUE LA CONFIGURACIÓN FUNCIONÓ
  
  expect(bugConfig.ok()).toBeTruthy();

  // 7. CONSULTAMOS TODO EL CATÁLOGO

  const catalogResponse = await request.get("/api/products");

  // 8. COMPROBAMOS EL CÓDIGO HTTP DEL CATÁLOGO
 
  expect(catalogResponse.status()).toBe(200);

  // 9. CONVERTIMOS LA RESPUESTA A JSON
 
  const catalog = await catalogResponse.json();

  // 10. COMPROBAMOS QUE EL CATÁLOGO ES UN ARRAY
  expect(Array.isArray(catalog)).toBe(true);

  // 11. COMPROBAMOS LA CANTIDAD DE PRODUCTOS

  expect(catalog).toHaveLength(10);

  // 12. CONSULTAMOS EL CATÁLOGO APLICANDO UN FILTRO
 
  const filteredResponse = await request.get(
    "/api/products?search=smart"
  );

  // 13. COMPROBAMOS QUE EL FILTRO RESPONDIÓ CORRECTAMENTE
 
  expect(filteredResponse.status()).toBe(200);

  // 14. CONVERTIMOS LOS RESULTADOS FILTRADOS A JSON
 
  const filteredProducts = await filteredResponse.json();

  // 15. COMPROBAMOS QUE EL RESULTADO ES UN ARRAY
 
  expect(Array.isArray(filteredProducts)).toBe(true);

  // 16. COMPROBAMOS CUÁNTOS PRODUCTOS ENCONTRÓ EL FILTRO
  expect(filteredProducts).toHaveLength(2);

  // 17. OBTENEMOS SOLAMENTE LOS NOMBRES

  const filteredNames = filteredProducts.map(
    (product: { name: string }) => product.name
  );

  // 18. COMPROBAMOS LOS NOMBRES ENCONTRADOS
 
  expect(filteredNames).toEqual(
    expect.arrayContaining([
      "Smartphone X12",
      "Smartwatch Fit 3",
    ])
  );

  // 19. RECORREMOS CADA PRODUCTO FILTRADO

  for (const product of filteredProducts) {

    // 20. UNIMOS NOMBRE Y DESCRIPCIÓN
 
    const searchableText =
      `${product.name} ${product.description}`.toLowerCase();

    // 21. COMPROBAMOS QUE CADA PRODUCTO CONTIENE "SMART"
  
    expect(searchableText).toContain("smart");
  }
});
