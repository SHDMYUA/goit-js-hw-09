const t={main:document.body,startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let n=null;t.startBtn.addEventListener("click",(function(){n=setInterval((()=>{let n=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.main.style.background=n,t.startBtn.disabled=!0}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.78a95912.js.map
