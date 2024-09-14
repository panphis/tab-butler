(function () {
	const timer = setTimeout(() => {
		const loadingScreen = document.getElementById('loading');
		if (loadingScreen) {
			loadingScreen.remove();
		}
		clearTimeout(timer); // 清理定时器
	}, 800); // 动画持续时间 0.5 秒
})()