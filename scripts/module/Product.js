module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.UUID,
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
    product_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    product_quantity_unit: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'product',
    timestamps: false
  });

  Product.associate = (models) => {
    Product.hasMany(models.Lot_Item, { foreignKey: 'product_id', as: 'Lot_Items' });
  };

  return Product;
};