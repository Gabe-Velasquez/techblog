const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
//create associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports={ User,Comment,Post };