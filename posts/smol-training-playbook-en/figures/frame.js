(() => {
  const report = () => parent.postMessage({type:'smol-figure-height',height:Math.ceil(document.body.getBoundingClientRect().height + 20)},location.origin);
  const receive = (event) => {
    if(event.origin !== location.origin || event.source !== parent || event.data?.type !== 'smol-figure-theme') return;
    document.documentElement.dataset.theme = event.data.theme;
  };
  addEventListener('message',receive);
  addEventListener('load',report);
  new ResizeObserver(report).observe(document.body);
  report();
})();
