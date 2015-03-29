// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})