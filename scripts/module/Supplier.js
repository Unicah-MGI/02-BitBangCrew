module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    supplier_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'supplier',
    timestamps: false
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Transport, { foreignKey: 'supplier_id', as: 'transports' });
    Supplier.hasMany(models.LotTrace, { foreignKey: 'supplier_id', as: 'LotTraces' });
  };

  return Supplier;
};