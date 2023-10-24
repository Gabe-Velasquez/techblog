const { Post } = require("../models");

const postdata = [
  {
    title: "Copy",
    content:
      `When you would like to copy a piece of text and move it to another place, all you need to do is highlight the text and press "cmd" + "c" on your keyboard `,
    user_id: 1,
  },
  {
    title: "Paste",
    content:
      `With your copied text, place your cursor where you would like the text to go and press "cmd" + "v"`,
    user_id: 2,
  },
  {
    title: "Computer Tip",
    content:
      "Always properly shut down your computer by inititalizing a shutdown from your menu instead of holding the power button to prevent issues with files not properly saving.",
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;