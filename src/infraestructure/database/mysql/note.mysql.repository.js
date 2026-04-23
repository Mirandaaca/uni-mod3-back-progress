import { NoteModel } from "./note.model.js";

export default class NoteMySQLRepository {
  async save(noteEntity) {
    // Se llama al metodo create de sequelize, y se le pasan los parametros necesarios para crear un objeto, y se retorna el resultado
    const note = await NoteModel.create({
      title: noteEntity.title,
      content: noteEntity.content,
      imageUrl: noteEntity.imageUrl,
      isPrivate: noteEntity.isPrivate,
      password: noteEntity.password,
      userId: noteEntity.userId,
    });
    // Se llama al metodo toJSON de sequelize, para convertir el objeto note a un objeto plano, y se retorna el resultado
    return note.toJSON();
  }
  async findByUserId(userId) {
    // Se llama al metodo findAll de sequelize, y se le pasa el userId, para que busque las notas del usuario en la base de datos, y se retorna el resultado
    return await NoteModel.findAll({ where: { userId } });
  }
  async findById(id) {
    const note = await NoteModel.findByPk(id);
    return note ? note.toJSON() : null;
  }

  async update(id, data) {
    const note = await NoteModel.findByPk(id);
    if (!note) return null;
    await note.update(data);
    return note.toJSON();
  }

  async delete(id) {
    const note = await NoteModel.findByPk(id);
    if (!note) return null;
    await note.destroy();
    return true;
  }
}
