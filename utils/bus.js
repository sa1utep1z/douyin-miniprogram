const eventBus = {
  subs: [],
  subscribe(key, fn) {
    //订阅
    if (!this.subs[key]) {
      this.subs[key] = [];
    }
    this.subs[key].push(fn);
  },
  publish(...arg) {
    //发布
    let args = arg;
    let key = args.shift();
    let fns = this.subs[key];

    if (!fns || fns.length <= 0) return;

    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i](args);
    }
  },
  unSubscribe(key) {
    delete this.subs[key];
  }
};
export default eventBus;