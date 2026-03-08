var currentTab = 'timer';
var timerMode = 'tomato';
var timerInterval = null;
var timerSeconds = 0;
var isTimerRunning = false;
var isPaused = false;
var isResting = false;

var segmentTimers = [];
var currentSegmentIndex = 0;

var timerStartTime = 0;
var initialTimerSeconds = 0;

var appData = {
    records: [],
    subjects: [],
    todos: [],
    settings: {
        reminderSound: 'default',
        vibration: true,
        theme: 'light',
        focusLock: false,
        minimalMode: false,
        antiDistraction: false,
        tomatoCycles: 4,
        tomatoStudyDuration: 25,
        tomatoRestDuration: 5
    }
};

var currentTodoView = 'today';
var activeTodoId = null;

var tomatoCurrentCycle = 1;
var tomatoCompletedCycles = 0;

var defaultSubjects = [
    { id: 1, name: '数学', color: '#E74C3C' },
    { id: 2, name: '英语', color: '#3498DB' },
    { id: 3, name: '政治', color: '#2ECC71' },
    { id: 4, name: '专业课', color: '#9B59B6' }
];

var motivationalQuotes = [
    '考研路上，每一步都算数！💪',
    '星光不问赶路人，时光不负有心人！🌟',
    '坚持到底，就是胜利！🏆',
    '现在的努力，是未来的底气！✨',
    '一战成硕，我们一研为定！🎓',
    '那些看似不起波澜的日复一日，会突然在某一天让人看到坚持的意义！🌅',
    '你的努力，终将美好！🌸',
    '把眼泪留给昨天，把努力留给今天！💫',
    '每一个不曾起舞的日子，都是对生命的辜负！🦋',
    '考研这条路，走得很累，但别走回头路！🚀',
    '你要悄悄努力，然后惊艳所有人！🎯',
    '备考就像在黑屋子里洗衣服，你不知道洗干净了没有，只能一遍一遍去洗。等到上了考场的那一刻，灯光亮了，你发现只要你认真洗过了，那件衣服就会光亮如新！💡',
    '今日不肯埋头，明日何以抬头！📖',
    '愿你合上笔盖的那一刻，有侠客收剑入鞘的骄傲！⚔️',
    '熬得住就出众，熬不住就出局！🔥'
];

var selectedColor = '#3498DB';
var editingSubjectId = null;

function init() {
    loadAppData();
    if (appData.subjects.length === 0) {
        appData.subjects = JSON.parse(JSON.stringify(defaultSubjects));
        saveAppData();
    }
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && appData.settings.antiDistraction && isTimerRunning) {
            pauseTimer();
            alert('检测到切出页面，防打扰模式已自动暂停计时');
        }
    });
    
    loadPage('timer');
}

function loadAppData() {
    try {
        var saved = localStorage.getItem('examTimerData');
        if (saved) {
            appData = JSON.parse(saved);
        }
    } catch (e) {
        console.error('加载数据失败:', e);
    }
}

function saveAppData() {
    try {
        localStorage.setItem('examTimerData', JSON.stringify(appData));
    } catch (e) {
        console.error('保存数据失败:', e);
        alert('保存失败，存储空间可能已满');
    }
}

function switchTab(tabName) {
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    var allTabs = ['timer', 'todos', 'records', 'subjects', 'settings'];
    var tabIndex = allTabs.indexOf(tabName);
    if (tabIndex !== -1 && tabs[tabIndex]) {
        tabs[tabIndex].classList.add('active');
    }
    
    loadPage(tabName);
}

function loadPage(tabName) {
    var pageContent = document.getElementById('page-content');
    if (!pageContent) return;
    
    var templateId = 'template-' + tabName;
    var template = document.getElementById(templateId);
    
    if (template) {
        pageContent.innerHTML = template.innerHTML;
        currentTab = tabName;
        
        if (tabName === 'timer') {
            updateTimerPage();
        } else if (tabName === 'todos') {
            updateTodosPage();
        } else if (tabName === 'records') {
            updateRecordsPage();
        } else if (tabName === 'subjects') {
            updateSubjectsPage();
        } else if (tabName === 'settings') {
            updateSettingsPage();
        }
    }
}

function getRandomQuote() {
    var index = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[index];
}

function updateTimerPage() {
    updateSubjectSelect();
    updateTimerDisplay();
    
    var studyDuration = document.getElementById('study-duration');
    var restDuration = document.getElementById('rest-duration');
    var tomatoCycles = document.getElementById('tomato-cycles');
    
    if (studyDuration) {
        studyDuration.value = appData.settings.tomatoStudyDuration || 25;
        studyDuration.addEventListener('change', function() {
            appData.settings.tomatoStudyDuration = parseInt(this.value) || 25;
            saveAppData();
            if (!isTimerRunning && timerMode === 'tomato' && !isResting) {
                timerSeconds = appData.settings.tomatoStudyDuration * 60;
                updateTimerDisplay();
            }
        });
    }
    
    if (restDuration) {
        restDuration.value = appData.settings.tomatoRestDuration || 5;
        restDuration.addEventListener('change', function() {
            appData.settings.tomatoRestDuration = parseInt(this.value) || 5;
            saveAppData();
        });
    }
    
    if (tomatoCycles) {
        tomatoCycles.value = appData.settings.tomatoCycles || 4;
        tomatoCycles.addEventListener('change', function() {
            appData.settings.tomatoCycles = parseInt(this.value) || 4;
            saveAppData();
        });
    }
    
    var antiDistractionCheckbox = document.getElementById('anti-distraction');
    if (antiDistractionCheckbox) {
        antiDistractionCheckbox.checked = appData.settings.antiDistraction;
        antiDistractionCheckbox.addEventListener('change', function() {
            appData.settings.antiDistraction = this.checked;
            saveAppData();
        });
    }
    
    var quoteEl = document.getElementById('motivational-quote');
    if (quoteEl) {
        quoteEl.textContent = getRandomQuote();
    }
    
    if (appData.settings.minimalMode) {
        var timerPage = document.querySelector('.timer-page');
        if (timerPage) {
            timerPage.classList.add('minimal-mode');
        }
    }
}

function updateSubjectSelect() {
    var select = document.getElementById('timer-subject');
    if (!select) return;
    
    select.innerHTML = '<option value="">请选择科目</option>';
    for (var i = 0; i < appData.subjects.length; i++) {
        var subject = appData.subjects[i];
        select.innerHTML += '<option value="' + subject.id + '">' + subject.name + '</option>';
    }
}

function setTimerMode(mode) {
    if (isTimerRunning) {
        if (!confirm('切换模式将停止当前计时，确定吗？')) {
            return;
        }
        resetTimer();
    }
    
    timerMode = mode;
    
    var modeBtns = document.querySelectorAll('.mode-btn');
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].classList.remove('active');
        if (modeBtns[i].getAttribute('data-mode') === mode) {
            modeBtns[i].classList.add('active');
        }
    }
    
    var tomatoSettings = document.getElementById('tomato-settings');
    var restSettings = document.getElementById('rest-settings');
    var tomatoCyclesSettings = document.getElementById('tomato-cycles-settings');
    var countdownSettings = document.getElementById('countdown-settings');
    var segmentSettings = document.getElementById('segment-settings');
    
    if (tomatoSettings) tomatoSettings.style.display = 'none';
    if (restSettings) restSettings.style.display = 'none';
    if (tomatoCyclesSettings) tomatoCyclesSettings.style.display = 'none';
    if (countdownSettings) countdownSettings.style.display = 'none';
    if (segmentSettings) segmentSettings.style.display = 'none';
    
    if (mode === 'tomato') {
        if (tomatoSettings) tomatoSettings.style.display = 'block';
        if (restSettings) restSettings.style.display = 'block';
        if (tomatoCyclesSettings) tomatoCyclesSettings.style.display = 'block';
        timerSeconds = appData.settings.tomatoStudyDuration * 60;
    } else if (mode === 'countdown') {
        if (countdownSettings) countdownSettings.style.display = 'block';
        var hours = document.getElementById('countdown-hours');
        var minutes = document.getElementById('countdown-minutes');
        var seconds = document.getElementById('countdown-seconds');
        var h = hours ? parseInt(hours.value) || 0 : 3;
        var m = minutes ? parseInt(minutes.value) || 0 : 0;
        var s = seconds ? parseInt(seconds.value) || 0 : 0;
        timerSeconds = h * 3600 + m * 60 + s;
        if (timerSeconds <= 0) timerSeconds = 10800;
    } else if (mode === 'segment') {
        if (segmentSettings) segmentSettings.style.display = 'block';
        if (segmentTimers.length === 0) {
            loadPreset('kaoyan');
        }
        currentSegmentIndex = 0;
        updateSegmentsList();
        if (segmentTimers.length > 0) {
            timerSeconds = segmentTimers[0].duration * 60;
        }
    } else {
        timerSeconds = 0;
    }
    
    updateTimerDisplay();
}

function updateSegmentsList() {
    var listEl = document.getElementById('segments-list');
    if (!listEl) return;
    
    var html = '';
    for (var i = 0; i < segmentTimers.length; i++) {
        var segment = segmentTimers[i];
        html += '<div class="segment-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:#F8FBFE; border-radius:8px; margin-bottom:8px;">';
        html += '<div>';
        html += '<input type="text" value="' + segment.name + '" onchange="updateSegmentName(' + i + ', this.value)" style="border:none; background:transparent; font-weight:600; width:100px;">';
        html += '<span style="margin-left:8px; color:#7F8C8D;">(' + segment.duration + '分钟)</span>';
        html += '</div>';
        html += '<div style="display:flex; gap:8px;">';
        html += '<input type="number" value="' + segment.duration + '" onchange="updateSegmentDuration(' + i + ', this.value)" style="width:60px; padding:6px; border:1px solid #E8F4FD; border-radius:4px;">';
        html += '<button class="delete-btn" style="padding:6px 10px; font-size:0.8rem;" onclick="removeSegment(' + i + ')">×</button>';
        html += '</div>';
        html += '</div>';
    }
    listEl.innerHTML = html;
}

function addSegment() {
    segmentTimers.push({ name: '新分段', duration: 30 });
    updateSegmentsList();
}

function updateSegmentName(index, name) {
    if (segmentTimers[index]) {
        segmentTimers[index].name = name;
    }
}

function updateSegmentDuration(index, duration) {
    if (segmentTimers[index]) {
        segmentTimers[index].duration = parseInt(duration) || 30;
        if (timerMode === 'segment' && currentSegmentIndex === index && !isTimerRunning) {
            timerSeconds = segmentTimers[index].duration * 60;
            updateTimerDisplay();
        }
    }
}

function removeSegment(index) {
    segmentTimers.splice(index, 1);
    if (currentSegmentIndex >= segmentTimers.length) {
        currentSegmentIndex = Math.max(0, segmentTimers.length - 1);
    }
    updateSegmentsList();
    if (segmentTimers.length > 0 && !isTimerRunning) {
        timerSeconds = segmentTimers[currentSegmentIndex].duration * 60;
        updateTimerDisplay();
    }
}

function loadPreset(type) {
    if (type === 'kaoyan') {
        segmentTimers = [
            { name: '政治', duration: 45 },
            { name: '英语', duration: 45 },
            { name: '数学', duration: 45 },
            { name: '专业课', duration: 45 }
        ];
    } else {
        segmentTimers = [
            { name: '学习', duration: 25 },
            { name: '休息', duration: 5 }
        ];
    }
    currentSegmentIndex = 0;
    updateSegmentsList();
    if (!isTimerRunning) {
        timerSeconds = segmentTimers[0].duration * 60;
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    var display = document.getElementById('timer-display');
    var status = document.getElementById('timer-status');
    if (!display) return;
    
    var hours = Math.floor(timerSeconds / 3600);
    var minutes = Math.floor((timerSeconds % 3600) / 60);
    var seconds = timerSeconds % 60;
    if (hours > 0) {
        display.textContent = padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds);
    } else {
        display.textContent = padNumber(minutes) + ':' + padNumber(seconds);
    }
    
    if (status) {
        if (timerMode === 'tomato') {
            var cycleInfo = '第 ' + tomatoCurrentCycle + '/' + appData.settings.tomatoCycles + ' 个';
            if (isTimerRunning) {
                status.textContent = cycleInfo + (isResting ? ' - 休息中...' : ' - 学习中...');
            } else if (isPaused) {
                status.textContent = cycleInfo + ' - 已暂停';
            } else {
                status.textContent = cycleInfo + ' - 准备开始';
            }
        } else if (timerMode === 'segment' && segmentTimers.length > 0) {
            var segment = segmentTimers[currentSegmentIndex];
            var segmentInfo = segment.name + ' (' + (currentSegmentIndex + 1) + '/' + segmentTimers.length + ')';
            if (isTimerRunning) {
                status.textContent = segmentInfo + ' - 进行中...';
            } else if (isPaused) {
                status.textContent = segmentInfo + ' - 已暂停';
            } else {
                status.textContent = segmentInfo + ' - 准备开始';
            }
        } else {
            if (isTimerRunning) {
                status.textContent = isResting ? '休息中...' : '学习中...';
            } else if (isPaused) {
                status.textContent = '已暂停';
            } else {
                status.textContent = '准备开始';
            }
        }
    }
}

function padNumber(num) {
    return num < 10 ? '0' + num : num;
}

function vibrate(duration) {
    if (!appData.settings.vibration) return;
    
    var vibDuration = duration || 200;
    
    if (typeof plus !== 'undefined' && plus.device) {
        if (Array.isArray(vibDuration)) {
            var total = 0;
            for (var i = 0; i < vibDuration.length; i++) {
                total += vibDuration[i];
            }
            plus.device.vibrate(total);
        } else {
            plus.device.vibrate(vibDuration);
        }
    } else if (navigator.vibrate) {
        navigator.vibrate(vibDuration);
    }
}

function startTimer() {
    if (isTimerRunning) return;
    
    var btnStart = document.getElementById('btn-start');
    var btnPause = document.getElementById('btn-pause');
    var btnSkip = document.getElementById('btn-skip');
    
    isTimerRunning = true;
    isPaused = false;
    timerStartTime = Date.now();
    initialTimerSeconds = timerSeconds;
    
    if (btnStart) btnStart.style.display = 'none';
    if (btnPause) btnPause.style.display = 'inline-block';
    if (btnSkip && timerMode === 'segment') btnSkip.style.display = 'inline-block';
    
    vibrate(100);
    
    timerInterval = setInterval(function() {
        var elapsed = Math.floor((Date.now() - timerStartTime) / 1000);
        
        if (timerMode === 'countup') {
            timerSeconds = initialTimerSeconds + elapsed;
        } else {
            timerSeconds = Math.max(0, initialTimerSeconds - elapsed);
            if (timerSeconds <= 0) {
                timerComplete();
                return;
            }
        }
        updateTimerDisplay();
    }, 100);
    
    updateTimerDisplay();
}

function pauseTimer() {
    if (!isTimerRunning) return;
    
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = true;
    
    var btnStart = document.getElementById('btn-start');
    var btnPause = document.getElementById('btn-pause');
    var btnSkip = document.getElementById('btn-skip');
    
    if (btnStart) btnStart.style.display = 'inline-block';
    if (btnPause) btnPause.style.display = 'none';
    if (btnSkip) btnSkip.style.display = 'none';
    
    vibrate(100);
    updateTimerDisplay();
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = false;
    isResting = false;
    tomatoCurrentCycle = 1;
    tomatoCompletedCycles = 0;
    
    var btnStart = document.getElementById('btn-start');
    var btnPause = document.getElementById('btn-pause');
    var btnSkip = document.getElementById('btn-skip');
    
    if (btnStart) btnStart.style.display = 'inline-block';
    if (btnPause) btnPause.style.display = 'none';
    if (btnSkip) btnSkip.style.display = 'none';
    
    if (timerMode === 'tomato') {
        timerSeconds = appData.settings.tomatoStudyDuration * 60;
    } else if (timerMode === 'countdown') {
        var hours = document.getElementById('countdown-hours');
        var minutes = document.getElementById('countdown-minutes');
        var seconds = document.getElementById('countdown-seconds');
        var h = hours ? parseInt(hours.value) || 0 : 3;
        var m = minutes ? parseInt(minutes.value) || 0 : 0;
        var s = seconds ? parseInt(seconds.value) || 0 : 0;
        timerSeconds = h * 3600 + m * 60 + s;
        if (timerSeconds <= 0) timerSeconds = 10800;
    } else if (timerMode === 'segment') {
        currentSegmentIndex = 0;
        if (segmentTimers.length > 0) {
            timerSeconds = segmentTimers[0].duration * 60;
        }
    } else {
        timerSeconds = 0;
    }
    
    updateTimerDisplay();
}

function skipSegment() {
    if (timerMode !== 'segment') return;
    if (!confirm('确定要跳过当前分段吗？')) return;
    
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = false;
    
    currentSegmentIndex++;
    if (currentSegmentIndex < segmentTimers.length) {
        timerSeconds = segmentTimers[currentSegmentIndex].duration * 60;
        alert('已跳过分段，接下来是 "' + segmentTimers[currentSegmentIndex].name + '"');
        var btnStart = document.getElementById('btn-start');
        var btnPause = document.getElementById('btn-pause');
        var btnSkip = document.getElementById('btn-skip');
        if (btnStart) btnStart.style.display = 'inline-block';
        if (btnPause) btnPause.style.display = 'none';
        if (btnSkip) btnSkip.style.display = 'none';
    } else {
        alert('所有分段已完成！太棒了！🎉');
        currentSegmentIndex = 0;
        if (segmentTimers.length > 0) {
            timerSeconds = segmentTimers[0].duration * 60;
        }
        var btnStart = document.getElementById('btn-start');
        var btnPause = document.getElementById('btn-pause');
        var btnSkip = document.getElementById('btn-skip');
        if (btnStart) btnStart.style.display = 'inline-block';
        if (btnPause) btnPause.style.display = 'none';
        if (btnSkip) btnSkip.style.display = 'none';
    }
    
    updateTimerDisplay();
}

function timerComplete() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = false;
    
    var btnStart = document.getElementById('btn-start');
    var btnPause = document.getElementById('btn-pause');
    var btnSkip = document.getElementById('btn-skip');
    
    if (btnStart) btnStart.style.display = 'inline-block';
    if (btnPause) btnPause.style.display = 'none';
    if (btnSkip) btnSkip.style.display = 'none';
    
    vibrate([200, 100, 200, 100, 200]);
    
    if (timerMode === 'tomato') {
        if (!isResting) {
            saveStudyRecord();
            tomatoCompletedCycles++;
            isResting = true;
            timerSeconds = appData.settings.tomatoRestDuration * 60;
            alert('第 ' + tomatoCurrentCycle + ' 个番茄钟学习结束！开始休息吧！');
            startTimer();
        } else {
            isResting = false;
            if (tomatoCurrentCycle >= appData.settings.tomatoCycles) {
                alert('恭喜！你已完成 ' + appData.settings.tomatoCycles + ' 个番茄钟！🎉');
                tomatoCurrentCycle = 1;
                tomatoCompletedCycles = 0;
                timerSeconds = appData.settings.tomatoStudyDuration * 60;
            } else {
                tomatoCurrentCycle++;
                timerSeconds = appData.settings.tomatoStudyDuration * 60;
                alert('休息结束！继续第 ' + tomatoCurrentCycle + ' 个番茄钟！');
            }
        }
    } else if (timerMode === 'countdown') {
        saveStudyRecord();
        alert('计时结束！');
    } else if (timerMode === 'segment') {
        saveStudyRecord();
        currentSegmentIndex++;
        if (currentSegmentIndex < segmentTimers.length) {
            timerSeconds = segmentTimers[currentSegmentIndex].duration * 60;
            alert('"' + segmentTimers[currentSegmentIndex - 1].name + '" 完成！接下来是 "' + segmentTimers[currentSegmentIndex].name + '"');
            startTimer();
        } else {
            alert('所有分段已完成！太棒了！🎉');
            currentSegmentIndex = 0;
            if (segmentTimers.length > 0) {
                timerSeconds = segmentTimers[0].duration * 60;
            }
        }
    }
    
    updateTimerDisplay();
}

function saveStudyRecord() {
    var subjectSelect = document.getElementById('timer-subject');
    var subjectId = subjectSelect ? subjectSelect.value : '';
    var subjectName = '未选择';
    
    if (timerMode === 'segment' && segmentTimers.length > 0) {
        subjectName = segmentTimers[currentSegmentIndex].name;
    } else {
        for (var i = 0; i < appData.subjects.length; i++) {
            if (appData.subjects[i].id == subjectId) {
                subjectName = appData.subjects[i].name;
                break;
            }
        }
    }
    
    var duration;
    if (timerMode === 'countup') {
        duration = timerSeconds;
    } else if (timerMode === 'tomato') {
        duration = appData.settings.tomatoStudyDuration * 60;
    } else if (timerMode === 'segment') {
        if (segmentTimers.length > 0) {
            duration = segmentTimers[currentSegmentIndex].duration * 60;
        } else {
            duration = 0;
        }
    } else {
        var hours = document.getElementById('countdown-hours');
        var minutes = document.getElementById('countdown-minutes');
        var seconds = document.getElementById('countdown-seconds');
        var h = hours ? parseInt(hours.value) || 0 : 3;
        var m = minutes ? parseInt(minutes.value) || 0 : 0;
        var s = seconds ? parseInt(seconds.value) || 0 : 0;
        duration = h * 3600 + m * 60 + s;
    }
    
    var record = {
        id: Date.now(),
        date: new Date().toISOString(),
        subject: subjectName,
        duration: duration,
        mode: timerMode
    };
    
    appData.records.unshift(record);
    saveAppData();
    
    if (activeTodoId) {
        for (var i = 0; i < appData.todos.length; i++) {
            if (appData.todos[i].id === activeTodoId) {
                appData.todos[i].completed = true;
                break;
            }
        }
        activeTodoId = null;
        saveAppData();
    }
}

function updateRecordsPage() {
    updateStatsSummary();
    updateDailyChart();
    updateSubjectChart();
    updateRecordsList();
    
    var dateFilter = document.getElementById('date-filter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            updateRecordsList();
        });
    }
}

function filterRecordsByDate(records, filter) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var filtered = [];
    
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var recordDate = new Date(record.date);
        var recordDateOnly = new Date(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate());
        
        if (filter === 'all') {
            filtered.push(record);
        } else if (filter === 'today') {
            if (recordDateOnly.getTime() === today.getTime()) {
                filtered.push(record);
            }
        } else if (filter === 'week') {
            var weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (recordDateOnly >= weekAgo) {
                filtered.push(record);
            }
        } else if (filter === 'month') {
            var monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (recordDateOnly >= monthAgo) {
                filtered.push(record);
            }
        } else if (filter === 'year') {
            var yearAgo = new Date(today);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            if (recordDateOnly >= yearAgo) {
                filtered.push(record);
            }
        } else if (filter === 'twoyears') {
            var twoYearsAgo = new Date(today);
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
            if (recordDateOnly >= twoYearsAgo) {
                filtered.push(record);
            }
        }
    }
    
    return filtered;
}

function calculateEfficiencyScore() {
    var today = new Date().toDateString();
    var todayRecords = [];
    var now = new Date();
    var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    var weekRecords = [];
    
    for (var i = 0; i < appData.records.length; i++) {
        var record = appData.records[i];
        var recordDate = new Date(record.date);
        
        if (recordDate.toDateString() === today) {
            todayRecords.push(record);
        }
        if (recordDate >= weekAgo) {
            weekRecords.push(record);
        }
    }
    
    var score = 50;
    
    if (todayRecords.length > 0) {
        var todayTotal = 0;
        for (var j = 0; j < todayRecords.length; j++) {
            todayTotal += todayRecords[j].duration;
        }
        
        if (todayTotal >= 3600) score += 10;
        if (todayTotal >= 7200) score += 10;
        if (todayTotal >= 10800) score += 10;
        if (todayRecords.length >= 4) score += 5;
        if (todayRecords.length >= 8) score += 5;
    }
    
    if (weekRecords.length > 0) {
        var studyDays = {};
        for (var k = 0; k < weekRecords.length; k++) {
            var d = new Date(weekRecords[k].date).toDateString();
            studyDays[d] = true;
        }
        var dayCount = Object.keys(studyDays).length;
        if (dayCount >= 3) score += 5;
        if (dayCount >= 5) score += 5;
        if (dayCount >= 7) score += 5;
    }
    
    return Math.min(100, score);
}

function getEfficiencyLabel(score) {
    if (score >= 90) return '学霸附体';
    if (score >= 80) return '状态极佳';
    if (score >= 70) return '高效学习';
    if (score >= 60) return '稳步前进';
    if (score >= 50) return '渐入佳境';
    return '继续加油';
}

function updateStatsSummary() {
    var today = new Date().toDateString();
    var todayTotal = 0;
    var weekTotal = 0;
    var monthTotal = 0;
    
    var now = new Date();
    var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    for (var i = 0; i < appData.records.length; i++) {
        var record = appData.records[i];
        var recordDate = new Date(record.date);
        
        if (recordDate.toDateString() === today) {
            todayTotal += record.duration;
        }
        if (recordDate >= weekAgo) {
            weekTotal += record.duration;
        }
        if (recordDate >= monthStart) {
            monthTotal += record.duration;
        }
    }
    
    var todayEl = document.getElementById('today-total');
    var weekEl = document.getElementById('week-total');
    var monthEl = document.getElementById('month-total');
    var efficiencyEl = document.getElementById('efficiency-score');
    var efficiencyLabelEl = document.getElementById('efficiency-label');
    
    if (todayEl) todayEl.textContent = formatDuration(todayTotal);
    if (weekEl) weekEl.textContent = formatDuration(weekTotal);
    if (monthEl) monthEl.textContent = formatDuration(monthTotal);
    
    if (efficiencyEl || efficiencyLabelEl) {
        var score = calculateEfficiencyScore();
        var label = getEfficiencyLabel(score);
        if (efficiencyEl) efficiencyEl.textContent = score + '分';
        if (efficiencyLabelEl) efficiencyLabelEl.textContent = label;
    }
}

function formatDuration(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    return hours + 'h ' + minutes + 'm';
}

function updateDailyChart() {
    var chartContainer = document.getElementById('daily-chart');
    if (!chartContainer) return;
    
    if (appData.records.length === 0) {
        chartContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><p>暂无数据</p></div>';
        return;
    }
    
    var last7Days = [];
    var now = new Date();
    for (var i = 6; i >= 0; i--) {
        var date = new Date(now);
        date.setDate(date.getDate() - i);
        last7Days.push({
            date: date.toDateString(),
            label: (date.getMonth() + 1) + '/' + date.getDate(),
            total: 0
        });
    }
    
    for (var j = 0; j < appData.records.length; j++) {
        var record = appData.records[j];
        var recordDate = new Date(record.date).toDateString();
        for (var k = 0; k < last7Days.length; k++) {
            if (last7Days[k].date === recordDate) {
                last7Days[k].total += record.duration;
            }
        }
    }
    
    var html = '<div style="display: flex; align-items: end; height: 140px; gap: 6px; padding: 10px 0;">';
    var maxTotal = Math.max.apply(null, last7Days.map(function(d) { return d.total; })) || 1;
    var today = new Date().toDateString();
    
    for (var l = 0; l < last7Days.length; l++) {
        var day = last7Days[l];
        var height = (day.total / maxTotal) * 100 + 20;
        var isToday = day.date === today;
        var gradient = isToday ? 'linear-gradient(180deg, #FF6B6B 0%, #FFD93D 100%)' : 'linear-gradient(180deg, #3498DB 0%, #1E3A5F 100%)';
        var labelColor = isToday ? '#FF6B6B' : '#7F8C8D';
        var labelWeight = isToday ? '700' : '500';
        
        html += '<div style="flex: 1; text-align: center; transition: transform 0.3s;" onmouseover="this.style.transform=\'translateY(-4px)\'" onmouseout="this.style.transform=\'translateY(0)\'">';
        html += '<div style="font-size: 0.65rem; color: ' + labelColor + '; font-weight: ' + labelWeight + '; margin-bottom: 4px;">' + (day.total > 0 ? formatDuration(day.total) : '') + '</div>';
        html += '<div style="background: ' + gradient + '; border-radius: 8px 8px 4px 4px; height: ' + height + 'px; margin-bottom: 6px; transition: all 0.3s; box-shadow: ' + (isToday ? '0 4px 12px rgba(255, 107, 107, 0.3)' : '0 2px 6px rgba(52, 152, 219, 0.2)') + ';"></div>';
        html += '<div style="font-size: 0.75rem; color: ' + labelColor + '; font-weight: ' + labelWeight + ';">' + day.label + '</div>';
        html += '</div>';
    }
    html += '</div>';
    
    chartContainer.innerHTML = html;
}

function updateSubjectChart() {
    var chartContainer = document.getElementById('subject-chart');
    if (!chartContainer) return;
    
    if (appData.records.length === 0) {
        chartContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><p>暂无数据</p></div>';
        return;
    }
    
    var subjectTotals = {};
    var totalDuration = 0;
    for (var i = 0; i < appData.records.length; i++) {
        var record = appData.records[i];
        if (!subjectTotals[record.subject]) {
            subjectTotals[record.subject] = 0;
        }
        subjectTotals[record.subject] += record.duration;
        totalDuration += record.duration;
    }
    
    var colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#F39C12', '#1ABC9C', '#E91E63', '#00BCD4'];
    var colorIndex = 0;
    
    var html = '<div style="display: flex; flex-wrap: wrap; gap: 12px;">';
    for (var subject in subjectTotals) {
        var duration = subjectTotals[subject];
        var percentage = Math.round((duration / totalDuration) * 100);
        var color = colors[colorIndex % colors.length];
        colorIndex++;
        
        html += '<div style="flex: 1; min-width: 120px; padding: 16px; border-radius: 16px; text-align: center;">';
        html += '<div style="width: 40px; height: 40px; margin: 0 auto 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.9rem; background: ' + color + ';">' + percentage + '%</div>';
        html += '<div style="font-weight: 600; color: #1E3A5F; margin-bottom: 6px; font-size: 0.95rem;">' + subject + '</div>';
        html += '<div style="font-size: 1.1rem; color: ' + color + '; font-weight: 800;">' + formatDuration(duration) + '</div>';
        html += '</div>';
    }
    html += '</div>';
    
    chartContainer.innerHTML = html;
}

function updateRecordsList() {
    var listEl = document.getElementById('records-list');
    if (!listEl) return;
    
    var dateFilterEl = document.getElementById('date-filter');
    var filter = dateFilterEl ? dateFilterEl.value : 'all';
    var filteredRecords = filterRecordsByDate(appData.records, filter);
    
    if (filteredRecords.length === 0) {
        listEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><p>暂无学习记录</p></div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < Math.min(filteredRecords.length, 20); i++) {
        var record = filteredRecords[i];
        var date = new Date(record.date);
        html += '<div style="background: #FFFFFF; padding: 16px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">';
        html += '<div style="font-weight: 600; color: #1E3A5F;">' + record.subject + '</div>';
        html += '<div style="display: flex; align-items: center; gap: 12px;">';
        html += '<div style="color: #3498DB; font-weight: 600;">' + formatDuration(record.duration) + '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="color: #7F8C8D; font-size: 0.85rem;">';
        html += (date.getMonth() + 1) + '/' + date.getDate() + ' ' + padNumber(date.getHours()) + ':' + padNumber(date.getMinutes());
        html += '</div>';
        html += '</div>';
    }
    
    listEl.innerHTML = html;
}

function deleteRecord(index) {
    if (!confirm('确定要删除这条学习记录吗？')) return;
    
    appData.records.splice(index, 1);
    saveAppData();
    updateRecordsPage();
}

function updateSubjectsPage() {
    var listEl = document.getElementById('subjects-list');
    if (!listEl) return;
    
    var html = '';
    for (var i = 0; i < appData.subjects.length; i++) {
        var subject = appData.subjects[i];
        html += '<div class="subject-item">';
        html += '<div style="display: flex; align-items: center;">';
        html += '<div class="subject-color" style="background: ' + subject.color + ';"></div>';
        html += '<div class="subject-info">';
        html += '<div class="subject-name">' + subject.name + '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="display: flex; gap: 8px;">';
        html += '<button class="quick-action-btn" style="padding: 6px 12px; font-size: 0.85rem;" onclick="openEditSubject(' + subject.id + ')">编辑</button>';
        html += '<button class="delete-btn" onclick="deleteSubject(' + subject.id + ')">删除</button>';
        html += '</div>';
        html += '</div>';
    }
    
    listEl.innerHTML = html;
}

function openAddSubject() {
    selectedColor = '#3498DB';
    openModal('<h3 class="modal-title">📚 添加科目</h3><div class="form-group"><label>科目名称</label><input type="text" id="subject-name" placeholder="例如：高等数学"></div><div class="form-group"><label>选择颜色</label><div style="display: flex; gap: 10px; margin-top: 10px;"><span class="avatar-option" data-color="#E74C3C" style="background: #E74C3C;"></span><span class="avatar-option" data-color="#3498DB" style="background: #3498DB;"></span><span class="avatar-option" data-color="#2ECC71" style="background: #2ECC71;"></span><span class="avatar-option" data-color="#9B59B6" style="background: #9B59B6;"></span><span class="avatar-option" data-color="#F39C12" style="background: #F39C12;"></span></div></div><button class="submit-btn" onclick="addSubject()">保存</button>');
    
    setTimeout(function() {
        var colorOptions = document.querySelectorAll('.avatar-option');
        for (var i = 0; i < colorOptions.length; i++) {
            colorOptions[i].addEventListener('click', handleColorSelect);
        }
    }, 50);
}

function openEditSubject(id) {
    var subject = null;
    for (var i = 0; i < appData.subjects.length; i++) {
        if (appData.subjects[i].id === id) {
            subject = appData.subjects[i];
            break;
        }
    }
    
    if (!subject) return;
    
    editingSubjectId = id;
    selectedColor = subject.color;
    
    var colorBorder1 = subject.color === '#E74C3C' ? 'border: 2px solid #3498DB;' : '';
    var colorBorder2 = subject.color === '#3498DB' ? 'border: 2px solid #3498DB;' : '';
    var colorBorder3 = subject.color === '#2ECC71' ? 'border: 2px solid #3498DB;' : '';
    var colorBorder4 = subject.color === '#9B59B6' ? 'border: 2px solid #3498DB;' : '';
    var colorBorder5 = subject.color === '#F39C12' ? 'border: 2px solid #3498DB;' : '';
    
    openModal('<h3 class="modal-title">✏️ 编辑科目</h3><div class="form-group"><label>科目名称</label><input type="text" id="subject-name" placeholder="例如：高等数学" value="' + subject.name + '"></div><div class="form-group"><label>选择颜色</label><div style="display: flex; gap: 10px; margin-top: 10px;"><span class="avatar-option" data-color="#E74C3C" style="background: #E74C3C; ' + colorBorder1 + '"></span><span class="avatar-option" data-color="#3498DB" style="background: #3498DB; ' + colorBorder2 + '"></span><span class="avatar-option" data-color="#2ECC71" style="background: #2ECC71; ' + colorBorder3 + '"></span><span class="avatar-option" data-color="#9B59B6" style="background: #9B59B6; ' + colorBorder4 + '"></span><span class="avatar-option" data-color="#F39C12" style="background: #F39C12; ' + colorBorder5 + '"></span></div></div><button class="submit-btn" onclick="editSubject()">保存</button>');
    
    setTimeout(function() {
        var colorOptions = document.querySelectorAll('.avatar-option');
        for (var i = 0; i < colorOptions.length; i++) {
            colorOptions[i].addEventListener('click', handleColorSelect);
        }
    }, 50);
}

function handleColorSelect(event) {
    var elements = document.querySelectorAll('.avatar-option');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.border = '2px solid #E8F4FD';
    }
    event.target.style.border = '2px solid #3498DB';
    selectedColor = event.target.getAttribute('data-color');
}

function addSubject() {
    var nameEl = document.getElementById('subject-name');
    var name = nameEl ? nameEl.value.trim() : '';
    
    if (!name) {
        alert('请输入科目名称');
        return;
    }
    
    var subject = {
        id: Date.now(),
        name: name,
        color: selectedColor
    };
    
    appData.subjects.push(subject);
    saveAppData();
    updateSubjectsPage();
    closeModal();
}

function editSubject() {
    var nameEl = document.getElementById('subject-name');
    var name = nameEl ? nameEl.value.trim() : '';
    
    if (!name) {
        alert('请输入科目名称');
        return;
    }
    
    for (var i = 0; i < appData.subjects.length; i++) {
        if (appData.subjects[i].id === editingSubjectId) {
            appData.subjects[i].name = name;
            appData.subjects[i].color = selectedColor;
            break;
        }
    }
    
    saveAppData();
    updateSubjectsPage();
    closeModal();
    editingSubjectId = null;
}

function deleteSubject(id) {
    if (!confirm('确定要删除这个科目吗？')) return;
    
    var newSubjects = [];
    for (var i = 0; i < appData.subjects.length; i++) {
        if (appData.subjects[i].id !== id) {
            newSubjects.push(appData.subjects[i]);
        }
    }
    appData.subjects = newSubjects;
    saveAppData();
    updateSubjectsPage();
}

function updateSettingsPage() {
    var reminderSound = document.getElementById('reminder-sound');
    var vibration = document.getElementById('vibration');
    var themeMode = document.getElementById('theme-mode');
    var focusLock = document.getElementById('focus-lock');
    var minimalMode = document.getElementById('minimal-mode');
    
    if (reminderSound) reminderSound.value = appData.settings.reminderSound;
    if (vibration) vibration.checked = appData.settings.vibration;
    if (themeMode) themeMode.value = appData.settings.theme;
    if (focusLock) focusLock.checked = appData.settings.focusLock;
    if (minimalMode) minimalMode.checked = appData.settings.minimalMode;
}

function saveSettings() {
    var reminderSound = document.getElementById('reminder-sound');
    var vibration = document.getElementById('vibration');
    var themeMode = document.getElementById('theme-mode');
    var focusLock = document.getElementById('focus-lock');
    var minimalMode = document.getElementById('minimal-mode');
    
    if (reminderSound) appData.settings.reminderSound = reminderSound.value;
    if (vibration) appData.settings.vibration = vibration.checked;
    if (themeMode) appData.settings.theme = themeMode.value;
    if (focusLock) appData.settings.focusLock = focusLock.checked;
    if (minimalMode) appData.settings.minimalMode = minimalMode.checked;
    
    saveAppData();
    alert('设置已保存！');
}

function toggleMinimalMode() {
    var timerPage = document.querySelector('.timer-page');
    if (timerPage) {
        timerPage.classList.toggle('minimal-mode');
    }
}

function toggleFocusLock() {
    if (appData.settings.focusLock) {
        if (typeof plus !== 'undefined' && plus.key) {
            plus.key.lock();
            alert('专注锁定已开启！按返回键退出锁定。');
        } else {
            alert('专注锁定模式已开启（浏览器环境不支持物理按键锁定）');
        }
    }
}

function exportData() {
    var dataStr = JSON.stringify(appData, null, 2);
    var blob = new Blob([dataStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'exam-timer-data.json';
    a.click();
    URL.revokeObjectURL(url);
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
                    saveAppData();
                    loadPage(currentTab);
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

function clearAllData() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        if (confirm('再次确认：真的要清空所有数据吗？')) {
            appData = {
                records: [],
                subjects: JSON.parse(JSON.stringify(defaultSubjects)),
                todos: [],
                settings: {
                    reminderSound: 'default',
                    vibration: true,
                    theme: 'light',
                    focusLock: false,
                    minimalMode: false,
                    antiDistraction: false,
                    tomatoCycles: 4,
                    tomatoStudyDuration: 25,
                    tomatoRestDuration: 5
                }
            };
            saveAppData();
            loadPage(currentTab);
            alert('数据已清空！');
        }
    }
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

function updateTodosPage() {
    updateTodosStats();
    updateTodosList();
    
    var viewBtns = document.querySelectorAll('.todo-view-tabs .quick-action-btn');
    for (var i = 0; i < viewBtns.length; i++) {
        viewBtns[i].addEventListener('click', function() {
            var btns = document.querySelectorAll('.todo-view-tabs .quick-action-btn');
            for (var j = 0; j < btns.length; j++) {
                btns[j].classList.remove('active');
            }
            this.classList.add('active');
        });
    }
}

function setTodoView(view) {
    currentTodoView = view;
    updateTodosList();
}

function updateTodosStats() {
    var today = new Date().toDateString();
    var todayTodos = [];
    
    for (var i = 0; i < appData.todos.length; i++) {
        var todo = appData.todos[i];
        var todoDate = new Date(todo.createdAt).toDateString();
        if (todoDate === today) {
            todayTodos.push(todo);
        }
    }
    
    var completedCount = 0;
    for (var j = 0; j < todayTodos.length; j++) {
        if (todayTodos[j].completed) {
            completedCount++;
        }
    }
    
    var completedEl = document.getElementById('todos-today-completed');
    var totalEl = document.getElementById('todos-today-total');
    
    if (completedEl) completedEl.textContent = completedCount;
    if (totalEl) totalEl.textContent = todayTodos.length;
}

function filterTodosByView(todos) {
    var today = new Date().toDateString();
    var filtered = [];
    
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        
        if (currentTodoView === 'today') {
            var todoDate = new Date(todo.createdAt).toDateString();
            if (todoDate === today) {
                filtered.push(todo);
            }
        } else if (currentTodoView === 'completed') {
            if (todo.completed) {
                filtered.push(todo);
            }
        } else {
            filtered.push(todo);
        }
    }
    
    return filtered;
}

function updateTodosList() {
    var listEl = document.getElementById('todos-list');
    if (!listEl) return;
    
    var filteredTodos = filterTodosByView(appData.todos);
    
    if (filteredTodos.length === 0) {
        listEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><p>暂无待办任务</p></div>';
        return;
    }
    
    filteredTodos.sort(function(a, b) {
        if (a.priority === 'important' && b.priority !== 'important') return -1;
        if (a.priority !== 'important' && b.priority === 'important') return 1;
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    var html = '';
    for (var i = 0; i < filteredTodos.length; i++) {
        var todo = filteredTodos[i];
        var subjectName = '未绑定科目';
        var subjectColor = '#7F8C8D';
        
        if (todo.subjectId) {
            for (var j = 0; j < appData.subjects.length; j++) {
                if (appData.subjects[j].id === todo.subjectId) {
                    subjectName = appData.subjects[j].name;
                    subjectColor = appData.subjects[j].color;
                    break;
                }
            }
        }
        
        var priorityBadge = todo.priority === 'important' ? '<span style="background: #FF6B6B; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; margin-right: 8px;">重要</span>' : '';
        var completedStyle = todo.completed ? 'text-decoration: line-through; opacity: 0.6;' : '';
        
        html += '<div class="todo-item" style="background: #FFFFFF; padding: 16px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1); ' + completedStyle + '">';
        html += '<div style="display: flex; align-items: flex-start; gap: 12px;">';
        html += '<input type="checkbox" ' + (todo.completed ? 'checked' : '') + ' onchange="toggleTodoComplete(' + todo.id + ')" style="width: 20px; height: 20px; margin-top: 4px; cursor: pointer;">';
        html += '<div style="flex: 1;">';
        html += '<div style="display: flex; align-items: center; margin-bottom: 8px;">';
        html += priorityBadge;
        html += '<div style="font-weight: 600; color: #1E3A5F; font-size: 1rem;">' + todo.text + '</div>';
        html += '</div>';
        html += '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">';
        if (todo.subjectId) {
            html += '<div style="display: flex; align-items: center; gap: 6px;">';
            html += '<div style="width: 12px; height: 12px; border-radius: 50%; background: ' + subjectColor + ';"></div>';
            html += '<span style="color: #7F8C8D; font-size: 0.85rem;">' + subjectName + '</span>';
            html += '</div>';
        }
        var todoDate = new Date(todo.createdAt);
        html += '<span style="color: #7F8C8D; font-size: 0.8rem;">' + (todoDate.getMonth() + 1) + '/' + todoDate.getDate() + ' ' + padNumber(todoDate.getHours()) + ':' + padNumber(todoDate.getMinutes()) + '</span>';
        html += '</div>';
        if (!todo.completed) {
            html += '<div style="display: flex; gap: 8px;">';
            html += '<button class="quick-action-btn" style="padding: 6px 12px; font-size: 0.85rem;" onclick="startTodoTimer(' + todo.id + ')">▶️ 开始计时</button>';
            html += '<button class="delete-btn" onclick="deleteTodo(' + todo.id + ')">删除</button>';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    
    listEl.innerHTML = html;
}

function openAddTodo() {
    var subjectOptions = '<option value="">不绑定科目</option>';
    for (var i = 0; i < appData.subjects.length; i++) {
        subjectOptions += '<option value="' + appData.subjects[i].id + '">' + appData.subjects[i].name + '</option>';
    }
    
    openModal('<h3 class="modal-title">✅ 添加待办</h3><div class="form-group"><label>任务内容</label><input type="text" id="todo-text" placeholder="例如：复习高数第三章"></div><div class="form-group"><label>绑定科目</label><select id="todo-subject">' + subjectOptions + '</select></div><div class="form-group"><label>优先级</label><div style="display: flex; gap: 12px; margin-top: 10px;"><label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="radio" name="todo-priority" value="normal" checked> 普通</label><label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="radio" name="todo-priority" value="important"> 重要（置顶）</label></div></div><button class="submit-btn" onclick="addTodo()">保存</button>');
}

function addTodo() {
    var textEl = document.getElementById('todo-text');
    var subjectEl = document.getElementById('todo-subject');
    var priorityEls = document.getElementsByName('todo-priority');
    
    var text = textEl ? textEl.value.trim() : '';
    if (!text) {
        alert('请输入任务内容');
        return;
    }
    
    var subjectId = subjectEl ? (subjectEl.value ? parseInt(subjectEl.value) : null) : null;
    var priority = 'normal';
    for (var i = 0; i < priorityEls.length; i++) {
        if (priorityEls[i].checked) {
            priority = priorityEls[i].value;
            break;
        }
    }
    
    var todo = {
        id: Date.now(),
        text: text,
        subjectId: subjectId,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    appData.todos.unshift(todo);
    saveAppData();
    updateTodosPage();
    closeModal();
}

function toggleTodoComplete(id) {
    for (var i = 0; i < appData.todos.length; i++) {
        if (appData.todos[i].id === id) {
            appData.todos[i].completed = !appData.todos[i].completed;
            break;
        }
    }
    saveAppData();
    updateTodosPage();
}

function deleteTodo(id) {
    if (!confirm('确定要删除这个待办任务吗？')) return;
    
    var newTodos = [];
    for (var i = 0; i < appData.todos.length; i++) {
        if (appData.todos[i].id !== id) {
            newTodos.push(appData.todos[i]);
        }
    }
    appData.todos = newTodos;
    saveAppData();
    updateTodosPage();
}

function startTodoTimer(id) {
    var todo = null;
    for (var i = 0; i < appData.todos.length; i++) {
        if (appData.todos[i].id === id) {
            todo = appData.todos[i];
            break;
        }
    }
    
    if (!todo) return;
    
    activeTodoId = id;
    
    if (todo.subjectId) {
        setTimeout(function() {
            var subjectSelect = document.getElementById('timer-subject');
            if (subjectSelect) {
                subjectSelect.value = todo.subjectId;
            }
        }, 100);
    }
    
    switchTab('timer');
}

function clearCompletedTodos() {
    if (!confirm('确定要清理所有已完成的待办任务吗？')) return;
    
    var newTodos = [];
    for (var i = 0; i < appData.todos.length; i++) {
        if (!appData.todos[i].completed) {
            newTodos.push(appData.todos[i]);
        }
    }
    appData.todos = newTodos;
    saveAppData();
    updateTodosPage();
}

function clearAllTodos() {
    if (!confirm('确定要清空所有待办任务吗？此操作不可恢复！')) return;
    if (!confirm('再次确认：真的要清空所有待办任务吗？')) return;
    
    appData.todos = [];
    saveAppData();
    updateTodosPage();
}

window.addEventListener('load', function() {
    init();
});
