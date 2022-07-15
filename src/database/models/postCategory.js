const PostCategories = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define("PostCategory",
    { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
    { timestamps: false }
  );

  PostCategoriesTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoriesTable,
      foreignKey: "postId",
      otherKey: "categoryId",
      as: "categories",
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoriesTable,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "posts",
    });
  };

  return PostCategoriesTable;
};

module.exports = PostCategories;
