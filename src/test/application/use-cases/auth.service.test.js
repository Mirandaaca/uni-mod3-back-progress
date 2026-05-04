import AuthService from "../../../application/use-cases/auth.service.js";
import HashService from "../../../infraestructure/security/hash.service.js";
import JwtService from "../../../infraestructure/security/jwt.service.js";
import { jest } from "@jest/globals";

// Mock del repositorio de usuarios, simulamos la base de datos en memoria para las pruebas unitarias del servicio de autenticación, permitiendo verificar el comportamiento del servicio sin depender de una base de datos real, y asegurando que las pruebas sean rápidas y confiables.
const mockUserRepository = {
  save: jest.fn(),
  findByEmail: jest.fn(),
};

// Escenarios de prueba para el servicio de autenticación - Tests Unitarios: En esta sección, se definen los escenarios de prueba para el servicio de autenticación, utilizando Jest para crear pruebas unitarias que verifiquen el correcto funcionamiento de los métodos de registro e inicio de sesión, asegurando que se manejen correctamente los casos de éxito y error, y que se interactúe adecuadamente con el repositorio de usuarios mockeado.
describe("AuthService - Pruebas Unitarias", () => {
  // Variable para almacenar la instancia del servicio de autenticación
  let authService;

  // La parte incial: antes de cada prueba, limpiamos todos los mocks e inicializamos el servicio de autenticación con el repositorio mockeado
  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(mockUserRepository);
  });

  // Test 1: Prueba para el registro de usuarios exitoso
  // Prueba para el registro de usuarios
  test("register - Debería registrar un nuevo usuario", async () => {
    // Respetando las Triple A (Arrange, Act, Assert) - La parte de preparación: configuramos el mock para simular el comportamiento del repositorio de usuarios, preparando el escenario de prueba simulando que no existe un usuario con el email dado y que el usuario se guarda correctamente.
    // arrange - Configuramos el mock para simular el comportamiento del repositorio de usuarios - preparamos el escenario de prueba, simulando que no existe un usuario con el email dado y que el usuario se guarda correctamente..
    // act - Ejecutamos la función que queremos probar, en este caso el método de registro del servicio de autenticación.
    // assert - Verificamos que el resultado sea el esperado, en este caso que el usuario se haya registrado exitosamente y que los métodos del repositorio se hayan llamado con los argumentos correctos.

    // arrange - Configuramos el mock para simular el comportamiento del repositorio de usuarios - preparamos el escenario de prueba, simulando que no existe un usuario con el email dado y que el usuario se guarda correctamente..
    mockUserRepository.findByEmail.mockResolvedValue(null); // Simulamos que no existe un usuario con el email dado
    mockUserRepository.save.mockResolvedValue(true); // Simulamos que el usuario se guarda correctamente
    const userData = { email: "test@example.com", password: "password123" };

    // act
    const result = await authService.register(userData);

    // assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(result).toBe("User registered successfully");
  });

  // Test 2: Prueba para el registro de usuarios con email ya existente

  test("deberia lanzar error si el email ya existe", async () => {
    // arrange - Configuramos el mock para simular el comportamiento del repositorio de usuarios - preparamos el escenario de prueba, simulando que ya existe un usuario con el email dado.
    const userData = { email: "test@example.com", password: "password123" };
    mockUserRepository.findByEmail.mockResolvedValue({ email: userData.email }); // Simulamos que el usuario ya existe

    // act & assert - Verificamos que el método de registro lance un error con el mensaje esperado cuando el email ya está registrado.
    await expect(authService.register(userData)).rejects.toThrow(
      "Email already exists",
    );
  });

  // Test 3: Prueba para el inicio de sesión exitoso
  test("login - Debería iniciar sesión correctamente", async () => {
    // arrange - Configuramos el mock para simular el comportamiento del repositorio de usuarios, preparando el escenario de prueba simulando que existe un usuario con el email dado y que la contraseña es correcta.
    const userData = { email: "test@example.com", password: "password123" };
    mockUserRepository.findByEmail.mockResolvedValue({
      email: userData.email,
      password: userData.password,
    }); // Simulamos que el usuario existe y la contraseña es correcta

    // act - Ejecutamos la función que queremos probar, en este caso el método de inicio de sesión del servicio de autenticación.
    const result = await authService.login(userData);
    // assert - Verificamos que el resultado sea el esperado, en este caso que se haya iniciado sesión correctamente y que el método del repositorio se haya llamado con el argumento correcto.
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(result).toBe("Login successful");
  });
});
