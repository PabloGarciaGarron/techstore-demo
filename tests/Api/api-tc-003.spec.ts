// ============================================================
// 1. IMPORTAMOS LAS HERRAMIENTAS DE PLAYWRIGHT

import { test, expect } from "@playwright/test";

// 2. CREAMOS EL CASO DE PRUEBA

test(
  "API-TC-003: login sin credenciales devuelve HTTP 400",
  
  async ({ request }) => {

    // 3. ACTIVAMOS LA CONFIGURACIÓN DE BUGS DE LA API

    const bugConfig = await request.post("/api/config/bugs", {
      data: {
        enabled: true,
      },
    });

    // 4. COMPROBAMOS QUE LA CONFIGURACIÓN FUE EXITOSA

    expect(bugConfig.ok()).toBeTruthy();

    // 5. ENVIAMOS EL LOGIN SIN CREDENCIALES

    const response = await request.post("/api/auth/login", {

      // 6. ENVIAMOS LOS DATOS DEL LOGIN

      data: {
        username: "",
        password: "",
      },
    });

    // 7. COMPROBAMOS EL CÓDIGO HTTP

    expect(response.status()).toBe(400);

    // 8. CONVERTIMOS LA RESPUESTA A JSON

    const responseBody = await response.json();

    // 9. COMPROBAMOS EL MENSAJE DE ERROR
    expect(responseBody.error).toBe(
      "username y password son obligatorios"
    );

  }
);

