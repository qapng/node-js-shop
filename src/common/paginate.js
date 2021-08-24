module.exports = function (page, totalPage, delta = 2) {
  const pages = [],
    pageWithDot = [];

  const left = page - delta;
  const right = page + 2;

  for (let i = 1; i <= totalPage; i++) {
    if (i === 1 || i === totalPage || i === page || (i >= left && i <= right)) {
      pages.push(i);
    }
  }

  let i = 0;
  while (i < pages.length) {
    pageWithDot.push(pages[i]);
    if (pages[i + 1] - pages[i] >= delta) {
      pageWithDot.push("...");
    }
    ++i;
  }

  return pageWithDot;
};
