module.exports = (sequelize, DataTypes) => {
  const BatchItem = sequelize.define('BatchItem', {
    lot_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'batch',
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
    tableName: 'batch_item',
    timestamps: false
  });

  BatchItem.associate = (models) => {
    BatchItem.belongsTo(models.Batch, { foreignKey: 'lot_id', as: 'batch' });
    BatchItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return BatchItem;
};
