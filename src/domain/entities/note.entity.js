export default class NoteEntity {
  // Esta es una forma de hacerlo, pero tambien primero se pueden definir las propiedades de la clase, y luego asignarlas en el constructor, pero esta forma es mas rapida y sencilla
  // Este constructor se llama por defecto al instanciar la clase, y se le pasan los parametros necesarios para crear un objeto
  // es decir, al crear un objeto nota, se le deben de pasar los parametros por orden, y se asignan a las propiedades de la clase
  constructor({id, title, content, imageUrl, isPrivate, password, userId, categoryId}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl || null;
    this.isPrivate = isPrivate || false;
    this.password = password || null;
    this.userId = userId;
    this.categoryId = categoryId ?? null;
  }
}
