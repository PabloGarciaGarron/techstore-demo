// ============================================================
// 1. IMPORTAR LAS HERRAMIENTAS DE PLAYWRIGHT

import { test, expect } from "@playwright/test";

// 2. AGRUPAR LAS PRUEBAS DE AUTENTICACIÓN

test.describe("Autenticación mediante API", () => {

  // 3. CREAR EL CASO DE PRUEBA API-TC-001

  test(
    "API-TC-001: login válido devuelve HTTP 200 y token",

    // 4. OBTENER LA HERRAMIENTA "request"
    async ({ request }) => {

      // 5. ENVIAR LA PETICIÓN DE LOGIN

      const response = await request.post("/api/auth/login", {

        // 6. ENVIAR LAS CREDENCIALES

        data: {

          username: "admin",
          password: "admin123",
        },
      });

      // 9. VERIFICAR EL CÓDIGO HTTP

      expect(response.status()).toBe(200);

      // 10. OBTENER EL CUERPO DE LA RESPUESTA

      const responseBody = await response.json();

      // 11. VERIFICAR QUE EXISTE UN TOKEN

      expect(responseBody.token).toBeTruthy();

      // 12. VERIFICAR EL NOMBRE DEL USUARIO

      expect(responseBody.user.username).toBe("admin");

      // 13. VERIFICAR QUE EL USUARIO TENGA UN ROL

      expect(responseBody.user.role).toBeTruthy();
    }
  );
});