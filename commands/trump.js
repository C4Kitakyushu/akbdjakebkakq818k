const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'trump',
  description: 'trump <text>',
  usage: 'trump <text>',
  author: 'developer',
  async execute(senderId, args, pageAccessToken) {
    if (!args || !Array.isArray(args) || args.length === 0) {
      await sendMessage(senderId, { text: '❌ Please provide the text ' }, pageAccessToken);
      return;
    }

    const text = args.join(' ');
    const apiUrl = `https://api-canvass.vercel.app/trump?text=${encodeURIComponent(text)}`;

    try {
      await sendMessage(senderId, { 
        attachment: { 
          type: 'image', 
          payload: { url: apiUrl } 
        } 
      }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error: Could not generate canvas image.' }, pageAccessToken);
    }
  }
};