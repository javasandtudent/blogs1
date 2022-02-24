let isWeixin = () => {
 	let ua = window.navigator.userAgent.toLowerCase()
 	return;
 	/micromessenger/
 	.test(ua)
 }
 // method 自动播放
 let audioPlayer = (id) => {
 	let audio = document.getElementById(id)
 	if (isWeixin()) {
 		document.addEventListener(
 			'WeixinJSBridgeReady', () => {
 				audio.play()
 			}, false);

 		// 添加 getNetworkType 的判断原因, 请看问题分析2
 		if (typeof window.WeixinJSBridge ==
 			"object" &&
 			typeof window.WeixinJSBridge
 			.invoke ==
 			"function"
 		) {
 			window.
 			WeixinJSBridge
 				.invoke(
 					'getNetworkType', {}, () => {
 						audio.play()
 					})
 		}
 	} else {
 		// audio.play();
 		let touchPlay = () => {
 			audio.play();
 			document.removeEventListener(
 				'touchstart', touchPlay, false)
 		};
 		if (audio.paused) {
 			document.addEventListener(
 				'touchstart', touchPlay, false)
 		}
 	}
 }
 // 使用
 audioPlayer(
 	'audio-player'
 );

 var audio = document.getElementById("audio-player");
 var btn = document.getElementById("btn");
 var rotateVal = 0;

 var InterVal; // 定时器
 // 设置定时器
 function rotate() {
 	InterVal = setInterval(function() {
 		rotateVal += 4;
 		// 设置旋转属性(顺时针)
 		btn.style.transform = 'rotate(' + rotateVal + 'deg)';
 		// 设置旋转属性(逆时针)
 		//img.style.transform = 'rotate(-' + rotateVal + 'deg)'
 		// 设置旋转时的动画  匀速0.1s
 		btn.style.transition = '0.1s linear'
 	}, 100)
 }
 // rotate();
 btn.onclick = function() { //点击按钮播放停止
 	if (audio.paused) { //判断当前的状态是否为暂停，若是则点击播放，否则暂停
 		audio.play();
 		rotate()
 	} else {
 		audio.pause();
 		clearInterval(InterVal)
 	}
 };
