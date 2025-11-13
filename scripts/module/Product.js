module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    brands: {
      type: DataTypes.STRING,
      allowNull: true
    },
    manufacturing_places: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UoM: {
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