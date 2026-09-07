// ============================================================
// 1. IMPORTAMOS LAS HERRAMIENTAS DE PLAYWRIGHT
import { test, expect } from "@playwright/test";

// 2. CREAMOS EL CASO DE PRUEBA

test("API-TC-005: categorías únicas y ordenadas", async ({ request }) => {

  // 3. REINICIAMOS LA TIENDA

  const resetStore = await request.post("/api/test/reset");

  // 4. COMPROBAMOS QUE EL RESET FUNCIONÓ

  expect(resetStore.ok()).toBeTruthy();

  // 5. ACTIVAMOS LA CONFIGURACIÓN DE BUGS

  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });

  // 6. COMPROBAMOS QUE LA CONFIGURACIÓN FUNCIONÓ

  expect(bugConfig.ok()).toBeTruthy();

  // 7. CONSULTAMOS LAS CATEGORÍAS

  const response = await request.get("/api/categories");

  // 8. COMPROBAMOS EL CÓDIGO HTTP
  expect(response.status()).toBe(200);

  // 9. OBTENEMOS EL CUERPO DE LA RESPUESTA

  const categories = await response.json();

  // 10. DEFINIMOS LAS CATEGORÍAS ESPERADAS

  const expectedCategories = [

    // Primera categoría esperada.
    "Accesorios",

    // Segunda categoría esperada.
    "Audio",

    // Tercera categoría esperada.
    "Celulares",

    // Cuarta categoría esperada.
    "Computadoras",

    // Quinta categoría esperada.
    "Monitores",

    // Sexta categoría esperada.
    "Wearables",

  ];

  // 11. COMPROBAMOS QUE CATEGORIES ES UN ARRAY
 
  expect(Array.isArray(categories)).toBe(true);

  // 12. COMPROBAMOS LA CANTIDAD DE CATEGORÍAS

  expect(categories).toHaveLength(expectedCategories.length);

  // 13. COMPROBAMOS QUE NO EXISTAN DUPLICADOS

  expect(new Set(categories).size).toBe(categories.length);

  // 14. COMPROBAMOS QUE LAS CATEGORÍAS SON EXACTAMENTE
  //     LAS ESPERADAS

  expect(categories).toEqual(expectedCategories);

  // 15. COMPROBAMOS EXPLÍCITAMENTE QUE ESTÁN ORDENADAS

  expect(categories).toEqual(
    [...categories].sort((first, second) =>
      first.localeCompare(second)
    )
  );
});