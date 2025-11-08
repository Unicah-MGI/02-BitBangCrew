module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    transport_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    supplier_id: {
      type: DataTypes.STRING,
      references: {
        model: 'supplier',
        key: 'supplier_id'
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driver_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driver_contact: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'transport',
    timestamps: false
  });

  Transport.associate = (models) => {
    Transport.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
    Transport.hasMany(models.BatchTrace, { foreignKey: 'transport_id', as: 'batchTraces' });
  };

  return Transport;
};