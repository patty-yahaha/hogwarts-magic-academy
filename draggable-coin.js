// ========== 可拖动金加隆框功能 ==========
(function() {
    'use strict';

    // 等待页面加载完成
    function initDraggableCoin() {
        const coinDisplay = document.querySelector('.coin-display');
        if (!coinDisplay) return;

        // 从 localStorage 加载保存的位置
        const savedPosition = localStorage.getItem('coinDisplayPosition');
        if (savedPosition) {
            try {
                const pos = JSON.parse(savedPosition);
                coinDisplay.style.position = 'fixed';
                coinDisplay.style.top = pos.top + 'px';
                coinDisplay.style.left = pos.left + 'px';
                coinDisplay.style.right = 'auto';
            } catch (e) {
                console.error('Failed to load coin position:', e);
            }
        }

        // 拖动相关变量
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // 获取初始位置
        function getPosition(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left
            };
        }

        // 开始拖动
        function startDrag(e) {
            // 检查是否点击了内部按钮或输入框
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
                return;
            }

            e.preventDefault();
            isDragging = true;
            coinDisplay.classList.add('dragging');

            // 获取鼠标/触摸位置
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }

            // 获取元素初始位置
            const pos = getPosition(coinDisplay);
            initialX = pos.left;
            initialY = pos.top;

            // 添加事件监听
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', stopDrag);
        }

        // 拖动中
        function onDrag(e) {
            if (!isDragging) return;

            e.preventDefault();

            // 获取当前鼠标/触摸位置
            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }

            // 计算新位置
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            let newX = initialX + deltaX;
            let newY = initialY + deltaY;

            // 边界限制
            const maxX = window.innerWidth - coinDisplay.offsetWidth;
            const maxY = window.innerHeight - coinDisplay.offsetHeight;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            // 应用新位置
            coinDisplay.style.position = 'fixed';
            coinDisplay.style.top = newY + 'px';
            coinDisplay.style.left = newX + 'px';
            coinDisplay.style.right = 'auto';
        }

        // 停止拖动
        function stopDrag() {
            if (!isDragging) return;

            isDragging = false;
            coinDisplay.classList.remove('dragging');

            // 保存位置到 localStorage
            const pos = getPosition(coinDisplay);
            localStorage.setItem('coinDisplayPosition', JSON.stringify(pos));

            // 移除事件监听
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('touchend', stopDrag);
        }

        // 添加拖动事件监听
        coinDisplay.addEventListener('mousedown', startDrag);
        coinDisplay.addEventListener('touchstart', startDrag, { passive: false });
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDraggableCoin);
    } else {
        initDraggableCoin();
    }
})();
