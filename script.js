// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航功能
    initNavigation();
    
    // 初始化季节切换功能
    initSeasonTabs();
    
    // 初始化模态框功能
    initModals();
    
    // 初始化任务和复选框功能
    initTasks();
    
    // 初始化快捷操作按钮
    initQuickActions();
});

// 导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取目标内容区域ID
            const targetId = this.getAttribute('data-target');
            
            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的内容区域
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// 季节标签切换功能
function initSeasonTabs() {
    const seasonBtns = document.querySelectorAll('.season-btn');
    const seasonCrops = document.querySelectorAll('.season-crops');
    
    seasonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            seasonBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 获取季节
            const season = this.getAttribute('data-season');
            
            // 显示对应的季节作物
            seasonCrops.forEach(crops => {
                crops.classList.remove('active');
                if (crops.getAttribute('data-season') === season) {
                    crops.classList.add('active');
                }
            });
        });
    });
}

// 模态框功能
function initModals() {
    const addLogBtn = document.getElementById('add-log-btn');
    const modal = document.getElementById('add-log-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const saveBtn = document.querySelector('.save-btn');
    
    // 打开模态框
    if (addLogBtn) {
        addLogBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
    }
    
    // 关闭模态框函数
    function closeModalFunc() {
        modal.style.display = 'none';
    }
    
    // 关闭模态框
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModalFunc);
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // 保存日志
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const title = document.getElementById('log-title').value;
            const content = document.getElementById('log-content').value;
            const weather = document.querySelector('input[name="weather"]:checked').value;
            
            if (!title || !content) {
                alert('请填写标题和内容！');
                return;
            }
            
            // 这里可以添加保存逻辑，比如发送到服务器
            console.log('保存日志:', { title, content, weather });
            
            // 显示成功消息
            showNotification('日志已保存成功！');
            
            // 清空表单并关闭模态框
            document.getElementById('log-title').value = '';
            document.getElementById('log-content').value = '';
            closeModalFunc();
        });
    }
}

// 任务功能
function initTasks() {
    // 任务复选框
    const taskCheckboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.classList.add('completed');
                showNotification('任务已完成！');
            } else {
                label.classList.remove('completed');
            }
        });
    });
    
    // 目标复选框
    const goalCheckboxes = document.querySelectorAll('.goal-checkbox input[type="checkbox"]');
    goalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const goalItem = this.closest('.goal-item');
            const priorityElement = goalItem.querySelector('.goal-priority');
            
            if (this.checked) {
                goalItem.style.opacity = '0.7';
                priorityElement.textContent = '已完成';
                priorityElement.className = 'goal-priority completed';
                showNotification('目标已完成！');
            } else {
                goalItem.style.opacity = '1';
                priorityElement.textContent = '高优先级';
                priorityElement.className = 'goal-priority high';
            }
        });
    });
}

// 快捷操作按钮功能
function initQuickActions() {
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            switch(action) {
                case '保存进度':
                    showNotification('农场进度已保存！');
                    break;
                case '新的一天':
                    showNotification('新的一天开始了！');
                    // 这里可以添加更多逻辑，比如重置任务等
                    break;
                case '购买种子':
                    showNotification('前往皮埃尔的商店购买种子');
                    break;
                case '查看礼物':
                    showNotification('查看村民喜欢的礼物清单');
                    break;
                default:
                    showNotification('功能正在开发中...');
            }
        });
    });
    
    // 生日提醒按钮
    const remindBtns = document.querySelectorAll('.remind-btn');
    remindBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const birthdayItem = this.closest('.birthday-item');
            const name = birthdayItem.querySelector('.birthday-name').textContent;
            const date = birthdayItem.querySelector('.birthday-date').textContent;
            
            showNotification(`已为${name}的生日（${date}）设置提醒`);
            this.textContent = '已提醒';
            this.disabled = true;
        });
    });
    
    // 阅读更多按钮
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const logEntry = this.closest('.log-entry');
            const title = logEntry.querySelector('.log-title').textContent;
            const date = logEntry.querySelector('.date').textContent;
            
            showNotification(`正在加载《${title}》的完整内容（${date}）...`);
            // 这里可以添加加载完整内容的逻辑
        });
    });
}

// 显示通知函数
function showNotification(message) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4c8c2b;
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 600;
        animation: notificationSlideIn 0.3s ease, notificationFadeOut 0.3s ease 2.7s;
    `;
    
    // 添加动画样式
    if (!document.querySelector('#notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes notificationFadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// 添加新任务功能
const addGoalBtn = document.getElementById('add-goal-btn');
if (addGoalBtn) {
    addGoalBtn.addEventListener('click', function() {
        const taskName = prompt('请输入新任务名称：');
        if (taskName && taskName.trim() !== '') {
            // 这里可以添加实际添加任务的逻辑
            showNotification(`新任务"${taskName}"已添加`);
        }
    });
}
