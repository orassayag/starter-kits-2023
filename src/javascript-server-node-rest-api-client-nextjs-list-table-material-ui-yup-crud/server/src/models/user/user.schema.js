import CustomError from '../../custom/error.custom.js';

// Simulate schema from the database.

const DataTypes = {
  INTEGER: 'INTEGER',
  STRING: 'STRING',
};

export default class UserSchema {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static user = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lastName',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'age',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
  };

  static userFields = Object.values(this.user).map(({ field }) => field);
}
