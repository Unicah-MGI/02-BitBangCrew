module.exports = (sequelize, DataTypes) => {
  const LotTrace = sequelize.define('LotTrace', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lot_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Lot',
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
    supplier_name: {
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
    tableName: 'Lot_trace',
    timestamps: false
  });

  LotTrace.associate = (models) => {
    LotTrace.belongsTo(models.Lot, { foreignKey: 'lot_id', as: 'Lot' });
    LotTrace.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
    LotTrace.belongsTo(models.Transport, { foreignKey: 'transport_id', as: 'transport' });
  };

  return LotTrace;
};