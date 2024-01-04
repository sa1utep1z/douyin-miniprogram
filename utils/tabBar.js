const removeTabBarText = (index) => {
  console.info('移除tabBar角标文本');
  tt.removeTabBarBadge({
    index: index
  });
};

const setTabBarText = (index, text) => {
  console.info('设置tabBar角标文本');
  if ('' === text || '0' === text) {
    removeTabBarText(index);
    return;
  }
  tt.setTabBarBadge({
    index: index,
    text: text
  });
};

module.exports = {
  setTabBarText,
  removeTabBarText
};