import { Locator, Page } from "@playwright/test";

export const USUARIOS = {
  customer: {
    usuario: "customer",
    password: "customer123",
  },
  manager: {
    usuario: "manager",
    password: "manager123",
  },
  admin: {
    usuario: "admin",
    password: "admin123",
  },
} as const;

export type TipoUsuario = keyof typeof USUARIOS;

export class LoginPage {
  readonly page: Page;
  readonly bugStatus: Locator;
  readonly loginView: Locator;
  readonly loginForm: Locator;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;
  readonly mensajeError: Locator;
  readonly sesion: Locator;
  readonly usuarioActual: Locator;
  readonly rolActual: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bugStatus = page.getByTestId("bug-status");
    this.loginView = page.getByTestId("login-view");
    this.loginForm = page.getByTestId("login-form");
    this.inputUsuario = page.getByTestId("username-input");
    this.inputPassword = page.getByTestId("password-input");
    this.botonLogin = page.getByTestId("login-button");
    this.mensajeError = page.getByTestId("login-error");
    this.sesion = page.getByTestId("session");
    this.usuarioActual = page.getByTestId("current-user");
    this.rolActual = page.getByTestId("current-role");
  }

  async ir(): Promise<void> {
    await this.page.goto("/");
  }

  async login(usuario: string, password: string): Promise<void> {
    await this.inputUsuario.fill(usuario);
    await this.inputPassword.fill(password);
    await this.botonLogin.click();
  }

  async loginComo(tipo: TipoUsuario): Promise<void> {
    const credenciales = USUARIOS[tipo];
    await this.login(credenciales.usuario, credenciales.password);
  }
}
