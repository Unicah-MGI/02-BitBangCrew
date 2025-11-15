module.exports = (sequelize, DataTypes) => {
  const LotItem = sequelize.define('LotItem', {
    lot_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Lot',
        key: 'lot_id'
      }
    },
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    Product_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Lot_item',
    timestamps: false
  });

  LotItem.associate = (models) => {
    LotItem.belongsTo(models.Lot, { foreignKey: 'lot_id', as: 'Lot' });
    LotItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return LotItem;
};
