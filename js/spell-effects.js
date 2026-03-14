// 魔法特效管理模块
const SpellEffects = (function() {
    let canvas, ctx;
    let particles = [];
    let animationId;
    let isActive = false;
    let activeIntervals = [];

    // 初始化 Canvas
    function init() {
        canvas = document.getElementById('spellCanvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        const container = document.getElementById('spellEffectArea');
        if (!container) return;

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    // 清理所有定时器
    function clearAllIntervals() {
        activeIntervals.forEach(id => clearInterval(id));
        activeIntervals = [];
    }

    // 安全设置定时器
    function safeSetInterval(callback, delay) {
        const id = setInterval(callback, delay);
        activeIntervals.push(id);
        return id;
    }

    // 粒子类
    class Particle {
        constructor(x, y, config) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.size = Math.random() * config.size + 1;
            this.color = config.color;
            this.type = config.type;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;

            if (this.type === 'smoke') {
                this.size *= 1.02;
                this.vy = -0.5;
            } else if (this.type === 'spark') {
                this.vx *= 0.98;
                this.vy *= 0.98;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;

            if (this.type === 'spark' || this.type === 'light') {
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.type === 'light' ? 20 : 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 'smoke') {
                ctx.fillStyle = `rgba(100, 100, 100, ${this.life * 0.3})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // 发光圆环
    class LightRing {
        constructor(x, y, config) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = config.maxRadius;
            this.color = config.color;
            this.life = 1;
        }

        update() {
            this.radius += 2;
            this.life = 1 - (this.radius / this.maxRadius);
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.6;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    // 咒语特效配置
    const spellConfigs = {
        'lumos': { type: 'glow', color: '#ffffff', duration: 2000, size: 3, speed: 2, particleCount: 100 },
        'nox': { type: 'dim', color: '#333333', duration: 1000, size: 2, speed: 1, particleCount: 50 },
        'wingardium leviosa': { type: 'float', color: '#4a90d9', duration: 3000, size: 4, speed: 1.5, particleCount: 150 },
        'expelliarmus': { type: 'blast', color: '#e74c3c', duration: 1500, size: 5, speed: 8, particleCount: 200 },
        'impedimenta': { type: 'ring', color: '#f1c40f', duration: 2000, size: 3, speed: 2, particleCount: 120 },
        'protego': { type: 'shield', color: '#3498db', duration: 2500, size: 4, speed: 1, particleCount: 180 },
        'expecto patronum': { type: 'patronus', color: '#c0c0c0', duration: 4000, size: 6, speed: 3, particleCount: 300 },
        'lumos maxima': { type: 'flash', color: '#ffff99', duration: 1500, size: 8, speed: 10, particleCount: 250 },
        'petrificus totalus': { type: 'bind', color: '#ffffff', duration: 2000, size: 2, speed: 1, particleCount: 100 },
        'riddikulus': { type: 'funny', color: '#ff69b4', duration: 3000, size: 4, speed: 2, particleCount: 200 },
        'aguamenti': { type: 'water', color: '#2980b9', duration: 2500, size: 5, speed: 5, particleCount: 200 },
        'reducto': { type: 'explosion', color: '#ff8c00', duration: 2000, size: 6, speed: 10, particleCount: 250 },
        'disillusionment charm': { type: 'invisible', color: '#95a5a6', duration: 3000, size: 3, speed: 1, particleCount: 150 },
        'deletrius': { type: 'fade', color: '#7f8c8d', duration: 2000, size: 2, speed: 0.5, particleCount: 80 },
        'episkey': { type: 'heal', color: '#27ae60', duration: 2500, size: 3, speed: 1, particleCount: 120 }
    };

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制粒子
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            isActive = false;
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // 创建粒子爆发
    function createParticleBurst(x, y, config) {
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle(x, y, config));
        }
    }

    // 创建发光圆环
    function createLightRing(x, y, config) {
        particles.push(new LightRing(x, y, config));
    }

    // 添加魔杖动画
    function addWandAnimation(duration) {
        const wand = document.getElementById('wand');
        const tip = document.getElementById('wandTip');

        if (wand) {
            wand.classList.add('casting');
            setTimeout(() => wand.classList.remove('casting'), 800);
        }

        if (tip) {
            tip.classList.add('glow');
            setTimeout(() => tip.classList.remove('glow'), duration);
        }
    }

    // 播放成功特效
    function playSuccess(spellName) {
        isActive = true;
        clearAllIntervals();
        particles = [];

        const config = spellConfigs[spellName.toLowerCase()] || spellConfigs['lumos'];
        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.7;

        addWandAnimation(config.duration);

        // 根据咒语类型播放不同特效
        const effectHandlers = {
            glow: () => {
                createParticleBurst(centerX, centerY, { ...config, type: 'light', size: 5, speed: 0.5, particleCount: 50 });
                let count = 0;
                const id = safeSetInterval(() => {
                    createParticleBurst(centerX, centerY, { ...config, type: 'spark', size: 2, speed: 3, particleCount: 20 });
                    if (++count > 10) clearInterval(id);
                }, 200);
            },
            blast: () => {
                createLightRing(centerX, centerY, { color: config.color, maxRadius: 100 });
                createParticleBurst(centerX, centerY, { ...config, type: 'spark', size: 6, speed: 10, particleCount: 200 });
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            createParticleBurst(centerX + i * 30, centerY, { ...config, type: 'spark', size: 4, speed: 15, particleCount: 50 });
                        }, i * 100);
                    }
                }, 300);
            },
            float: () => {
                createLightRing(centerX, centerY, { color: config.color, maxRadius: 80 });
                createParticleBurst(centerX, centerY, { ...config, type: 'light', size: 3, speed: 1, particleCount: 100 });
                let floatY = centerY;
                const id = safeSetInterval(() => {
                    if (floatY > canvas.height * 0.3) {
                        floatY -= 5;
                        createParticleBurst(centerX, floatY, { ...config, type: 'spark', size: 2, speed: 2, particleCount: 10 });
                    } else {
                        clearInterval(id);
                    }
                }, 100);
            },
            shield: () => {
                for (let r = 50; r <= 150; r += 20) {
                    setTimeout(() => createLightRing(centerX, centerY, { color: config.color, maxRadius: r }), (r - 50) * 50);
                }
                createParticleBurst(centerX, centerY, { ...config, type: 'light', size: 4, speed: 0.5, particleCount: 100 });
            },
            ring: () => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => createLightRing(centerX, centerY, { color: config.color, maxRadius: 120 }), i * 300);
                }
            },
            flash: () => {
                createParticleBurst(centerX, centerY, { ...config, type: 'light', size: 10, speed: 5, particleCount: 200 });
                const flash = document.createElement('div');
                flash.className = 'screenFlash';
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 300);
            },
            water: () => {
                const id = safeSetInterval(() => {
                    createParticleBurst(centerX, centerY, { ...config, type: 'spark', size: 4, speed: 8, particleCount: 30 });
                }, 200);
                setTimeout(() => clearInterval(id), 2500);
            },
            explosion: () => {
                createLightRing(centerX, centerY, { color: config.color, maxRadius: 150 });
                createParticleBurst(centerX, centerY, { ...config, type: 'spark', size: 8, speed: 15, particleCount: 250 });
            },
            heal: () => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createParticleBurst(centerX, centerY, { ...config, type: 'light', size: 3, speed: 1, particleCount: 30 });
                        createLightRing(centerX, centerY, { color: config.color, maxRadius: 60 + i * 20 });
                    }, i * 300);
                }
            }
        };

        (effectHandlers[config.type] || (() => createParticleBurst(centerX, centerY, config)))();

        if (!animationId) animate();
    }

    // 播放失败特效
    function playFail() {
        isActive = true;
        clearAllIntervals();
        particles = [];

        const wand = document.getElementById('wand');
        if (wand) {
            wand.classList.add('fail');
            setTimeout(() => wand.classList.remove('fail'), 500);
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.7;

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createParticleBurst(centerX, centerY, { type: 'smoke', color: '#333333', size: 4, speed: 1, particleCount: 30 });
            }, i * 150);
        }

        createParticleBurst(centerX, centerY, { type: 'spark', color: '#888888', size: 2, speed: 3, particleCount: 80 });

        if (!animationId) animate();
    }

    // 公共方法
    return {
        init: init,
        playSuccess: playSuccess,
        playFail: playFail,
        isActive: () => isActive
    };
})();

document.addEventListener('DOMContentLoaded', () => SpellEffects.init());

