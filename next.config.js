

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'groupd',
        mongodb_password: 'Qf30wzzSgBtwatpj',
        mongodb_clustername: 'groupd',
        mongodb_database: 'devdb',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'groupd',
      mongodb_password: 'Qf30wzzSgBtwatpj',
      mongodb_clustername: 'groupd',
      mongodb_database: 'devdb',
    }
  }

} 

// module.exports = {
//   images: {
//     domains: ['img.sndimg.com'], // Add the problematic hostname here
//   },
// };