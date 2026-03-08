var LUNAR_INFO = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
    0x0d520
];

var Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
var Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
var Animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
var lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
var lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function solarToLunar(year, month, day) {
    var i, leap = 0, temp = 0;
    var baseDate = new Date(1900, 0, 31);
    var objDate = new Date(year, month - 1, day);
    var offset = Math.floor((objDate - baseDate) / 86400000);
    
    for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp;
        i--;
    }
    
    var lunarYear = i;
    leap = leapMonth(i);
    var isLeap = false;
    
    for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i === (leap + 1) && isLeap === false) {
            --i;
            isLeap = true;
            temp = leapDays(lunarYear);
        } else {
            temp = monthDays(lunarYear, i);
        }
        
        if (isLeap === true && i === (leap + 1)) isLeap = false;
        offset -= temp;
    }
    
    if (offset === 0 && leap > 0 && i === leap + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true;
            --i;
        }
    }
    
    if (offset < 0) {
        offset += temp;
        --i;
    }
    
    var lunarMonth = i;
    var lunarDay = offset + 1;
    
    return {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
        isLeap: isLeap,
        yearGanZhi: cyclical(lunarYear - 1900 + 36),
        zodiac: Animals[(lunarYear - 1900) % 12]
    };
}

function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
    }
    return (sum + leapDays(y));
}

function leapMonth(y) {
    return (LUNAR_INFO[y - 1900] & 0xf);
}

function leapDays(y) {
    if (leapMonth(y)) {
        return ((LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29);
    } else {
        return (0);
    }
}

function monthDays(y, m) {
    return ((LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}

function getLunarDateStr(year, month, day) {
    var lunar = solarToLunar(year, month, day);
    var monthStr = lunarMonths[lunar.month - 1];
    if (lunar.isLeap) monthStr = '闰' + monthStr;
    
    if (lunar.day === 1) {
        return monthStr + '月初一';
    }
    
    return lunarDays[lunar.day - 1];
}

var LEVELS = [
    { level: 1, name: '初遇心动', desc: '故事的开始', min: 0, max: 199 },
    { level: 2, name: '悄悄喜欢', desc: '每天都想见到你', min: 200, max: 499 },
    { level: 3, name: '心生暖意', desc: '有你在身边真好', min: 500, max: 2372 },
    { level: 4, name: '甜蜜热恋', desc: '全世界最幸福的人', min: 2373, max: 4745 },
    { level: 5, name: '彼此依赖', desc: '习惯了有你的生活', min: 4746, max: 7117 },
    { level: 6, name: '深度信任', desc: '你是我最放心的人', min: 7118, max: 11862 },
    { level: 7, name: '灵魂契合', desc: '一个眼神就懂', min: 11863, max: 16607 },
    { level: 8, name: '一生相伴', desc: '想和你走完这一生', min: 16608, max: 23724 },
    { level: 9, name: '命中注定', desc: '原来你就是对的人', min: 23725, max: 118624 },
    { level: 10, name: '圆满永恒', desc: '我们的故事还在继续', min: 118625, max: Infinity }
];

var POINTS = {
    checkin: 5,
    happiness: 8,
    emotion: 10,
    respondEmotion: 12,
    conflict: 15,
    reconcile: 50,
    ignore: -10,
    coupleTask: 15
};

var COUPLE_TASKS = [
    { id: 'eat_together', name: '一起吃饭', icon: '🍽️', points: 15, desc: '一起享用一顿美餐' },
    { id: 'watch_movie', name: '一起看电影', icon: '🎬', points: 18, desc: '一起看一部喜欢的电影' },
    { id: 'say_love', name: '说情话', icon: '💌', points: 12, desc: '对TA说一句甜甜的情话' },
    { id: 'hug', name: '拥抱', icon: '🤗', points: 15, desc: '给对方一个温暖的拥抱' },
    { id: 'walk_together', name: '一起散步', icon: '🚶', points: 12, desc: '手牵手一起散步' },
    { id: 'take_photo', name: '合照', icon: '📸', points: 20, desc: '拍一张甜蜜的合照' },
    { id: 'share_music', name: '分享音乐', icon: '🎵', points: 10, desc: '分享一首你喜欢的歌' },
    { id: 'gift', name: '送小礼物', icon: '🎁', points: 25, desc: '给对方准备一个小惊喜' },
    { id: 'cook_together', name: '一起做饭', icon: '👨‍🍳', points: 20, desc: '一起在厨房忙碌' },
    { id: 'good_night', name: '道晚安', icon: '🌙', points: 8, desc: '睡前说一句晚安' }
];

var QUOTES = [
    '"双向奔赴的爱，才最有意义"',
    '"每一次想念，都是爱的积累"',
    '"矛盾让我们更了解彼此"',
    '"幸福就是和你在一起的每一刻"',
    '"珍惜眼前人，珍惜当下"',
    '"最好的爱情是共同成长"',
    '"爱是理解，更是包容"',
    '"每一天都是新的开始"',
    '"你的笑容是我最美的风景"',
    '"爱是陪伴，是最长情的告白"'
];

var ACHIEVEMENTS = [
    { id: 'first_checkin', name: '初次思念', desc: '完成第一次签到', icon: '💕', condition: function(data) { return data.stats.miss >= 1; } },
    { id: 'checkin_7', name: '一周思念', desc: '签到7次', icon: '🌸', condition: function(data) { return data.stats.miss >= 7; } },
    { id: 'checkin_30', name: '一月思念', desc: '签到30次', icon: '🌺', condition: function(data) { return data.stats.miss >= 30; } },
    { id: 'checkin_100', name: '百日思念', desc: '签到100次', icon: '🌷', condition: function(data) { return data.stats.miss >= 100; } },
    { id: 'emotion_1', name: '敞开心扉', desc: '第一次分享情绪', icon: '💭', condition: function(data) { return data.stats.emotion >= 1; } },
    { id: 'emotion_10', name: '情绪树洞', desc: '分享10次情绪', icon: '🌊', condition: function(data) { return data.stats.emotion >= 10; } },
    { id: 'happiness_1', name: '幸福一刻', desc: '第一次记录幸福', icon: '✨', condition: function(data) { return data.stats.happiness >= 1; } },
    { id: 'happiness_10', name: '幸福满满', desc: '记录10次幸福', icon: '🌟', condition: function(data) { return data.stats.happiness >= 10; } },
    { id: 'reconcile_1', name: '重归于好', desc: '第一次和解', icon: '💝', condition: function(data) { return data.stats.reconcile >= 1; } },
    { id: 'reconcile_5', name: '珍惜彼此', desc: '和解5次', icon: '💗', condition: function(data) { return data.stats.reconcile >= 5; } },
    { id: 'level_3', name: '心生暖意', desc: '达到第3级', icon: '🌸', condition: function(data) { return data.intimacy >= 500; } },
    { id: 'level_5', name: '彼此依赖', desc: '达到第5级', icon: '💫', condition: function(data) { return data.intimacy >= 4746; } },
    { id: 'level_7', name: '灵魂契合', desc: '达到第7级', icon: '⭐', condition: function(data) { return data.intimacy >= 11863; } },
    { id: 'level_10', name: '圆满永恒', desc: '达到最高级', icon: '👑', condition: function(data) { return data.intimacy >= 118625; } },
    { id: 'first_task', name: '第一个任务', desc: '完成第一个情侣任务', icon: '🎯', condition: function(data) { return data.stats.coupleTasks >= 1; } },
    { id: 'task_5', name: '渐入佳境', desc: '完成5个情侣任务', icon: '💪', condition: function(data) { return data.stats.coupleTasks >= 5; } },
    { id: 'task_10', name: '默契搭档', desc: '完成10个情侣任务', icon: '🤝', condition: function(data) { return data.stats.coupleTasks >= 10; } },
    { id: 'task_30', name: '神仙伴侣', desc: '完成30个情侣任务', icon: '💑', condition: function(data) { return data.stats.coupleTasks >= 30; } },
    { id: 'first_anniversary', name: '重要时刻', desc: '添加第一个纪念日', icon: '🎀', condition: function(data) { return data.anniversaries.length >= 1; } },
    { id: 'records_50', name: '爱的记忆', desc: '累计50条记录', icon: '📝', condition: function(data) { return data.records.length >= 50; } },
    { id: 'records_200', name: '爱情档案', desc: '累计200条记录', icon: '📚', condition: function(data) { return data.records.length >= 200; } }
];

var currentUser = null;
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var currentTab = null;
var appData = null;
var selectedAvatar = null;
var currentTimelineFilter = 'all';
var recognition = null;

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createDefaultAppData() {
    return {
        intimacy: 0,
        checkinDate: null,
        checkinHistory: [],
        records: [],
        messages: [],
        anniversaries: [],
        achievements: [],
        partnerId: null,
        stats: {
            miss: 0,
            emotion: 0,
            happiness: 0,
            reconcile: 0,
            coupleTasks: 0
        },
        dailyTasks: [],
        dailyTasksDate: null,
        lastIntimacy: 0,
        backupHistory: []
    };
}

function getUsers() {
    var users = localStorage.getItem('loveSavingsUsers');
    return users ? JSON.parse(users) : {};
}

function saveUsers(users) {
    localStorage.setItem('loveSavingsUsers', JSON.stringify(users));
}

function getUserData(userId) {
    var data = localStorage.getItem('loveSavingsUserData_' + userId);
    return data ? JSON.parse(data) : createDefaultAppData();
}

function saveUserData(userId, data) {
    localStorage.setItem('loveSavingsUserData_' + userId, JSON.stringify(data));
}

function getCurrentUserData() {
    if (!currentUser) return null;
    return getUserData(currentUser);
}

function saveCurrentUserData(data) {
    if (!currentUser) return;
    saveUserData(currentUser, data);
}

function autoBackup() {
    if (!currentUser || !appData) return;
    
    var backupData = {
        data: appData,
        timestamp: new Date().toISOString(),
        userId: currentUser
    };
    
    var backupKey = 'loveSavingsBackup_' + currentUser + '_' + new Date().toDateString();
    localStorage.setItem(backupKey, JSON.stringify(backupData));
    
    if (!appData.backupHistory) {
        appData.backupHistory = [];
    }
    
    appData.backupHistory.unshift({
        date: new Date().toISOString(),
        key: backupKey
    });
    
    if (appData.backupHistory.length > 30) {
        var oldBackup = appData.backupHistory.pop();
        try {
            localStorage.removeItem(oldBackup.key);
        } catch (e) {
            console.log('删除旧备份失败:', e);
        }
    }
    
    saveCurrentUserData(appData);
}

function init() {
    checkLogoImage();
    loadCurrentUser();
    setInterval(function() {
        if (currentUser) {
            checkIgnoredMessages();
            updateUI();
        }
    }, 60000);
    
    setInterval(function() {
        if (currentUser) {
            autoBackup();
        }
    }, 3600000);
}

function checkLogoImage() {
    var logoImage = document.querySelector('.logo-image');
    var logoEmoji = document.querySelector('.logo-emoji');
    
    var img = new Image();
    img.onload = function() {
        if (logoImage) {
            logoImage.style.display = 'inline-block';
            logoImage.src = 'logo.png';
        }
        if (logoEmoji) {
            logoEmoji.style.display = 'none';
        }
    };
    img.onerror = function() {
        if (logoEmoji) {
            logoEmoji.style.display = 'block';
        }
    };
    img.src = 'logo.png';
}

function loadCurrentUser() {
    var savedUser = localStorage.getItem('loveSavingsCurrentUser');
    if (savedUser) {
        currentUser = savedUser;
        appData = getCurrentUserData();
        var modal = document.getElementById('login-register-modal');
        if (modal) modal.classList.remove('show');
        updateUI();
        setTimeout(checkAnniversaryReminders, 1000);
    }
}

function switchLoginTab(tab) {
    var loginTab = document.getElementById('login-tab');
    var registerTab = document.getElementById('register-tab');
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

function handleRegister() {
    var account = document.getElementById('register-account').value.trim();
    var nickname = document.getElementById('register-nickname').value.trim();
    var password = document.getElementById('register-password').value;
    var confirm = document.getElementById('register-confirm').value;
    
    if (!account || !nickname || !password) {
        alert('请填写完整信息');
        return;
    }
    
    if (password !== confirm) {
        alert('两次密码输入不一致');
        return;
    }
    
    var users = getUsers();
    if (users[account]) {
        alert('该账号已存在');
        return;
    }
    
    users[account] = {
        account: account,
        nickname: nickname,
        password: password,
        avatar: '👤',
        createdAt: new Date().toISOString()
    };
    
    saveUsers(users);
    saveUserData(account, createDefaultAppData());
    
    alert('注册成功！请登录');
    switchLoginTab('login');
}

function handleLogin() {
    var account = document.getElementById('login-account').value.trim();
    var password = document.getElementById('login-password').value;
    
    if (!account || !password) {
        alert('请填写账号和密码');
        return;
    }
    
    var users = getUsers();
    var user = users[account];
    
    if (!user) {
        alert('账号不存在');
        return;
    }
    
    if (user.password !== password) {
        alert('密码错误');
        return;
    }
    
    currentUser = account;
    appData = getCurrentUserData();
    localStorage.setItem('loveSavingsCurrentUser', account);
    
    var modal = document.getElementById('login-register-modal');
    if (modal) modal.classList.remove('show');
    
    updateUI();
}

function handleLogout() {
    if (!confirm('确定要退出登录吗？')) return;
    
    currentUser = null;
    appData = null;
    localStorage.removeItem('loveSavingsCurrentUser');
    
    var modal = document.getElementById('login-register-modal');
    if (modal) modal.classList.add('show');
}

function openEditProfile() {
    var users = getUsers();
    var user = users[currentUser];
    
    openModal('<h3 class="modal-title">✏️ 编辑资料</h3><div class="form-group"><label>昵称</label><input type="text" id="edit-nickname" value="' + escapeHtml(user.nickname || '') + '"></div><div class="form-group"><label>选择头像</label><div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;"><span class="avatar-option" data-avatar="👤">👤</span><span class="avatar-option" data-avatar="👦">👦</span><span class="avatar-option" data-avatar="👧">👧</span><span class="avatar-option" data-avatar="🧑">🧑</span><span class="avatar-option" data-avatar="👨">👨</span><span class="avatar-option" data-avatar="👩">👩</span></div></div><button class="submit-btn" onclick="saveProfile()">保存</button>');
    
    setTimeout(function() {
        var avatarOptions = document.querySelectorAll('.avatar-option');
        for (var i = 0; i < avatarOptions.length; i++) {
            avatarOptions[i].addEventListener('click', handleAvatarSelect);
        }
    }, 50);
}

function handleAvatarSelect(event) {
    var elements = document.querySelectorAll('.avatar-option');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.border = '2px solid #e9ecef';
    }
    event.target.style.border = '2px solid #ff6b6b';
    selectedAvatar = event.target.getAttribute('data-avatar');
}

function saveProfile() {
    var nickname = document.getElementById('edit-nickname').value.trim();
    if (!nickname) {
        alert('昵称不能为空');
        return;
    }
    
    var users = getUsers();
    users[currentUser].nickname = nickname;
    if (selectedAvatar) {
        users[currentUser].avatar = selectedAvatar;
    }
    saveUsers(users);
    
    updateUI();
    closeModal();
}

function openPartnerBind() {
    openModal('<h3 class="modal-title">💕 绑定伴侣</h3><div class="form-group"><label>对方的账号</label><input type="text" id="partner-account" placeholder="请输入对方账号"></div><button class="submit-btn" onclick="bindPartner()">绑定</button>');
}

function bindPartner() {
    var partnerAccount = document.getElementById('partner-account').value.trim();
    if (!partnerAccount) {
        alert('请输入对方账号');
        return;
    }
    
    var users = getUsers();
    if (!users[partnerAccount]) {
        alert('该账号不存在');
        return;
    }
    
    if (partnerAccount === currentUser) {
        alert('不能绑定自己');
        return;
    }
    
    appData.partnerId = partnerAccount;
    saveCurrentUserData(appData);
    
    updateUI();
    closeModal();
    alert('绑定成功！');
}

function switchTab(tabName) {
    if (!currentUser) return;
    
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    var allTabs = ['home', 'tasks', 'calendar', 'messages', 'savings', 'anniversary', 'profile', 'timeline'];
    var tabIndex = allTabs.indexOf(tabName);
    if (tabIndex !== -1 && tabs[tabIndex]) {
        tabs[tabIndex].classList.add('active');
    }
    
    loadPage(tabName);
}

function loadPage(tabName) {
    var pageContent = document.getElementById('page-content');
    if (!pageContent) return;
    
    var pagePath = 'pages/' + tabName + '.html';
    
    fetch(pagePath)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('页面加载失败: ' + response.status);
            }
            return response.text();
        })
        .then(function(html) {
            pageContent.innerHTML = html;
            currentTab = tabName;
            
            if (tabName === 'calendar') {
                updateCalendar();
            } else if (tabName === 'anniversary') {
                updateAnniversaries();
            } else if (tabName === 'profile') {
                updateProfile();
            } else if (tabName === 'timeline') {
                updateTimeline();
            } else if (tabName === 'messages') {
                updateMessages();
            } else if (tabName === 'home') {
                updateQuote();
                updateHomePage();
            } else if (tabName === 'tasks') {
                updateTasks();
            }
        })
        .catch(function(error) {
            pageContent.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>页面加载失败</p><p>请刷新页面重试</p></div>';
            console.error('加载页面出错:', error);
        });
}

function getCurrentLevel() {
    for (var i = LEVELS.length - 1; i >= 0; i--) {
        if (appData.intimacy >= LEVELS[i].min) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

function getLevelProgress() {
    var level = getCurrentLevel();
    if (level.level === 10) {
        return 100;
    }
    var total = level.max - level.min;
    var current = appData.intimacy - level.min;
    return Math.min(100, (current / total) * 100);
}

function getTodayString() {
    return new Date().toDateString();
}

function isCheckedInToday() {
    return appData.checkinDate === getTodayString();
}

function padNumber(num) {
    return num < 10 ? '0' + num : num;
}

function formatDate(dateString) {
    var date = new Date(dateString);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = padNumber(date.getHours());
    var minute = padNumber(date.getMinutes());
    return month + '月' + day + '日 ' + hour + ':' + minute;
}

function arrayContains(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return false;
}

function getUnreadCount() {
    if (!currentUser) return 0;
    var count = 0;
    for (var i = 0; i < appData.messages.length; i++) {
        var msg = appData.messages[i];
        if (msg.to === currentUser && !msg.read && !msg.ignored) {
            count++;
        }
    }
    return count;
}

function checkIgnoredMessages() {
    var now = new Date().getTime();
    var twentyFourHours = 24 * 60 * 60 * 1000;
    
    for (var i = 0; i < appData.messages.length; i++) {
        var msg = appData.messages[i];
        if (!msg.read && !msg.ignored && !msg.responded) {
            var msgTime = new Date(msg.date).getTime();
            if (now - msgTime > twentyFourHours) {
                msg.ignored = true;
                appData.intimacy = Math.max(0, appData.intimacy + POINTS.ignore);
                var record = {
                    id: Date.now(),
                    type: 'ignore',
                    date: new Date().toISOString(),
                    points: POINTS.ignore,
                    content: '忽略对方消息'
                };
                appData.records.unshift(record);
            }
        }
    }
    saveCurrentUserData(appData);
}

function checkAchievements() {
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var achievement = ACHIEVEMENTS[i];
        if (!arrayContains(appData.achievements, achievement.id) && achievement.condition(appData)) {
            appData.achievements.push(achievement.id);
            showAchievementUnlock(achievement);
        }
    }
}

function showAchievementUnlock(achievement) {
    openModal('<div class="success-message"><div class="success-icon">🏆</div><div class="success-text">成就解锁！</div><div style="font-size: 2rem; margin: 15px 0;">' + achievement.icon + '</div><div class="success-text">' + achievement.name + '</div><div style="color: #666; margin-top: 10px;">' + achievement.desc + '</div></div>');
    setTimeout(closeModal, 3000);
}

function shuffleArray(arr) {
    var newArr = arr.slice();
    for (var i = newArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}

function generateDailyTasks() {
    var today = new Date().toDateString();
    if (appData.dailyTasksDate !== today) {
        var shuffled = shuffleArray(COUPLE_TASKS);
        var selected = shuffled.slice(0, 5);
        appData.dailyTasks = [];
        for (var i = 0; i < selected.length; i++) {
            appData.dailyTasks.push({
                id: selected[i].id,
                name: selected[i].name,
                icon: selected[i].icon,
                points: selected[i].points,
                desc: selected[i].desc,
                confirmedBy: [],
                completed: false
            });
        }
        appData.dailyTasksDate = today;
        saveCurrentUserData(appData);
    }
}

function confirmTask(taskId) {
    var task = null;
    for (var i = 0; i < appData.dailyTasks.length; i++) {
        if (appData.dailyTasks[i].id === taskId) {
            task = appData.dailyTasks[i];
            break;
        }
    }
    if (!task) return;
    
    if (!arrayContains(task.confirmedBy, currentUser)) {
        task.confirmedBy.push(currentUser);
    }
    
    if (task.confirmedBy.length >= 2 && !task.completed) {
        task.completed = true;
        appData.intimacy += task.points;
        appData.stats.coupleTasks++;
        
        var record = {
            id: Date.now(),
            type: 'coupleTask',
            date: new Date().toISOString(),
            points: task.points,
            content: '完成情侣任务：' + task.name
        };
        appData.records.unshift(record);
        
        showSuccess('coupleTask', task.points);
    }
    
    saveCurrentUserData(appData);
    updateUI();
}

function checkAnniversaryReminders() {
    var today = new Date();
    var todayStr = today.toDateString();
    
    for (var i = 0; i < appData.anniversaries.length; i++) {
        var anniv = appData.anniversaries[i];
        var annivDate = new Date(anniv.date);
        var thisYearDate = new Date(today.getFullYear(), annivDate.getMonth(), annivDate.getDate());
        
        var diffTime = thisYearDate - today;
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 3 || diffDays === 1) {
            var reminderKey = 'annivReminder_' + anniv.id + '_' + diffDays + '_' + todayStr;
            if (!localStorage.getItem(reminderKey)) {
                localStorage.setItem(reminderKey, 'true');
                openModal('<div class="success-message"><div class="success-icon">🎀</div><div class="success-text">纪念日提醒！</div><div style="font-size: 1.2rem; margin: 15px 0;">' + escapeHtml(anniv.title) + '</div><div style="color: #666;">还有 ' + diffDays + ' 天就到了！</div></div>');
            }
        }
    }
}

function updateUI() {
    if (!currentUser || !appData) return;

    var users = getUsers();
    var user = users[currentUser];
    
    var currentUserEl = document.getElementById('current-user');
    if (currentUserEl && user) {
        currentUserEl.textContent = user.avatar + ' ' + user.nickname;
    }
    
    var level = getCurrentLevel();
    
    var levelNameEl = document.getElementById('level-name');
    if (levelNameEl) levelNameEl.textContent = level.name;
    
    var levelProgressEl = document.getElementById('level-progress');
    if (levelProgressEl) levelProgressEl.style.width = getLevelProgress() + '%';
    
    var intimacyScoreEl = document.getElementById('intimacy-score');
    if (intimacyScoreEl) {
        if (level.level === 10) {
            intimacyScoreEl.textContent = appData.intimacy + ' 分';
        } else {
            intimacyScoreEl.textContent = appData.intimacy + ' / ' + level.max;
        }
    }

    var unreadCount = getUnreadCount();
    var unreadBadge = document.getElementById('unread-badge');
    if (unreadBadge) {
        unreadBadge.textContent = unreadCount;
        unreadBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }

    if (!currentTab) {
        loadPage('home');
    } else {
        if (currentTab === 'home') {
            updateQuote();
            updateHomePage();
        } else if (currentTab === 'calendar') {
            updateCalendar();
        } else if (currentTab === 'anniversary') {
            updateAnniversaries();
        } else if (currentTab === 'profile') {
            updateProfile();
        } else if (currentTab === 'timeline') {
            updateTimeline();
        } else if (currentTab === 'messages') {
            updateMessages();
        } else if (currentTab === 'tasks') {
            updateTasks();
        }
    }
    
    checkAchievements();
    saveCurrentUserData(appData);
}

function updateTodayPanel() {
    var todayItemsEl = document.getElementById('today-items');
    if (!todayItemsEl) return;
    
    var items = [];
    
    if (!isCheckedInToday()) {
        items.push({ icon: '🌸', text: '还未签到，快去想TA！', action: 'handleCheckin()', actionText: '立即签到' });
    }
    
    generateDailyTasks();
    var pendingTasks = 0;
    for (var i = 0; i < appData.dailyTasks.length; i++) {
        if (!appData.dailyTasks[i].completed) {
            pendingTasks++;
        }
    }
    if (pendingTasks > 0) {
        items.push({ icon: '🎯', text: '今日还有 ' + pendingTasks + ' 个情侣任务待完成', action: 'switchTab("tasks")', actionText: '去完成' });
    }
    
    var unreadMessages = getUnreadCount();
    if (unreadMessages > 0) {
        items.push({ icon: '💬', text: '有 ' + unreadMessages + ' 条未读消息', action: 'switchTab("messages")', actionText: '去回应' });
    }
    
    var today = new Date();
    for (var j = 0; j < appData.anniversaries.length; j++) {
        var anniv = appData.anniversaries[j];
        var annivDate = new Date(anniv.date);
        var nextDate = new Date(today.getFullYear(), annivDate.getMonth(), annivDate.getDate());
        var diffDays = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays === 0 || diffDays === 1 || diffDays === 3) {
            var daysText = diffDays === 0 ? '🎉 今天是' : (diffDays === 1 ? '⏰ 明天是' : '📅 还有' + diffDays + '天是');
            items.push({ icon: '🎀', text: daysText + '「' + anniv.title + '」', action: 'switchTab("anniversary")', actionText: '查看详情' });
        }
    }
    
    if (items.length === 0) {
        items.push({ icon: '✨', text: '今天的任务都完成啦！继续保持', action: null, actionText: null });
    }
    
    var html = '';
    for (var k = 0; k < items.length; k++) {
        var item = items[k];
        html += '<div class="today-item">';
        html += '<div class="today-item-icon">' + item.icon + '</div>';
        html += '<div class="today-item-text">' + item.text + '</div>';
        if (item.action) {
            html += '<button class="today-item-btn" onclick="' + item.action + '">' + item.actionText + '</button>';
        }
        html += '</div>';
    }
    
    todayItemsEl.innerHTML = html;
}

function updateHomePage() {
    var checkinBtn = document.getElementById('checkin-btn');
    var checkinStatus = document.getElementById('checkin-status');
    var missCountEl = document.getElementById('miss-count');
    var emotionCountEl = document.getElementById('emotion-count');
    var happinessCountEl = document.getElementById('happiness-count');
    var reconcileCountEl = document.getElementById('reconcile-count');
    
    if (checkinBtn && checkinStatus) {
        if (isCheckedInToday()) {
            checkinBtn.disabled = true;
            checkinBtn.textContent = '已签到 ✅';
            checkinStatus.textContent = '今日已签到';
        } else {
            checkinBtn.disabled = false;
            checkinBtn.textContent = '💕 想你了';
            checkinStatus.textContent = '今日未签到';
        }
    }
    
    if (missCountEl) missCountEl.textContent = appData.stats.miss;
    if (emotionCountEl) emotionCountEl.textContent = appData.stats.emotion;
    if (happinessCountEl) happinessCountEl.textContent = appData.stats.happiness;
    if (reconcileCountEl) reconcileCountEl.textContent = appData.stats.reconcile;
    
    updateTodayPanel();
}

function updateProfile() {
    if (!currentUser || !appData) return;
    
    var users = getUsers();
    var user = users[currentUser];
    
    var avatarEl = document.getElementById('profile-avatar');
    var nicknameEl = document.getElementById('profile-nickname');
    var accountEl = document.getElementById('profile-account');
    var intimacyEl = document.getElementById('profile-intimacy');
    var levelEl = document.getElementById('profile-level');
    var recordsEl = document.getElementById('profile-records');
    
    if (avatarEl && user) avatarEl.textContent = user.avatar;
    if (nicknameEl && user) nicknameEl.textContent = user.nickname;
    if (accountEl && user) accountEl.textContent = '账号: ' + user.account;
    if (intimacyEl) intimacyEl.textContent = appData.intimacy;
    if (levelEl) levelEl.textContent = getCurrentLevel().level;
    if (recordsEl) recordsEl.textContent = appData.records.length;
}

function updateQuote() {
    var quoteTextEl = document.getElementById('quote-text');
    if (quoteTextEl) {
        var quoteIndex = Math.floor(appData.intimacy / 50) % QUOTES.length;
        quoteTextEl.textContent = QUOTES[quoteIndex];
    }
}

function filterTimeline(filterType) {
    currentTimelineFilter = filterType;
    
    var filters = document.querySelectorAll('.timeline-filter');
    for (var i = 0; i < filters.length; i++) {
        filters[i].classList.remove('active');
        if (filters[i].getAttribute('onclick').indexOf("'" + filterType + "'") !== -1) {
            filters[i].classList.add('active');
        }
    }
    
    updateTimeline();
}

function updateTimeline() {
    var timelineList = document.getElementById('timeline-list');
    if (!timelineList) return;
    
    var filteredRecords = [];
    for (var i = 0; i < appData.records.length; i++) {
        var record = appData.records[i];
        if (currentTimelineFilter === 'all') {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'checkin' && record.type === 'checkin') {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'happiness' && record.type === 'happiness') {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'emotion' && record.type === 'emotion') {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'conflict' && (record.type === 'conflict' || record.type === 'reconcile')) {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'coupleTask' && record.type === 'coupleTask') {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'positive' && record.points > 0) {
            filteredRecords.push(record);
        } else if (currentTimelineFilter === 'negative' && record.points < 0) {
            filteredRecords.push(record);
        }
    }
    
    if (filteredRecords.length === 0) {
        timelineList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><p>该分类下暂无记录</p></div>';
        return;
    }

    var html = '';
    for (var j = 0; j < filteredRecords.length; j++) {
        var record = filteredRecords[j];
        var typeInfo;
        if (record.type === 'checkin') {
            typeInfo = { name: '思念储蓄', icon: '🌸', class: 'miss' };
        } else if (record.type === 'happiness') {
            typeInfo = { name: '幸福储蓄', icon: '✨', class: 'happiness' };
        } else if (record.type === 'emotion') {
            typeInfo = { name: '情绪储蓄', icon: '💭', class: 'emotion' };
        } else if (record.type === 'conflict') {
            typeInfo = { name: '吵架分析', icon: '⚔️', class: 'conflict' };
        } else if (record.type === 'reconcile') {
            typeInfo = { name: '和解确认', icon: '💝', class: 'reconcile' };
        } else if (record.type === 'coupleTask') {
            typeInfo = { name: '情侣任务', icon: '🎯', class: 'emotion' };
        } else {
            typeInfo = { name: '记录', icon: '📝', class: '' };
        }

        html += '<div class="timeline-item ' + typeInfo.class + '">';
        html += '<div class="timeline-header"><div class="timeline-type">' + typeInfo.icon + ' ' + typeInfo.name + '</div><div class="timeline-date">' + formatDate(record.date) + '</div></div>';
        if (record.content) {
            html += '<div class="timeline-content">' + escapeHtml(record.content) + '</div>';
        }
        html += '<div class="timeline-points">' + (record.points > 0 ? '+' : '') + record.points + ' 亲密度</div>';
        html += '</div>';
    }
    timelineList.innerHTML = html;
}

function updateMessages() {
    var messagesList = document.getElementById('messages-list');
    if (!messagesList) return;
    
    var myMessages = [];
    for (var i = 0; i < appData.messages.length; i++) {
        var msg = appData.messages[i];
        if (msg.to === currentUser) {
            myMessages.push(msg);
        }
    }
    
    if (myMessages.length === 0) {
        messagesList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💬</div><p>还没有收到消息</p></div>';
        return;
    }

    var html = '';
    for (var j = 0; j < myMessages.length; j++) {
        var msg = myMessages[j];
        var isUnread = !msg.read && !msg.ignored;
        var statusClass = '';
        var statusText = '';
        
        if (msg.responded) {
            statusClass = 'responded';
            statusText = '✓ 已回应';
        } else if (msg.ignored) {
            statusClass = 'ignored';
            statusText = '✗ 已忽略 (-10亲密度)';
        }

        html += '<div class="message-item ' + (isUnread ? 'unread' : '') + ' ' + (msg.ignored ? 'ignored' : '') + '">';
        html += '<div class="message-header"><div class="message-from">来自: ' + escapeHtml(msg.fromNickname) + '</div><div class="message-type">' + escapeHtml(msg.type) + '</div></div>';
        html += '<div class="message-content">' + escapeHtml(msg.content) + '</div>';
        html += '<div style="font-size: 0.85rem; color: #999; margin-bottom: 10px;">' + formatDate(msg.date) + '</div>';
        if (statusText) {
            html += '<div class="message-status ' + statusClass + '">' + statusText + '</div>';
        }
        if (!msg.responded && !msg.ignored) {
            html += '<div class="message-actions"><button class="respond-btn" onclick="respondToMessage(' + msg.id + ')">回应 (+12亲密度)</button></div>';
        }
        html += '</div>';
    }
    messagesList.innerHTML = html;
}

function respondToMessage(msgId) {
    var msg = null;
    for (var i = 0; i < appData.messages.length; i++) {
        if (appData.messages[i].id === msgId) {
            msg = appData.messages[i];
            break;
        }
    }
    if (!msg) return;
    
    msg.read = true;
    msg.responded = true;
    msg.respondDate = new Date().toISOString();
    
    appData.intimacy += POINTS.respondEmotion;
    var record = {
        id: Date.now(),
        type: 'emotion',
        date: new Date().toISOString(),
        points: POINTS.respondEmotion,
        content: '回应了对方的情绪'
    };
    appData.records.unshift(record);
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('emotion', POINTS.respondEmotion);
}

function handleCheckin() {
    if (isCheckedInToday()) return;
    
    appData.checkinDate = getTodayString();
    
    var todayKey = new Date().toISOString().split('T')[0];
    if (!arrayContains(appData.checkinHistory, todayKey)) {
        appData.checkinHistory.push(todayKey);
    }
    
    appData.stats.miss++;
    appData.intimacy += POINTS.checkin;
    
    var record = {
        id: Date.now(),
        type: 'checkin',
        date: new Date().toISOString(),
        points: POINTS.checkin
    };
    appData.records.unshift(record);
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('checkin', POINTS.checkin);
}

function isDateChecked(dateStr) {
    if (!currentUser) return false;
    return arrayContains(appData.checkinHistory, dateStr);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function getAnniversariesForDate(month, day) {
    var result = [];
    for (var i = 0; i < appData.anniversaries.length; i++) {
        var anniv = appData.anniversaries[i];
        var annivDate = new Date(anniv.date);
        if (annivDate.getMonth() === month && annivDate.getDate() === day) {
            result.push(anniv);
        }
    }
    return result;
}

function updateCalendar() {
    var titleEl = document.getElementById('calendar-title');
    var gridEl = document.getElementById('calendar-grid');
    
    if (!titleEl || !gridEl) return;
    
    titleEl.textContent = currentYear + '年' + (currentMonth + 1) + '月';
    
    var firstDay = new Date(currentYear, currentMonth, 1);
    var lastDay = new Date(currentYear, currentMonth + 1, 0);
    var daysInMonth = lastDay.getDate();
    var startingDay = firstDay.getDay();
    
    var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    var html = '<div class="calendar-weekdays">';
    for (var i = 0; i < weekdays.length; i++) {
        html += '<div>' + weekdays[i] + '</div>';
    }
    html += '</div><div class="calendar-days">';
    
    for (var j = 0; j < startingDay; j++) {
        html += '<div class="calendar-day empty"></div>';
    }
    
    var today = new Date();
    var todayStr = today.toISOString().split('T')[0];
    
    for (var day = 1; day <= daysInMonth; day++) {
        var date = new Date(currentYear, currentMonth, day);
        var dateStr = date.toISOString().split('T')[0];
        var isToday = dateStr === todayStr;
        var isChecked = isDateChecked(dateStr);
        var lunarStr = getLunarDateStr(currentYear, currentMonth + 1, day);
        var anniversaries = getAnniversariesForDate(currentMonth, day);
        var hasAnniversary = anniversaries.length > 0;
        
        var classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isChecked) classes += ' checked';
        if (hasAnniversary) classes += ' anniversary';
        
        var titles = '';
        for (var k = 0; k < anniversaries.length; k++) {
            if (k > 0) titles += ', ';
            titles += anniversaries[k].title;
        }
        
        html += '<div class="' + classes + '" title="' + (hasAnniversary ? escapeHtml(titles) : '') + '">';
        html += '<span class="day-number">' + day + '</span>';
        html += '<span class="lunar-date">' + lunarStr + '</span>';
        
        if (hasAnniversary) {
            html += '<span class="anniversary-icon">🎀</span>';
        }
        if (isChecked) {
            html += '<span class="day-icon">💕</span>';
        }
        html += '</div>';
    }
    
    html += '</div>';
    gridEl.innerHTML = html;
}

function openModal(content) {
    var modalBody = document.getElementById('modal-body');
    var modal = document.getElementById('modal');
    if (modalBody && modal) {
        modalBody.innerHTML = content;
        modal.classList.add('show');
    }
}

function closeModal() {
    var modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showSuccess(type, points) {
    var typeInfo;
    if (type === 'checkin') {
        typeInfo = { name: '思念储蓄', icon: '🌸' };
    } else if (type === 'happiness') {
        typeInfo = { name: '幸福储蓄', icon: '✨' };
    } else if (type === 'emotion') {
        typeInfo = { name: '情绪储蓄', icon: '💭' };
    } else if (type === 'conflict') {
        typeInfo = { name: '吵架分析', icon: '⚔️' };
    } else if (type === 'reconcile') {
        typeInfo = { name: '和解确认', icon: '💝' };
    } else if (type === 'coupleTask') {
        typeInfo = { name: '情侣任务', icon: '🎯' };
    } else {
        typeInfo = { name: '记录', icon: '📝' };
    }

    openModal('<div class="success-message"><div class="success-icon">' + typeInfo.icon + '</div><div class="success-text">' + typeInfo.name + '成功！</div><div class="points-text">' + (points > 0 ? '+' : '') + points + ' 亲密度</div></div>');
    setTimeout(closeModal, 2000);
}

function openMissForm() {
    openModal('<h3 class="modal-title">🌸 思念储蓄</h3><div class="form-group"><label>今天想对TA说什么？</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="miss-content" placeholder="写下你的思念..." style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'miss-content\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><button class="submit-btn" onclick="submitMiss()">保存思念</button>');
}

function submitMiss() {
    var contentEl = document.getElementById('miss-content');
    var content = contentEl ? contentEl.value : '';
    appData.stats.miss++;
    
    var record = {
        id: Date.now(),
        type: 'checkin',
        date: new Date().toISOString(),
        content: content,
        points: POINTS.checkin
    };
    appData.records.unshift(record);
    appData.intimacy += POINTS.checkin;
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('checkin', POINTS.checkin);
}

function openEmotionForm() {
    openModal('<h3 class="modal-title">💭 情绪储蓄</h3><div class="form-group"><label>你现在的心情是？</label><select id="emotion-type"><option value="sad">难过</option><option value="tired">累</option><option value="angry">生气</option><option value="anxious">焦虑</option><option value="lonely">孤单</option></select></div><div class="form-group"><label>发生了什么？</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="emotion-content" placeholder="写下你的感受..." style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'emotion-content\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><div class="form-group"><label>如何处理？</label><select id="emotion-action"><option value="save">暂存起来</option><option value="send">发给对方</option></select></div><button class="submit-btn" onclick="submitEmotion()">保存情绪</button>');
}

function submitEmotion() {
    var emotionTypeEl = document.getElementById('emotion-type');
    var emotionContentEl = document.getElementById('emotion-content');
    var emotionActionEl = document.getElementById('emotion-action');
    
    var emotionType = emotionTypeEl ? emotionTypeEl.value : '';
    var content = emotionContentEl ? emotionContentEl.value : '';
    var action = emotionActionEl ? emotionActionEl.value : 'save';
    
    var emotionNames = { sad: '难过', tired: '累', angry: '生气', anxious: '焦虑', lonely: '孤单' };
    var fullContent = '心情: ' + emotionNames[emotionType] + '\n\n' + content;
    
    appData.stats.emotion++;
    
    var record = {
        id: Date.now(),
        type: 'emotion',
        date: new Date().toISOString(),
        content: fullContent,
        points: POINTS.emotion
    };
    appData.records.unshift(record);
    appData.intimacy += POINTS.emotion;
    
    if (action === 'send' && appData.partnerId) {
        var users = getUsers();
        var partnerUser = users[appData.partnerId];
        var currentUsers = getUsers();
        var currentUserInfo = currentUsers[currentUser];
        
        var partnerData = getUserData(appData.partnerId);
        var message = {
            id: Date.now(),
            from: currentUser,
            fromNickname: currentUserInfo ? currentUserInfo.nickname : '对方',
            to: appData.partnerId,
            type: '情绪 - ' + emotionNames[emotionType],
            content: content,
            date: new Date().toISOString(),
            read: false,
            responded: false,
            ignored: false
        };
        partnerData.messages.unshift(message);
        saveUserData(appData.partnerId, partnerData);
    }
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('emotion', POINTS.emotion);
}

function openHappinessForm() {
    openModal('<h3 class="modal-title">✨ 幸福储蓄</h3><div class="form-group"><label>今天有什么甜蜜的事？</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="happiness-content" placeholder="记录幸福瞬间..." style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'happiness-content\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><button class="submit-btn" onclick="submitHappiness()">保存幸福</button>');
}

function submitHappiness() {
    var contentEl = document.getElementById('happiness-content');
    var content = contentEl ? contentEl.value : '';
    appData.stats.happiness++;
    
    var record = {
        id: Date.now(),
        type: 'happiness',
        date: new Date().toISOString(),
        content: content,
        points: POINTS.happiness
    };
    appData.records.unshift(record);
    appData.intimacy += POINTS.happiness;
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('happiness', POINTS.happiness);
}

function openConflictForm() {
    openModal('<h3 class="modal-title">⚔️ 吵架分析</h3><div class="form-group"><label>事情经过</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="conflict-what" placeholder="发生了什么事？" style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'conflict-what\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><div class="form-group"><label>真正在意的点</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="conflict-care" placeholder="你真正在意的是什么？" style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'conflict-care\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><div class="form-group"><label>想要的回应</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="conflict-want" placeholder="你希望对方如何回应？" style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'conflict-want\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><button class="submit-btn" onclick="submitConflict()">保存分析</button>');
}

function submitConflict() {
    var whatEl = document.getElementById('conflict-what');
    var careEl = document.getElementById('conflict-care');
    var wantEl = document.getElementById('conflict-want');
    
    var what = whatEl ? whatEl.value : '';
    var care = careEl ? careEl.value : '';
    var want = wantEl ? wantEl.value : '';
    var content = '事情经过：' + what + '\n\n真正在意的点：' + care + '\n\n想要的回应：' + want;
    
    var record = {
        id: Date.now(),
        type: 'conflict',
        date: new Date().toISOString(),
        content: content,
        points: POINTS.conflict
    };
    appData.records.unshift(record);
    appData.intimacy += POINTS.conflict;
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('conflict', POINTS.conflict);
}

function openReconcileForm() {
    openModal('<h3 class="modal-title">💝 和解确认</h3><div class="form-group"><label>确认和解，且更理解彼此了吗？</label><div style="display: flex; gap: 8px; align-items: flex-end;"><textarea id="reconcile-content" placeholder="写下和解的话..." style="flex: 1;"></textarea><button type="button" onclick="startVoiceInput(\'reconcile-content\')" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; font-size: 1.2rem;">🎤</button></div></div><button class="submit-btn" onclick="submitReconcile()">确认和解</button>');
}

function submitReconcile() {
    var contentEl = document.getElementById('reconcile-content');
    var content = contentEl ? contentEl.value : '';
    appData.stats.reconcile++;
    
    var record = {
        id: Date.now(),
        type: 'reconcile',
        date: new Date().toISOString(),
        content: content,
        points: POINTS.reconcile
    };
    appData.records.unshift(record);
    appData.intimacy += POINTS.reconcile;
    
    saveCurrentUserData(appData);
    updateUI();
    showSuccess('reconcile', POINTS.reconcile);
}

function openAddAnniversary() {
    openModal('<h3 class="modal-title">🎀 添加纪念日</h3><div class="form-group"><label>纪念日名称</label><input type="text" id="anniversary-title" placeholder="例如：在一起的第一天"></div><div class="form-group"><label>日期</label><input type="date" id="anniversary-date"></div><div class="form-group"><label>备注（可选）</label><textarea id="anniversary-note" placeholder="添加一些备注..."></textarea></div><button class="submit-btn" onclick="addAnniversary()">保存</button>');
}

function addAnniversary() {
    var titleEl = document.getElementById('anniversary-title');
    var dateEl = document.getElementById('anniversary-date');
    var noteEl = document.getElementById('anniversary-note');
    
    var title = titleEl ? titleEl.value : '';
    var date = dateEl ? dateEl.value : '';
    var note = noteEl ? noteEl.value : '';
    
    if (!title || !date) {
        alert('请填写完整信息');
        return;
    }
    
    var anniversary = {
        id: Date.now(),
        title: title,
        date: date,
        note: note
    };
    
    appData.anniversaries.push(anniversary);
    saveCurrentUserData(appData);
    updateAnniversaries();
    closeModal();
}

function deleteAnniversary(id) {
    if (!confirm('确定要删除这个纪念日吗？')) return;
    
    var newAnniversaries = [];
    for (var i = 0; i < appData.anniversaries.length; i++) {
        if (appData.anniversaries[i].id !== id) {
            newAnniversaries.push(appData.anniversaries[i]);
        }
    }
    appData.anniversaries = newAnniversaries;
    saveCurrentUserData(appData);
    updateAnniversaries();
}

function getNextAnniversaryDate(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    var annivDate = new Date(dateStr);
    var nextDate = new Date(today.getFullYear(), annivDate.getMonth(), annivDate.getDate());
    
    if (nextDate < today) {
        nextDate = new Date(today.getFullYear() + 1, annivDate.getMonth(), annivDate.getDate());
    }
    
    return nextDate;
}

function updateAnniversaries() {
    var listEl = document.getElementById('anniversary-list');
    if (!listEl) return;
    
    if (appData.anniversaries.length === 0) {
        listEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎀</div><p>还没有添加纪念日</p><p>记录你们的重要时刻吧！</p></div>';
        return;
    }
    
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    var sortedAnniversaries = appData.anniversaries.slice().sort(function(a, b) {
        var dateA = getNextAnniversaryDate(a.date);
        var dateB = getNextAnniversaryDate(b.date);
        return dateA - dateB;
    });
    
    var html = '';
    for (var i = 0; i < sortedAnniversaries.length; i++) {
        var anniversary = sortedAnniversaries[i];
        var annivDate = new Date(anniversary.date);
        var nextDate = getNextAnniversaryDate(anniversary.date);
        var diffDays = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
        
        var itemClass = '';
        var daysText = '';
        var daysClass = '';
        
        if (diffDays === 0) {
            itemClass = 'today';
            daysText = '🎉 今天！';
        } else if (diffDays > 0) {
            itemClass = 'upcoming';
            daysText = '还有 ' + diffDays + ' 天';
            daysClass = 'upcoming';
        } else {
            daysText = '已过 ' + Math.abs(diffDays) + ' 天';
        }
        
        html += '<div class="anniversary-item ' + itemClass + '">';
        html += '<div class="anniversary-title">' + escapeHtml(anniversary.title) + '</div>';
        html += '<div class="anniversary-date">' + (annivDate.getMonth() + 1) + '月' + annivDate.getDate() + '日</div>';
        html += '<div class="anniversary-days ' + daysClass + '">' + daysText + '</div>';
        if (anniversary.note) {
            html += '<div style="color: #666; font-size: 0.9rem; margin-top: 8px;">' + escapeHtml(anniversary.note) + '</div>';
        }
        html += '<div class="anniversary-actions"><button class="delete-btn" onclick="deleteAnniversary(' + anniversary.id + ')">删除</button></div>';
        html += '</div>';
    }
    
    listEl.innerHTML = html;
}

function updateTasks() {
    var tasksList = document.getElementById('tasks-list');
    if (!tasksList) return;
    
    generateDailyTasks();
    
    if (appData.dailyTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎯</div><p>暂无任务</p></div>';
        return;
    }

    var html = '';
    for (var i = 0; i < appData.dailyTasks.length; i++) {
        var task = appData.dailyTasks[i];
        var myConfirmed = arrayContains(task.confirmedBy, currentUser);
        var confirmCount = task.confirmedBy.length;
        
        html += '<div class="savings-btn" style="' + (task.completed ? 'opacity: 0.7; background: #f0fff0; border-color: #4CAF50;' : '') + '">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
        html += '<div>';
        html += '<div style="font-size: 1.5rem; margin-bottom: 5px;">' + task.icon + ' ' + task.name + '</div>';
        html += '<div style="font-size: 0.9rem; color: #666;">' + task.desc + '</div>';
        html += '<div style="font-size: 0.85rem; color: #888; margin-top: 5px;">';
        if (task.completed) {
            html += '✅ 已完成 +' + task.points + '分';
        } else {
            html += '确认中: ' + confirmCount + '/2人';
        }
        html += '</div>';
        html += '</div>';
        html += '<div style="text-align: right;">';
        if (!task.completed) {
            html += '<button class="submit-btn" style="padding: 10px 20px; font-size: 0.95rem;" onclick="confirmTask(\'' + task.id + '\')" ' + (myConfirmed ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : '') + '>';
            html += myConfirmed ? '已确认' : '确认完成';
            html += '</button>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    tasksList.innerHTML = html;
}

function openAchievements() {
    var html = '<h3 class="modal-title">🏆 我的成就</h3><div class="achievement-list">';
    
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var achievement = ACHIEVEMENTS[i];
        var unlocked = arrayContains(appData.achievements, achievement.id);
        html += '<div class="achievement-item ' + (unlocked ? 'unlocked' : 'locked') + '">';
        html += '<div class="achievement-icon">' + achievement.icon + '</div>';
        html += '<div class="achievement-info">';
        html += '<div class="achievement-name">' + achievement.name + '</div>';
        html += '<div class="achievement-desc">' + achievement.desc + '</div>';
        html += '<div class="achievement-status">' + (unlocked ? '✓ 已解锁' : '🔒 未解锁') + '</div>';
        html += '</div>';
        html += '</div>';
    }
    
    html += '</div>';
    openModal(html);
}

function restoreFromBackup(backupKey) {
    var backupStr = localStorage.getItem(backupKey);
    if (!backupStr) {
        alert('备份不存在');
        return;
    }
    
    try {
        var backupData = JSON.parse(backupStr);
        if (confirm('确定要恢复此备份吗？当前数据将被覆盖。\n\n备份时间: ' + new Date(backupData.timestamp).toLocaleString())) {
            appData = backupData.data;
            saveCurrentUserData(appData);
            updateUI();
            closeModal();
            alert('数据恢复成功！');
        }
    } catch (e) {
        alert('恢复备份失败，数据格式错误');
    }
}

function openBackupForm() {
    var html = '<h3 class="modal-title">💾 数据管理</h3><div class="backup-menu">';
    html += '<button class="backup-btn" onclick="exportData()">📤 导出数据</button>';
    html += '<button class="backup-btn" onclick="importData()">📥 导入数据</button>';
    
    if (appData.backupHistory && appData.backupHistory.length > 0) {
        html += '<h4 style="margin: 20px 0 10px; color: #666; font-size: 1rem;">📋 备份历史</h4>';
        html += '<div style="max-height: 200px; overflow-y: auto; margin-bottom: 15px;">';
        for (var i = 0; i < appData.backupHistory.length && i < 10; i++) {
            var backup = appData.backupHistory[i];
            var dateStr = new Date(backup.date).toLocaleString();
            html += '<div style="padding: 10px; background: #f5f5f5; border-radius: 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">';
            html += '<div style="font-size: 0.9rem; color: #666;">' + dateStr + '</div>';
            html += '<button style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; border: none; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.85rem;" onclick="restoreFromBackup(\'' + backup.key + '\')">恢复</button>';
            html += '</div>';
        }
        html += '</div>';
    }
    
    html += '<button class="backup-btn danger" onclick="clearData()">🗑️ 清空数据</button>';
    html += '</div>';
    
    openModal(html);
}

function exportData() {
    var dataStr = JSON.stringify(appData, null, 2);
    var blob = new Blob([dataStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'love-savings-data.json';
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
}

function importData() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        
        var reader = new FileReader();
        reader.onload = function(event) {
            try {
                var data = JSON.parse(event.target.result);
                if (confirm('确定要导入数据吗？当前数据将被覆盖。')) {
                    appData = data;
                    saveCurrentUserData(appData);
                    updateUI();
                    closeModal();
                    alert('数据导入成功！');
                }
            } catch (err) {
                alert('数据格式错误，请检查文件。');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearData() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        if (confirm('再次确认：真的要清空所有数据吗？')) {
            appData = createDefaultAppData();
            saveCurrentUserData(appData);
            updateUI();
            closeModal();
            alert('数据已清空！');
        }
    }
}

function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return false;
    }
    
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    return true;
}

function startVoiceInput(inputId) {
    if (!initSpeechRecognition() || !recognition) {
        alert('您的浏览器不支持语音识别功能');
        return;
    }
    
    var inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    
    recognition.onstart = function() {
        inputEl.placeholder = '正在听...';
    };
    
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        if (inputEl.tagName.toLowerCase() === 'textarea') {
            inputEl.value += (inputEl.value ? '\n' : '') + transcript;
        } else {
            inputEl.value = transcript;
        }
    };
    
    recognition.onerror = function(event) {
        inputEl.placeholder = inputEl.getAttribute('data-placeholder') || '';
        if (event.error !== 'no-speech') {
            alert('语音识别出错: ' + event.error);
        }
    };
    
    recognition.onend = function() {
        inputEl.placeholder = inputEl.getAttribute('data-placeholder') || '';
    };
    
    inputEl.setAttribute('data-placeholder', inputEl.placeholder);
    
    try {
        recognition.start();
    } catch (e) {
        console.log('语音识别启动失败:', e);
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('Service Worker 注册成功:', registration.scope);
            })
            .catch(function(error) {
                console.log('Service Worker 注册失败:', error);
            });
    }
}

window.addEventListener('load', function() {
    init();
    registerServiceWorker();
});