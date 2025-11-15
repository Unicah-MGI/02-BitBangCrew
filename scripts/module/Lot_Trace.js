module.exports = (sequelize, DataTypes) => {
  const Lot_Trace = sequelize.define('Lot_Trace', {
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

  Lot_Trace.associate = (models) => {
    Lot_Trace.belongsTo(models.Lot, { foreignKey: 'lot_id', as: 'Lot' });
    Lot_Trace.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
    Lot_Trace.belongsTo(models.Transport, { foreignKey: 'transport_id', as: 'transport' });
  };

  return Lot_Trace;
};