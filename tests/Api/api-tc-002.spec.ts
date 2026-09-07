// ============================================================
// 1. IMPORTACIONES

import { test, expect } from "@playwright/test";

// 2. AGRUPAR LAS PRUEBAS

test.describe("Autenticación con contraseña inválida mediante API", () => {

  // 3. CREAR EL CASO DE PRUEBA

  test(
    "API-TC-002: rechaza contraseña inválida con HTTP 401 y sin token",

    // 4. ASYNC

    async ({ request }) => {

      // 5. ACTIVAR LA CONFIGURACIÓN DE BUGS

      const bugConfig = await request.post("/api/config/bugs", {

        // 6. DATOS QUE ENVIAMOS A LA API

        data: {
          enabled: true,
        },
      });

      // 7. COMPROBAR QUE LA CONFIGURACIÓN FUE EXITOSA

      expect(bugConfig.ok()).toBeTruthy();

      // 8. REALIZAR EL LOGIN

      const response = await request.post("/api/auth/login", {

        // 9. ENVIAR LAS CREDENCIALES

        data: {
          username: "admin",
          password: "clave-incorrecta",
        },
      });

      // 10. OBTENER EL BODY DE LA RESPUESTA

      const responseBody = await response.json();

      // 11. OBTENER EL MENSAJE DE ERROR

      const errorMessage = responseBody.error;

      // 12. MOSTRAR EL CÓDIGO HTTP

      console.log("HTTP:", response.status());

      // 13. MOSTRAR EL MENSAJE DE ERROR

      console.log("Mensaje:", errorMessage);

      // 14. VALIDAR EL CÓDIGO HTTP

      expect(response.status()).toBe(401);

      // 15. VALIDAR EL MENSAJE DE ERROR

      expect(errorMessage).toBe("Credenciales inválidas");

      // 16. COMPROBAR QUE NO EXISTA TOKEN

      expect(responseBody.token).toBeUndefined();
   
    });

});

