import userModel from "./user.model.js";
export default class UserMongoRepository {
  async save(userEntity) {
    return await userModel.create(userEntity);
  }
  async findByEmail(email) {
    return await userModel.findOne({ email });
  }
}
