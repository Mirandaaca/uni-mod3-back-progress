import NoteModel from "./note.model.js";
// Se importa mongoose desde el NoteModel, ya que se exporta un modelo de mongoose, y se utiliza para crear un nuevo objeto de la clase NoteModel, y se le pasan los parametros necesarios para crear un objeto, y se retorna el resultado
export default class NoteMongoRepository {
    async save(noteEntity){
        // Se instancia un nuevo objeto de la clase NoteModel, y se le pasan los parametros necesarios para crear un objeto
        // Se asignan las propiedades del objeto noteEntity a las propiedades del objeto note, para que se guarde en la base de datos
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        // Se llama al metodo save de mongoose.
        const savedNote = await note.save();
        return savedNote.toObject();
    }
    async findByUserId(userId){
        // Se llama al metodo find de mongoose, y se le pasa el userId, para que busque las notas del usuario en la base de datos, y se retorna el resultado
        return await NoteModel.find({ userId });
    }

    async findById(id) {
        const note = await NoteModel.findById(id);
        return note ? note.toObject() : null;
    }

    async update(id, data) {
        const updatedNote = await NoteModel.findByIdAndUpdate(id, data, { new: true });
        return updatedNote ? updatedNote.toObject() : null;
    }

    async delete(id) {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        return deletedNote ? true : null;
    }
}