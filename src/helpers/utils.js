let Utils = function () { }

Utils.scrollTop = () => {
  let root = document.getElementById("root");
  if (!root) return;
  root.scrollIntoView();
}

Utils.onTheEnd = (cb) => {
  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return cb();
  }
}

Utils.greet = () => {
  let hour = (new Date()).getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good morning!';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon!';
  } else if ((hour >= 17 && hour <= 23) || hour < 5) {
    return 'Good evening!';
  }
}


export default Utils;