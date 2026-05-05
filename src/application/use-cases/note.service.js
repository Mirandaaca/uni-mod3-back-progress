// al trabajar con nuestros archivos debemos de agregar al final .js para que el sistema pueda reconocerlo y no nos de un error
import NoteEntity from "../../domain/entities/note.entity.js"; // agregar al final un .js ya que es requerido para ESM
// Logica de Negocio
export default class NoteService {
  constructor(noteRepository, mailService) {
    this.noteRepository = noteRepository;
    this.mailService = mailService;
  }

  async createNote(data) {
    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }

    const note = new NoteEntity(data);
    return await this.noteRepository.save(note);
  }

  async getNoteById(id){
    const note = await this.noteRepository.findById(id);
    if (!note) throw new Error("Note not found");
    return note;
  }

  async getPublicNoteById(id) {
    const note = await this.noteRepository.findById(id);
    if (!note) throw new Error("Note not found");
    if (note.isPrivate === true) throw new Error("Note is private");
    return note;
  }

  async getNotesByUserId(userId) {
    return await this.noteRepository.findByUserId(userId);
  }

  async getNotesByCategoryId(categoryId) {
    return await this.noteRepository.findByCategoryId(categoryId);
  }

  async updateNote(id, data, currentUserId) {
    const existingNote = await this.noteRepository.findById(id);
    if (!existingNote) throw new Error("Note not found");

    // RESTRICCIÓN: Solo el dueño puede actualizarla
    if (existingNote.userId !== currentUserId) {
      throw new Error("Unauthorized: You can only update your own notes");
    }

    const note = await this.noteRepository.update(id, data);
    if (!note) throw new Error("Note not found");
    return note;
  }

  async deleteNote(id, currentUserId) {
    const existingNote = await this.noteRepository.findById(id);
    if (!existingNote) throw new Error("Note not found");

    // RESTRICCIÓN: Solo el dueño puede eliminarla
    if (existingNote.userId !== currentUserId) {
      throw new Error("Unauthorized: You can only delete your own notes");
    }

    const note = await this.noteRepository.delete(id);
    if (!note) throw new Error("Note not found");
    return { message: "Note deleted successfully" };
  }

  async shareNoteByEmail(noteId, targetEmail, currentUserId) {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error("Note not found");

    // RESTRICCIÓN: Solo el dueño puede compartirla
    if (note.userId !== currentUserId) {
      throw new Error("Unauthorized: You can only share your own notes");
    }

    return await this.mailService.sendNoteEmail(targetEmail, note);
  }
}
