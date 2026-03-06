exports.getCart = (req, res) => {
  res.render('cart', { page: 'cart' });
};

exports.getAbout = (req, res) => {
  res.render('about', { page: 'about' });
};

exports.getContact = (req, res) => {
  res.render('contact', { page: 'contact' });
};

exports.get404 = (req, res) => {
  res.status(404).render('404', { page: '404' });
};
