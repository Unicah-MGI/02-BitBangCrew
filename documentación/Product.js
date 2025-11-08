module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'product',
    timestamps: false
  });

  Product.associate = (models) => {
    Product.hasMany(models.BatchItem, { foreignKey: 'product_id', as: 'batchItems' });
  };

  return Product;
};