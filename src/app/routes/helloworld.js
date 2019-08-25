const Helloworld = {
  method: "GET",
  path: "/",
  handler: [
    function (req, res) {
      req.payload = {
        message: "Hello World!",
        binds: this.binds
      };
    },
  ]
};

export default Helloworld;
