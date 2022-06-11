//!logger => log tất cả những api call đến server của mình

//ko dùng res -> thay : _
const logger = (req, _, next) => {
  console.log(`${req.method} ${req.originalUrl}`);//call tới method nào, originalUrl: localhost:300/api/...
  next();//call next để nhả ra
};

module.exports = {
  logger,
};
