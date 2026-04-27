export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  createNote = async (req, res) => {
    const data = req.body;
    if (req.file) data.imageUrl = "/uploads/" + req.file.filename;
    data.userId = req.user.id; // se asigna el userId del usuario autenticado a la nota, para que se pueda relacionar la nota con el usuario que la creo, y asi poder obtener las notas de un usuario especifico, y evitar que un usuario pueda acceder a las notas de otro usuario, ya que solo podra acceder a las notas que tengan su userId.
    try {
      const note = await this.noteService.createNote(data);
      res.status(201).json(note); // 201 Created
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  getNoteById = async (req, res) => {
    const { id } = req.params; // Id a partir de los parametros de la ruta
    // Hay dos formas de sacar informacion, ya sea por query params o path params, en este caso se saca por path params, ya que es una informacion que forma parte de la ruta, y no es opcional, a diferencia de los query params que son opcionales y no forman parte de la
    // Los path params se definen en la ruta con :id, y se acceden en el controlador con req.params.id, mientras que los query params se definen en la ruta con ?id=123, y se acceden en el controlador con req.query.id
    // Los query params se utilizan para filtrar o paginar resultados, mientras que los path params se utilizan para identificar un recurso especifico, como en este caso una nota especifica, y es necesario para poder obtener la nota, mientras que los query params son opcionales y no son necesarios para obtener la nota, ya que se pueden obtener todas las notas de un usuario sin necesidad de un query param, pero no se puede obtener una nota especifica sin un path param.
    // La principal diferencia entonces es que los path params son obligatorios y forman parte de la ruta, mientras que los query params son opcionales y no forman parte de la ruta, y se utilizan para filtrar o paginar resultados, mientras que los path params se utilizan para identificar un recurso especifico.
    try {
      const note = await this.noteService.getNoteById(id);
      res.status(200).json(note);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  getNotesByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
      const notes = await this.noteService.getNotesByUserId(userId);
      res.status(200).json(notes); // 200 OK
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  updateNote = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (req.file) data.imageUrl = "/uploads/" + req.file.filename;
    const currentUserId = req.user.id;

    try {
      const note = await this.noteService.updateNote(id, data, currentUserId);
      res.status(200).json(note);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  deleteNote = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.user.id;
    try {
      const result = await this.noteService.deleteNote(id, currentUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  shareNote = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const currentUserId = req.user.id;

    if (!email)
      return res.status(400).json({ error: "Target email is required" });

    try {
      const result = await this.noteService.shareNoteByEmail(
        id,
        email,
        currentUserId,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
