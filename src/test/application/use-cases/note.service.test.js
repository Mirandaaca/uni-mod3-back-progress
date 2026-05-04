import NoteService from "../../../application/use-cases/note.service.js";
import { jest } from "@jest/globals";
// Simular una base de datos en memoria para las notas
const mockNoteRepository = {
  save: jest.fn(),
  findByUserId: jest.fn(),
};
// Escenarios de prueba para el servicio de notas - Tests Unitarios: En esta sección, se definen los escenarios de prueba para el servicio de notas, utilizando Jest para crear pruebas unitarias que verifiquen el correcto funcionamiento de los métodos de creación y obtención de notas, asegurando que se manejen correctamente los casos de éxito y error, y que se interactúe adecuadamente con el repositorio de notas mockeado.
describe("NoteService - Pruebas Unitarias", () => {
  // Variable para almacenar la instancia del servicio de notas
  let noteService;
  // La parte incial: antes de cada prueba, limpiamos todos los mocks e inicializamos el servicio de notas con el repositorio mockeado
  beforeEach(() => {
    jest.clearAllMocks();
    noteService = new NoteService(mockNoteRepository);
  });
  // Test 1: Prueba para la creación de notas exitoso
  test("Crear: debería crear y guardar una nota correctamente", async () => {
    // En este caso, se simula la creación de una nota con datos válidos, lo que debería resultar en una nota creada exitosamente, y se verifica que el método de guardado del repositorio se haya llamado con los argumentos correctos, y que el resultado tenga el título esperado, asegurando que el servicio de notas maneje correctamente la creación de notas y la interacción con el repositorio mockeado.
    const data = { title: "Mi nota", content: "Info", userId: "user_123" };
    mockNoteRepository.save.mockResolvedValue({ id: 1, ...data });

    const result = await noteService.createNote(data);

    expect(mockNoteRepository.save).toHaveBeenCalledTimes(1);
    expect(result.title).toBe("Mi nota");
  });
  // Test 2: Prueba para la creación de notas sin título, debería lanzar un error
  test("Crear: debería fallar al crear una nota sin título", async () => {
    // En este caso, se simula la creación de una nota sin título, lo que debería resultar en un error, y se verifica que el error lanzado tenga el mensaje esperado, asegurando que el servicio de notas maneje correctamente los casos de error relacionados con la validación de datos.
    const data = { content: "Sin titulo" };
    await expect(noteService.createNote(data)).rejects.toThrow(
      "El título es obligatorio",
    );
  });
  // Test 3: Prueba para obtener las notas de un usuario específico, debería devolver una lista de notas
  test("Leer: debería devolver las notas de un usuario específico", async () => {
    // En este caso, se simula la obtención de notas para un usuario específico, lo que debería resultar en una lista de notas, y se verifica que el método del repositorio se haya llamado con el argumento correcto, y que el resultado tenga la longitud esperada, asegurando que el servicio de notas maneje correctamente la obtención de notas y la interacción con el repositorio mockeado.
    const mockNotes = [{ title: "Nota 1" }, { title: "Nota 2" }];
    mockNoteRepository.findByUserId.mockResolvedValue(mockNotes);

    const result = await noteService.getNotesByUser("user_123");

    expect(mockNoteRepository.findByUserId).toHaveBeenCalledWith("user_123");
    expect(result.length).toBe(2);
  });
});
