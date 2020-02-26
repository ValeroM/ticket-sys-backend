module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("ticket", {
    issue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    floor_num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Ticket;
};
