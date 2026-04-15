import NoteModel from "./note.model";

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
}