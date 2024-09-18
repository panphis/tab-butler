
const timer = setTimeout(() => {
	const loadingScreen = document.getElementById('loading');
	console.dir(loadingScreen);
	if (loadingScreen) {
		loadingScreen.remove();
	}
	clearTimeout(timer); // 清理定时器
}, 500); // 动画持续时间 0.5 秒