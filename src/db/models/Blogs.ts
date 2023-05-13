import { DataTypes as Sequelize } from "sequelize";

const blogsModel = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      onDelete: 'cascade',
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updateAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const blogsOptions = {
  timestamps: false,
  schema: "public",
  freezeTableName: true,
};

const BlogsAssociation = (schema) => {
  schema.Blogs.belongsTo(schema.Users, {
    as: 'user',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

export const getModel = (seq) => {
  const model = seq.define("Blogs", blogsModel, blogsOptions);
  model.associate = BlogsAssociation;
  return model;
};
