//send payload
function sendPayload(req, res, next) {
  return res.send({
    message: req.message,
    payload: req.payload
  });
}

export default sendPayload;
