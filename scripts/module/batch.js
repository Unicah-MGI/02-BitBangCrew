module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
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
    tableName: 'batch',
    timestamps: false
  });

  Batch.associate = (models) => {
    Batch.hasMany(models.BatchItem, { foreignKey: 'lot_id', as: 'items' });
    Batch.hasMany(models.BatchTrace, { foreignKey: 'lot_id', as: 'traces' });
  };

  return Batch;
};