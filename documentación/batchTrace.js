module.exports = (sequelize, DataTypes) => {
  const BatchTrace = sequelize.define('BatchTrace', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lot_id: {
      type: DataTypes.STRING,
      references: {
        model: 'batch',
        key: 'lot_id'
      }
    },
    event_time: {
      type: DataTypes.DATE
    },
    event_type: {
      type: DataTypes.STRING
    },
    origin_location: {
      type: DataTypes.STRING
    },
    destination_location: {
      type: DataTypes.STRING
    },
    supplier_id: {
      type: DataTypes.STRING,
      references: {
        model: 'supplier',
        key: 'supplier_id'
      }
    },
    transport_id: {
      type: DataTypes.STRING,
      references: {
        model: 'transport',
        key: 'transport_id'
      }
    },
    transport_time: {
      type: DataTypes.INTEGER
    },
    transport_cost: {
      type: DataTypes.DECIMAL
    }
  }, {
    tableName: 'batch_trace',
    timestamps: false
  });

  BatchTrace.associate = (models) => {
    BatchTrace.belongsTo(models.Batch, { foreignKey: 'lot_id', as: 'batch' });
    BatchTrace.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
    BatchTrace.belongsTo(models.Transport, { foreignKey: 'transport_id', as: 'transport' });
  };

  return BatchTrace;
};
