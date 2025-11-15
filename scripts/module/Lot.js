module.exports = (sequelize, DataTypes) => {
  const Lot = sequelize.define('Lot', {
    lot_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    production_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Lot',
    timestamps: false
  });

  Lot.associate = (models) => {
    Lot.hasMany(models.LotItem, { foreignKey: 'lot_id', as: 'items' });
    Lot.hasMany(models.LotTrace, { foreignKey: 'lot_id', as: 'traces' });
  };

  return Lot;
};