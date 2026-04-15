// al trabajar con nuestros archivos debemos de agregar al final .js para que el sistema pueda reconocerlo y no nos de un error
import NoteEntity from "../../domain/entities/note.entity.js"; // agregar al final un .js ya que es requerido para ESM
// Logica de Negocio
export default class NoteService {
  _noteRepository;
  constructor(NoteRepository) {
    this._noteRepository = NoteRepository;
  }

  // Logica de Negocio
  async createNote(data) {
    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }
    // Se instancia un nuevo objeto de la clase nota, y se le pasan los parametros necesarios para crear un objeto
    const note = new NoteEntity(data);
    // Se llama al metodo save del repositorio, y se le pasa el objeto nota, para que lo guarde en la base de datos, y se retorna el resultado
    return await this._noteRepository.save(note);
  }

  async getNoteByUser(userId) {
    return await this._noteRepository.findByUserId(userId);
  }
}
