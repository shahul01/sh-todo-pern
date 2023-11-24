import { User } from '../models/index.js';


export const getUsers = async (req, res) => {

  try {
    const users = await User.findAll();
    res.status(200).send(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };

};

export default {
  getUsers,
};
