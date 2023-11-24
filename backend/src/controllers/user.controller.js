import { User } from '../models/index.js';


export const getUser = async (req, res) => {

  try {
    const { username } = req.params;
    const userWithoutSecrets = await User.findOne({
      where: { username },
      attributes: { exclude: ['password', 'salt']}
    });

    res.status(200).send(userWithoutSecrets);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };

};

export default {
  getUser,
  // (addUser → to add user → register)
  // editUser,
  // deleteUser
};
