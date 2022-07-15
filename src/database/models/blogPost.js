const BlogPosts = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }

  return BlogPostTable;
}

module.exports = BlogPosts;