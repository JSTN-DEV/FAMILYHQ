/* ============================================
   Shadow Company — Arma Reforger HQ
   Main Application Logic
   ============================================ */

(function () {
    'use strict';

    // ─── Demo Data ───────────────────────────────────────────────
    const FAMILY = {
        name: 'SHADOW COMPANY',
        tag: 'Arma Reforger',
        color: '#7c3aed',
        treasury: 2450000,
    };

    const MEMBERS = [
        { id: 1, name: 'Commander_Shadow', rank: 'owner', status: 'online', joined: '2025-01-15', lastActive: 'Jetzt', avatar: 'CS' },
        { id: 2, name: 'Viper', rank: 'co-leader', status: 'online', joined: '2025-02-03', lastActive: 'Jetzt', avatar: 'VP' },
        { id: 3, name: 'Ironclad', rank: 'co-leader', status: 'online', joined: '2025-01-20', lastActive: 'Jetzt', avatar: 'IC' },
        { id: 4, name: 'Hawk', rank: 'officer', status: 'online', joined: '2025-03-12', lastActive: 'Jetzt', avatar: 'HK' },
        { id: 5, name: 'Reaper', rank: 'officer', status: 'online', joined: '2025-03-15', lastActive: 'Jetzt', avatar: 'RP' },
        { id: 6, name: 'Spectre', rank: 'officer', status: 'away', joined: '2025-04-01', lastActive: 'vor 30 Min', avatar: 'SP' },
        { id: 7, name: 'Nomad', rank: 'member', status: 'online', joined: '2025-05-10', lastActive: 'Jetzt', avatar: 'NM' },
        { id: 8, name: 'Warden', rank: 'member', status: 'online', joined: '2025-05-15', lastActive: 'Jetzt', avatar: 'WD' },
        { id: 9, name: 'NightOwl', rank: 'member', status: 'online', joined: '2025-06-01', lastActive: 'Jetzt', avatar: 'NO' },
        { id: 10, name: 'Ghost', rank: 'member', status: 'offline', joined: '2025-06-05', lastActive: 'vor 3 Std', avatar: 'GH' },
        { id: 11, name: 'Striker', rank: 'member', status: 'online', joined: '2025-06-12', lastActive: 'Jetzt', avatar: 'ST' },
        { id: 12, name: 'Blaze', rank: 'member', status: 'online', joined: '2025-07-01', lastActive: 'Jetzt', avatar: 'BZ' },
        { id: 13, name: 'Toxin', rank: 'member', status: 'offline', joined: '2025-07-10', lastActive: 'Gestern', avatar: 'TX' },
        { id: 14, name: 'DarkMatter', rank: 'member', status: 'online', joined: '2025-07-15', lastActive: 'Jetzt', avatar: 'DM' },
        { id: 15, name: 'Marksman', rank: 'member', status: 'online', joined: '2025-08-01', lastActive: 'Jetzt', avatar: 'MS' },
        { id: 16, name: 'Frostbite', rank: 'recruit', status: 'online', joined: '2025-09-01', lastActive: 'Jetzt', avatar: 'FB' },
        { id: 17, name: 'Rookie_One', rank: 'recruit', status: 'offline', joined: '2025-09-10', lastActive: 'vor 2 Tagen', avatar: 'R1' },
        { id: 18, name: 'Zero', rank: 'recruit', status: 'away', joined: '2025-09-15', lastActive: 'vor 1 Std', avatar: 'ZR' },
        { id: 19, name: 'ShadowFox', rank: 'recruit', status: 'offline', joined: '2025-10-01', lastActive: 'vor 5 Std', avatar: 'SF' },
        { id: 20, name: 'Ace', rank: 'member', status: 'online', joined: '2025-08-12', lastActive: 'Jetzt', avatar: 'AC' },
        { id: 21, name: 'Cobra', rank: 'member', status: 'offline', joined: '2025-08-20', lastActive: 'Gestern', avatar: 'CB' },
        { id: 22, name: 'ThunderBolt', rank: 'recruit', status: 'offline', joined: '2025-10-10', lastActive: 'vor 4 Tagen', avatar: 'TB' },
        { id: 23, name: 'Phantom', rank: 'member', status: 'away', joined: '2025-09-05', lastActive: 'vor 45 Min', avatar: 'PH' },
        { id: 24, name: 'Ranger', rank: 'recruit', status: 'online', joined: '2025-10-15', lastActive: 'Jetzt', avatar: 'RG' },
    ];

    const RANK_ORDER = ['owner', 'co-leader', 'officer', 'member', 'recruit'];
    const RANK_LABELS = { owner: 'Owner', 'co-leader': 'Co-Leader', officer: 'Officer', member: 'Member', recruit: 'Recruit' };
    const RANK_COLORS = { owner: '#f59e0b', 'co-leader': '#7c3aed', officer: '#3b82f6', member: '#22c55e', recruit: '#94a3b8' };

    const ANNOUNCEMENTS = [
        {
            id: 1, title: 'Wichtig: Briefing heute Abend', priority: 'urgent',
            text: 'Alle Operatoren sollen sich heute um 21:00 Uhr im HQ einfinden. Wir besprechen die nächste Operation. Wer nicht kann, soll sich vorher bei einem Officer abmelden!',
            author: 'Commander_Shadow', date: 'Heute, 14:30', reactions: { '👍': 8, '🔥': 5, '✅': 12 },
        },
        {
            id: 2, title: 'Neue Rekrutierungsphase', priority: 'important',
            text: 'Ab sofort suchen wir wieder neue Operatoren. Bitte nur Leute einladen, die Erfahrung mit Arma Reforger haben und teamfähig sind.',
            author: 'Viper', date: 'Gestern, 18:00', reactions: { '👍': 14, '💪': 7 },
        },
        {
            id: 3, title: 'Neues Arsenal freigeschaltet', priority: 'normal',
            text: 'Wir haben ein neues Waffenlager an der FOB Ost eingerichtet. Zugang haben ab sofort alle Officer+.',
            author: 'Ironclad', date: '25. Mär 2026', reactions: { '🎉': 18, '🎯': 9 },
        },
    ];

    const CHAT_MESSAGES = [
        { author: 'Commander_Shadow', rank: 'owner', text: 'Wer ist heute Abend beim Briefing dabei?', time: '14:32', avatar: 'CS' },
        { author: 'Viper', rank: 'co-leader', text: 'Bin dabei, wie immer 💯', time: '14:33', avatar: 'VP' },
        { author: 'Hawk', rank: 'officer', text: 'Count me in! Hab die Loadouts für die Operation vorbereitet', time: '14:35', avatar: 'HK' },
        { type: 'divider', text: 'Heute, 15:00' },
        { author: 'Nomad', rank: 'member', text: 'Bin auch dabei, komme aber etwas später. Muss erst den Konvoi-Run abschließen', time: '15:02', avatar: 'NM' },
        { author: 'Warden', rank: 'member', text: 'Weiß jemand ob die feindliche Fraktion noch im Sektor C aktiv ist? Die haben letztes Mal ganz schön einstecken müssen 😂', time: '15:05', avatar: 'WD' },
        { author: 'Reaper', rank: 'officer', text: '<span class="mention">@Warden</span> Die trauen sich nicht mehr in unseren AO. Unser Sektor ist gesichert!', time: '15:07', avatar: 'RP' },
        { author: 'Spectre', rank: 'officer', text: 'Hat jemand die neue Lieferung gesehen? 50 AK-74 im Arsenal 🔥', time: '15:10', avatar: 'SP' },
        { author: 'NightOwl', rank: 'member', text: 'Nice! Wir sind bestens ausgerüstet für die nächste Op', time: '15:12', avatar: 'NO' },
        { author: 'Ranger', rank: 'recruit', text: 'Bin neu hier, freue mich auf das Briefing heute!', time: '15:15', avatar: 'RG' },
        { author: 'Commander_Shadow', rank: 'owner', text: '<span class="mention">@Ranger</span> Willkommen bei der Shadow Company! 🤝 Bleib dran, heute lernst du den Rest des Teams kennen.', time: '15:16', avatar: 'CS' },
        { author: 'Blaze', rank: 'member', text: 'Wer übernimmt heute den Transport? Ich hab den BTR startklar 🚛', time: '15:20', avatar: 'BZ' },
    ];

    const INVITES = [
        { id: 1, name: 'Sniper_Wolf', status: 'pending', sentBy: 'Commander_Shadow', date: 'Heute', expiry: '24 Std', avatar: 'SW' },
        { id: 2, name: 'Bravo_Six', status: 'pending', sentBy: 'Viper', date: 'Heute', expiry: '48 Std', avatar: 'B6' },
        { id: 3, name: 'RapidFire', status: 'accepted', sentBy: 'Hawk', date: 'Gestern', expiry: '-', avatar: 'RF' },
        { id: 4, name: 'SilverBullet', status: 'pending', sentBy: 'Commander_Shadow', date: 'Gestern', expiry: '7 Tage', avatar: 'SB' },
        { id: 5, name: 'Maverick', status: 'declined', sentBy: 'Reaper', date: 'Vor 3 Tagen', expiry: '-', avatar: 'MV' },
        { id: 6, name: 'Delta_Four', status: 'expired', sentBy: 'Ironclad', date: 'Vor 5 Tagen', expiry: '-', avatar: 'D4' },
    ];

    const RANKS_DATA = [
        { name: 'Owner', color: '#f59e0b', perms: 'Alle Rechte', members: 1, icon: 'crown' },
        { name: 'Co-Leader', color: '#7c3aed', perms: 'Verwalten, Einladen, Kicken, Kasse', members: 2, icon: 'shield-halved' },
        { name: 'Officer', color: '#3b82f6', perms: 'Einladen, Chat moderieren, Lager', members: 3, icon: 'star' },
        { name: 'Member', color: '#22c55e', perms: 'Chat, Lager (eingeschränkt)', members: 12, icon: 'user' },
        { name: 'Recruit', color: '#94a3b8', perms: 'Nur Chat', members: 6, icon: 'user-plus' },
    ];

    const TRANSACTIONS = [
        { type: 'deposit', desc: 'Einzahlung von Commander_Shadow', amount: 50000, date: 'Heute, 14:20' },
        { type: 'deposit', desc: 'Einzahlung von Hawk', amount: 25000, date: 'Heute, 12:00' },
        { type: 'withdraw', desc: 'Ausrüstungskauf — 50x AK-74', amount: -75000, date: 'Heute, 10:30' },
        { type: 'deposit', desc: 'Wöchentliche Abgabe — 8 Operatoren', amount: 80000, date: 'Gestern' },
        { type: 'withdraw', desc: 'Fahrzeug — BTR-80 Reparatur', amount: -120000, date: 'Vor 2 Tagen' },
        { type: 'deposit', desc: 'Einzahlung von Viper', amount: 100000, date: 'Vor 3 Tagen' },
        { type: 'deposit', desc: 'Operations-Prämie', amount: 200000, date: 'Vor 4 Tagen' },
    ];

    const WAREHOUSE_ITEMS = [
        { name: 'Sturmgewehre', icon: '🔫', count: 50, max: 100 },
        { name: 'MGs', icon: '💥', count: 25, max: 50 },
        { name: 'Scharfschützen', icon: '🎯', count: 12, max: 30 },
        { name: 'Schutzwesten', icon: '🛡️', count: 35, max: 50 },
        { name: 'Medkits', icon: '💊', count: 80, max: 100 },
        { name: 'Funkgeräte', icon: '📡', count: 15, max: 40 },
        { name: 'Sprengstoff', icon: '💣', count: 50, max: 200 },
        { name: 'Munition', icon: '🎯', count: 2500, max: 5000 },
    ];

    // ─── New Feature Data ─────────────────────────────────────────

    const EVENTS = [
        { id: 1, name: 'Operation Nightfall — Sektor Ost', type: 'war', date: '2026-04-01', time: '21:00', desc: 'Großoffensive im Sektor Ost. Mindestens 6 Operatoren benötigt. Volle Ausrüstung und Schutzwesten mitbringen!', mandatory: true, rsvp: { yes: 8, no: 2, maybe: 3 }, createdBy: 'Commander_Shadow' },
        { id: 2, name: 'Kompanie-Briefing', type: 'meeting', date: '2026-03-31', time: '20:00', desc: 'Wöchentliches Briefing zur Besprechung der aktuellen Lage.', mandatory: true, rsvp: { yes: 15, no: 1, maybe: 4 }, createdBy: 'Commander_Shadow' },
        { id: 3, name: 'Schießtraining', type: 'training', date: '2026-04-03', time: '19:00', desc: 'Training für alle Recruits und neuen Members. Treffpunkt: Schießstand an der FOB.', mandatory: false, rsvp: { yes: 6, no: 0, maybe: 5 }, createdBy: 'Reaper' },
        { id: 4, name: 'Shadow Company Jubiläum', type: 'party', date: '2026-04-05', time: '22:00', desc: 'Feier zum 1-jährigen Bestehen der Shadow Company! Alle sind eingeladen.', mandatory: false, rsvp: { yes: 20, no: 0, maybe: 2 }, createdBy: 'Viper' },
    ];

    const POLLS = [
        { id: 1, question: 'Sollen wir eine Allianz mit der Task Force Alpha eingehen?', options: [{ text: 'Ja, Allianz eingehen', votes: 12 }, { text: 'Nein, bleiben unabhängig', votes: 8 }, { text: 'Erstmal verhandeln', votes: 4 }], totalVotes: 24, status: 'active', duration: '24h', createdBy: 'Commander_Shadow', date: 'Heute' },
        { id: 2, question: 'Welches Fahrzeug soll als nächstes beschafft werden?', options: [{ text: 'BTR-80 (gepanzert)', votes: 15 }, { text: 'UAZ-469 (schnell)', votes: 6 }, { text: 'Ural-4320 (Transport)', votes: 3 }], totalVotes: 24, status: 'active', duration: '48h', createdBy: 'Ironclad', date: 'Gestern' },
        { id: 3, question: 'Neues HQ-Design: Welche Farbe?', options: [{ text: 'Lila/Purple', votes: 18 }, { text: 'Grün', votes: 4 }, { text: 'Rot', votes: 2 }], totalVotes: 24, status: 'ended', duration: '-', createdBy: 'Viper', date: 'Vor 3 Tagen' },
    ];

    const APPLICATIONS = [
        { id: 1, name: 'Wardog', status: 'pending', date: 'Heute, 12:30', level: 15, age: '22', answers: { exp: 'War vorher bei einer anderen MilSim-Gruppe, suche aber eine Einheit mit besserer Führung.', why: 'Die Shadow Company hat den besten Ruf in der Arma Reforger Community. Ich will Teil davon sein.', hours: 'Täglich 4-6 Stunden' }, avatar: 'WD' },
        { id: 2, name: 'SniperElite', status: 'pending', date: 'Heute, 10:15', level: 22, age: '19', answers: { exp: '2 Jahre MilSim-Erfahrung, kenne die Taktiken und Abläufe.', why: 'Suche eine aktive Einheit mit guter Organisation.', hours: '3-4 Stunden täglich' }, avatar: 'SE' },
        { id: 3, name: 'GhostRider', status: 'pending', date: 'Gestern', level: 8, age: '17', answers: { exp: 'Bin relativ neu bei Arma, aber lerne schnell.', why: 'Meine Freunde sind bei euch und haben mich empfohlen.', hours: '2-3 Stunden' }, avatar: 'GR' },
        { id: 4, name: 'NeonBlade', status: 'pending', date: 'Gestern', level: 30, age: '25', answers: { exp: 'Ex-Squad-Leader der Iron Wolves. Einheit wurde aufgelöst.', why: 'Brauche eine neue Heimat. Kann viel taktische Erfahrung mitbringen.', hours: '5+ Stunden' }, avatar: 'NB' },
        { id: 5, name: 'Overwatch', status: 'accepted', date: 'Vor 3 Tagen', level: 12, age: '20', answers: { exp: 'Member bei den Sentinels seit 6 Monaten.', why: 'Will mich taktisch weiterentwickeln.', hours: '3 Stunden' }, avatar: 'OW' },
        { id: 6, name: 'RageQuit', status: 'rejected', date: 'Vor 4 Tagen', level: 5, age: '15', answers: { exp: 'Keine Erfahrung.', why: 'Sieht cool aus.', hours: '1 Stunde' }, avatar: 'RQ' },
    ];

    const MEMBER_WARNS = {};
    const MEMBER_NOTES = {};

    MEMBERS.forEach(m => {
        MEMBER_WARNS[m.id] = [];
        MEMBER_NOTES[m.id] = [];
    });
    MEMBER_WARNS[17] = [{ reason: 'Inaktivität', details: '10 Tage nicht online', date: 'Vor 5 Tagen' }];
    MEMBER_WARNS[13] = [{ reason: 'Fehlverhalten', details: 'Respektloses Verhalten gegenüber Officer', date: 'Vor 3 Tagen' }, { reason: 'Regelverstoß', details: 'Unerlaubter Fraktionswechsel', date: 'Vor 1 Tag' }];
    MEMBER_WARNS[22] = [{ reason: 'Inaktivität', details: 'Keine Abmeldung', date: 'Vor 2 Tagen' }];
    MEMBER_NOTES[2] = [{ text: 'Verlässlich, guter Kandidat für Co-Leader Aufgaben', date: 'Vor 1 Woche' }];
    MEMBER_NOTES[4] = [{ text: 'Hat gute Kontakte zur Task Force Alpha — könnte nützlich sein', date: 'Vor 3 Tagen' }];

    const MEMBER_ACTIVITY = {};
    MEMBERS.forEach(m => {
        const base = m.rank === 'owner' ? 35 : m.rank === 'co-leader' ? 28 : m.rank === 'officer' ? 22 : m.rank === 'member' ? 15 : 8;
        MEMBER_ACTIVITY[m.id] = Math.max(1, base + Math.floor(Math.random() * 12) - 5);
    });

    const ACTIVITIES = [
        { type: 'join', text: '<strong>Ranger</strong> ist der Kompanie beigetreten', time: 'vor 2 Std' },
        { type: 'money', text: '<strong>Commander_Shadow</strong> hat <strong>$50.000</strong> eingezahlt', time: 'vor 3 Std' },
        { type: 'announce', text: '<strong>Commander_Shadow</strong> hat eine Ankündigung erstellt', time: 'vor 4 Std' },
        { type: 'rank', text: '<strong>Warden</strong> wurde zum <strong>Member</strong> befördert', time: 'vor 5 Std' },
        { type: 'money', text: '<strong>Hawk</strong> hat <strong>$25.000</strong> eingezahlt', time: 'vor 6 Std' },
        { type: 'leave', text: '<strong>Deserter_X</strong> wurde aus der Kompanie entfernt', time: 'vor 8 Std' },
        { type: 'join', text: '<strong>Frostbite</strong> ist der Kompanie beigetreten', time: 'vor 1 Tag' },
        { type: 'announce', text: '<strong>Viper</strong> hat eine Ankündigung erstellt', time: 'vor 1 Tag' },
    ];

    // ─── Utility Functions ───────────────────────────────────────

    function avatarUrl(seed, bg) {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=${(bg || '7c3aed').replace('#', '')}`;
    }

    function formatMoney(n) {
        return '$' + Math.abs(n).toLocaleString('de-DE');
    }

    const statusLabels = { online: 'Online', offline: 'Offline', away: 'Abwesend', dnd: 'Nicht stören' };

    // ─── Toast Notification ──────────────────────────────────────

    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const icons = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            info: 'fa-circle-info',
            warning: 'fa-triangle-exclamation',
        };
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon ${type}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close"><i class="fas fa-xmark"></i></button>
        `;
        container.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
        setTimeout(() => removeToast(toast), 4000);
    }

    function removeToast(toast) {
        if (!toast.parentElement) return;
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 300);
    }

    // ─── Navigation (Dock) ──────────────────────────────────────

    const dockItems = document.querySelectorAll('.dock-item[data-page]');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('pageTitle');

    const PAGE_TITLES = {
        dashboard: 'Dashboard',
        announcements: 'Ankündigungen',
        chat: 'Kompanie Chat',
        members: 'Mitglieder',
        invites: 'Einladungen',
        ranks: 'Ränge & Rollen',
        events: 'Event-Planer',
        polls: 'Abstimmungen',
        applications: 'Bewerbungen',
        activity: 'Aktivitäts-Tracker',
        rules: 'Regelwerk',
        settings: 'Einstellungen',
    };

    function navigateTo(pageId) {
        dockItems.forEach(item => item.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        const dockItem = document.querySelector(`.dock-item[data-page="${pageId}"]`);
        const page = document.getElementById(`page-${pageId}`);

        if (dockItem) dockItem.classList.add('active');
        if (page) page.classList.add('active');
        if (pageTitle) pageTitle.textContent = PAGE_TITLES[pageId] || pageId;
    }

    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });

    // ─── Dock Magnification Effect ───────────────────────────────

    const dock = document.getElementById('dock');
    const BASE_SIZE = 48;
    const MAX_SIZE = 72;
    const MAGNIFY_RANGE = 150;

    function applyDockMagnification(mouseX) {
        dockItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - itemCenterX);
            const scale = Math.max(BASE_SIZE, MAX_SIZE - (MAX_SIZE - BASE_SIZE) * (distance / MAGNIFY_RANGE));
            const size = distance < MAGNIFY_RANGE ? scale : BASE_SIZE;
            item.style.width = size + 'px';
            item.style.height = size + 'px';
        });
    }

    function resetDockSize() {
        dockItems.forEach(item => {
            item.style.width = BASE_SIZE + 'px';
            item.style.height = BASE_SIZE + 'px';
        });
    }

    if (dock) {
        dock.addEventListener('mousemove', (e) => {
            applyDockMagnification(e.clientX);
        });
        dock.addEventListener('mouseleave', () => {
            resetDockSize();
        });
    }

    // ─── Dock Show / Hide Toggle ─────────────────────────────────

    const dockWrapper = document.getElementById('dockWrapper');
    const dockHideBtn = document.getElementById('dockHideBtn');
    const dockShowTab = document.getElementById('dockShowTab');

    function hideDock() {
        if (!dockWrapper) return;
        dockWrapper.classList.add('hidden');
        if (dockShowTab) {
            setTimeout(() => dockShowTab.classList.add('visible'), 300);
        }
    }

    function showDock() {
        if (!dockShowTab) return;
        dockShowTab.classList.remove('visible');
        if (dockWrapper) {
            setTimeout(() => dockWrapper.classList.remove('hidden'), 150);
        }
    }

    if (dockHideBtn) dockHideBtn.addEventListener('click', hideDock);
    if (dockShowTab) dockShowTab.addEventListener('click', showDock);

    // Quick actions routing
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const actionMap = {
                'new-announcement': () => { navigateTo('announcements'); openModal('announcementModal'); },
                'invite-member': () => { navigateTo('invites'); openModal('inviteModal'); },
                'open-chat': () => navigateTo('chat'),
                'manage-ranks': () => navigateTo('ranks'),
                'events-page': () => navigateTo('events'),
            };
            if (actionMap[action]) actionMap[action]();
        });
    });

    // ─── Render Dashboard ────────────────────────────────────────

    function renderActivities() {
        const list = document.getElementById('activityList');
        if (!list) return;

        const iconMap = {
            join: { icon: 'fa-user-plus', cls: 'join' },
            leave: { icon: 'fa-user-minus', cls: 'leave' },
            announce: { icon: 'fa-bullhorn', cls: 'announce' },
            money: { icon: 'fa-dollar-sign', cls: 'money' },
            rank: { icon: 'fa-arrow-up', cls: 'rank' },
        };

        list.innerHTML = ACTIVITIES.map(a => {
            const ic = iconMap[a.type] || iconMap.join;
            return `
                <div class="activity-item">
                    <div class="activity-icon ${ic.cls}"><i class="fas ${ic.icon}"></i></div>
                    <div>
                        <div class="activity-text">${a.text}</div>
                        <div class="activity-time">${a.time}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderOnlineMembers() {
        const list = document.getElementById('onlineMembersList');
        if (!list) return;

        const online = MEMBERS.filter(m => m.status === 'online');
        list.innerHTML = online.map(m => `
            <div class="online-member-item">
                <img src="${avatarUrl(m.avatar, RANK_COLORS[m.rank])}" class="mini-avatar" alt="">
                <span class="online-member-name">${m.name}</span>
                <span class="online-member-rank">${RANK_LABELS[m.rank]}</span>
            </div>
        `).join('');
    }

    // ─── Render Announcements ────────────────────────────────────

    function renderAnnouncements() {
        const list = document.getElementById('announcementsList');
        if (!list) return;

        const countEl = document.getElementById('announcementsCount');
        if (countEl) countEl.textContent = ANNOUNCEMENTS.length;

        const totalReactions = (r) => Object.values(r).reduce((s, c) => s + c, 0);

        list.innerHTML = ANNOUNCEMENTS.map(a => {
            const member = MEMBERS.find(m => m.name === a.author);
            const avatarBg = member ? RANK_COLORS[member.rank] : '7c3aed';
            const reactions = Object.entries(a.reactions).map(([emoji, count]) =>
                `<span class="reaction">${emoji} ${count}</span>`
            ).join('');

            const priorityIcon = a.priority === 'urgent' ? 'fa-circle-exclamation' :
                                 a.priority === 'important' ? 'fa-triangle-exclamation' : 'fa-circle-info';
            const priorityLabel = a.priority === 'urgent' ? 'Dringend' :
                                  a.priority === 'important' ? 'Wichtig' : 'Normal';
            const pinHtml = a.priority === 'urgent' ? '<i class="fas fa-thumbtack pin-icon" title="Angepinnt"></i>' : '';
            const reactionTotal = totalReactions(a.reactions);

            return `
                <div class="announcement-card priority-${a.priority}">
                    <div class="announcement-card-priority-strip"></div>
                    <div class="announcement-card-body">
                        <div class="announcement-card-header">
                            <div class="announcement-card-meta">
                                <img src="${avatarUrl(a.author.substring(0, 2), avatarBg)}" alt="">
                                <div class="meta-text">
                                    <div class="announcement-card-author">${a.author}</div>
                                    <div class="announcement-card-date"><i class="far fa-clock"></i> ${a.date}</div>
                                </div>
                            </div>
                            <span class="priority-badge ${a.priority}">
                                <i class="fas ${priorityIcon}"></i> ${priorityLabel}
                            </span>
                        </div>
                        <div class="announcement-card-title">${pinHtml} ${a.title}</div>
                        <div class="announcement-card-text">${a.text}</div>
                        <div class="announcement-card-footer">
                            <div class="announcement-reactions">${reactions}</div>
                            <div class="announcement-card-stats">
                                <span><i class="far fa-face-smile"></i> ${reactionTotal}</span>
                            </div>
                            <div class="announcement-card-actions">
                                <button class="btn-icon" title="Bearbeiten"><i class="fas fa-pen"></i></button>
                                <button class="btn-icon" title="Löschen"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ─── Render Chat ─────────────────────────────────────────────

    function renderChatMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = CHAT_MESSAGES.map(msg => {
            if (msg.type === 'divider') {
                return `<div class="chat-divider"><span>${msg.text}</span></div>`;
            }
            const member = MEMBERS.find(m => m.name === msg.author);
            const avatarBg = member ? RANK_COLORS[member.rank] : '7c3aed';
            return `
                <div class="chat-message">
                    <img src="${avatarUrl(msg.avatar, avatarBg)}" class="msg-avatar" alt="">
                    <div class="msg-content">
                        <div class="msg-header">
                            <span class="msg-author ${msg.rank}">${msg.author}</span>
                            <span class="msg-timestamp">${msg.time}</span>
                        </div>
                        <div class="msg-text">${msg.text}</div>
                    </div>
                </div>
            `;
        }).join('');

        container.scrollTop = container.scrollHeight;
    }

    function renderChatMembers() {
        const container = document.getElementById('chatMembersList');
        if (!container) return;

        let html = '';
        for (const rank of RANK_ORDER) {
            const members = MEMBERS.filter(m => m.rank === rank);
            if (members.length === 0) continue;
            html += `<div class="chat-member-group-title">${RANK_LABELS[rank]} — ${members.length}</div>`;
            members.forEach(m => {
                const opacity = m.status === 'offline' ? 'opacity: 0.4;' : '';
                html += `
                    <div class="chat-member-item" style="${opacity}">
                        <div class="member-avatar-wrap">
                            <img src="${avatarUrl(m.avatar, RANK_COLORS[m.rank])}" alt="">
                            <span class="status-dot ${m.status}"></span>
                        </div>
                        <span class="member-name" style="color:${RANK_COLORS[m.rank]}">${m.name}</span>
                    </div>
                `;
            });
        }
        container.innerHTML = html;
    }

    // Send message handler
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessageBtn');

    function sendChatMessage() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        CHAT_MESSAGES.push({
            author: 'Commander_Shadow',
            rank: 'owner',
            text: text,
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            avatar: 'OG',
        });

        chatInput.value = '';
        renderChatMessages();
    }

    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
    if (chatInput) chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChatMessage(); });

    // Channel switching
    document.querySelectorAll('.channel-item').forEach(ch => {
        ch.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.channel-item').forEach(c => c.classList.remove('active'));
            ch.classList.add('active');
            const channelName = ch.dataset.channel;
            const nameEl = document.querySelector('.chat-channel-name');
            if (nameEl) nameEl.textContent = channelName;
            if (chatInput) chatInput.placeholder = `Nachricht an #${channelName}`;
            const unread = ch.querySelector('.channel-unread');
            if (unread) unread.remove();
        });
    });

    // ─── Render Members ──────────────────────────────────────────

    function renderMembers(filter = 'all') {
        const tbody = document.getElementById('membersTableBody');
        if (!tbody) return;

        let members = [...MEMBERS];
        if (filter !== 'all') members = members.filter(m => m.rank === filter);
        members.sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank));

        tbody.innerHTML = members.map(m => {
            const warns = MEMBER_WARNS[m.id] || [];
            const warnDots = [0,1,2].map(i => `<span class="warn-dot ${i < warns.length ? 'active' : ''}"></span>`).join('');
            return `
            <tr>
                <td>
                    <div class="member-cell">
                        <img src="${avatarUrl(m.avatar, RANK_COLORS[m.rank])}" alt="">
                        <div>
                            <div class="member-cell-name">${m.name}</div>
                            <div class="member-cell-id">ID: ${m.id}</div>
                        </div>
                    </div>
                </td>
                <td><span class="rank-badge ${m.rank}"><i class="fas fa-${m.rank === 'owner' ? 'crown' : m.rank === 'co-leader' ? 'shield-halved' : m.rank === 'officer' ? 'star' : m.rank === 'member' ? 'user' : 'user-plus'}"></i> ${RANK_LABELS[m.rank]}</span></td>
                <td><span class="status-badge ${m.status}">${statusLabels[m.status]}</span></td>
                <td><div class="warns-display">${warnDots}</div></td>
                <td>${m.joined}</td>
                <td>
                    <div class="member-actions">
                        <button class="btn-icon" title="Verwarnen" data-action="warn" data-id="${m.id}"><i class="fas fa-triangle-exclamation"></i></button>
                        <button class="btn-icon" title="Notizen" data-action="notes" data-id="${m.id}"><i class="fas fa-sticky-note"></i></button>
                        <button class="btn-icon" title="Befördern" data-action="promote" data-id="${m.id}"><i class="fas fa-arrow-up"></i></button>
                        <button class="btn-icon" title="Degradieren" data-action="demote" data-id="${m.id}"><i class="fas fa-arrow-down"></i></button>
                        <button class="btn-icon" title="Kicken" data-action="kick" data-id="${m.id}"><i class="fas fa-user-minus"></i></button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        // Attach action listeners
        tbody.querySelectorAll('.btn-icon[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const memberId = parseInt(btn.dataset.id);
                const member = MEMBERS.find(m => m.id === memberId);
                if (!member) return;

                if (action === 'warn') {
                    openWarnModal(member);
                    return;
                } else if (action === 'notes') {
                    openNotesModal(member);
                    return;
                } else if (action === 'promote') {
                    const currentIdx = RANK_ORDER.indexOf(member.rank);
                    if (currentIdx > 1) {
                        member.rank = RANK_ORDER[currentIdx - 1];
                        showToast(`${member.name} wurde zum ${RANK_LABELS[member.rank]} befördert!`, 'success');
                        renderMembers(document.getElementById('memberFilter').value);
                        renderChatMembers();
                    } else {
                        showToast('Dieser Operator kann nicht weiter befördert werden.', 'warning');
                    }
                } else if (action === 'demote') {
                    const currentIdx = RANK_ORDER.indexOf(member.rank);
                    if (currentIdx < RANK_ORDER.length - 1 && currentIdx > 0) {
                        member.rank = RANK_ORDER[currentIdx + 1];
                        showToast(`${member.name} wurde zum ${RANK_LABELS[member.rank]} degradiert.`, 'warning');
                        renderMembers(document.getElementById('memberFilter').value);
                        renderChatMembers();
                    } else {
                        showToast('Dieser Operator kann nicht weiter degradiert werden.', 'warning');
                    }
                } else if (action === 'kick') {
                    if (member.rank === 'owner') {
                        showToast('Der Owner kann nicht gekickt werden!', 'error');
                        return;
                    }
                    const idx = MEMBERS.indexOf(member);
                    if (idx > -1) {
                        MEMBERS.splice(idx, 1);
                        showToast(`${member.name} wurde aus der Kompanie entfernt.`, 'error');
                        renderMembers(document.getElementById('memberFilter').value);
                        renderChatMembers();
                        renderOnlineMembers();
                        updateStats();
                    }
                }
            });
        });
    }

    // Member filter
    const memberFilter = document.getElementById('memberFilter');
    if (memberFilter) {
        memberFilter.addEventListener('change', () => renderMembers(memberFilter.value));
    }

    // ─── Render Invites ──────────────────────────────────────────

    function renderInvites() {
        const list = document.getElementById('invitesList');
        if (!list) return;

        const statusLabelsInv = { pending: 'Ausstehend', accepted: 'Angenommen', declined: 'Abgelehnt', expired: 'Abgelaufen' };

        list.innerHTML = INVITES.map(inv => `
            <div class="invite-item">
                <div class="invite-item-info">
                    <img src="${avatarUrl(inv.avatar, '4a4a5a')}" alt="">
                    <div>
                        <div class="invite-item-name">${inv.name}</div>
                        <div class="invite-item-meta">Eingeladen von ${inv.sentBy} · ${inv.date}${inv.expiry !== '-' ? ` · Läuft ab in ${inv.expiry}` : ''}</div>
                    </div>
                </div>
                <span class="invite-status ${inv.status}">${statusLabelsInv[inv.status]}</span>
            </div>
        `).join('');
    }

    // ─── Render Ranks ────────────────────────────────────────────

    function renderRanks() {
        const list = document.getElementById('ranksList');
        if (!list) return;

        list.innerHTML = RANKS_DATA.map((r, i) => `
            <div class="rank-card">
                <div class="rank-drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="rank-color-dot" style="background:${r.color}"></div>
                <div class="rank-card-info">
                    <div class="rank-card-name" style="color:${r.color}"><i class="fas fa-${r.icon}"></i> ${r.name}</div>
                    <div class="rank-card-perms">${r.perms}</div>
                </div>
                <span class="rank-member-count">${r.members} Mitglieder</span>
                <div class="rank-card-actions">
                    <button class="btn-icon" title="Bearbeiten"><i class="fas fa-pen"></i></button>
                    ${i > 0 ? `<button class="btn-icon" title="Löschen"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `).join('');
    }


    // ─── Update Stats ────────────────────────────────────────────

    function updateStats() {
        const totalMembers = MEMBERS.length;
        const onlineCount = MEMBERS.filter(m => m.status === 'online').length;

        const statMembers = document.getElementById('statMembers');
        const statOnline = document.getElementById('statOnline');
        const onlineCountEl = document.getElementById('onlineCount');

        if (statMembers) statMembers.textContent = totalMembers;
        if (statOnline) statOnline.textContent = onlineCount;
        if (onlineCountEl) onlineCountEl.textContent = onlineCount;
    }

    // ─── Modals ──────────────────────────────────────────────────

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // Announcement Modal
    const newAnnouncementBtn = document.getElementById('newAnnouncementBtn');
    if (newAnnouncementBtn) {
        newAnnouncementBtn.addEventListener('click', () => openModal('announcementModal'));
    }

    const postAnnouncementBtn = document.getElementById('postAnnouncementBtn');
    if (postAnnouncementBtn) {
        postAnnouncementBtn.addEventListener('click', () => {
            const title = document.getElementById('announcementTitle').value.trim();
            const text = document.getElementById('announcementText').value.trim();
            const priority = document.getElementById('announcementPriority').value;

            if (!title || !text) {
                showToast('Bitte Titel und Nachricht ausfüllen!', 'error');
                return;
            }

            ANNOUNCEMENTS.unshift({
                id: ANNOUNCEMENTS.length + 1,
                title,
                priority,
                text,
                author: 'Commander_Shadow',
                date: 'Gerade eben',
                reactions: {},
            });

            ACTIVITIES.unshift({
                type: 'announce',
                text: '<strong>Commander_Shadow</strong> hat eine neue Ankündigung erstellt',
                time: 'Gerade eben',
            });

            renderAnnouncements();
            renderActivities();
            closeModal('announcementModal');
            showToast('Ankündigung veröffentlicht!', 'success');

            document.getElementById('announcementTitle').value = '';
            document.getElementById('announcementText').value = '';
            document.getElementById('announcementPriority').value = 'normal';
        });
    }

    // Invite Modal
    const createInviteBtn = document.getElementById('createInviteBtn');
    const inviteMemberBtn = document.getElementById('inviteMemberBtn');
    if (createInviteBtn) createInviteBtn.addEventListener('click', () => openModal('inviteModal'));
    if (inviteMemberBtn) inviteMemberBtn.addEventListener('click', () => { navigateTo('invites'); openModal('inviteModal'); });

    const sendInviteBtn = document.getElementById('sendInviteBtn');
    if (sendInviteBtn) {
        sendInviteBtn.addEventListener('click', () => {
            const name = document.getElementById('invitePlayerName').value.trim();
            if (!name) {
                showToast('Bitte einen Operatornamen eingeben!', 'error');
                return;
            }

            const expiry = document.getElementById('inviteExpiry').value;
            const expiryLabels = { '24h': '24 Std', '48h': '48 Std', '7d': '7 Tage', 'never': 'Kein Ablauf' };

            INVITES.unshift({
                id: INVITES.length + 1,
                name,
                status: 'pending',
                sentBy: 'Commander_Shadow',
                date: 'Gerade eben',
                expiry: expiryLabels[expiry],
                avatar: name.substring(0, 2).toUpperCase(),
            });

            const linkPreview = document.getElementById('inviteLinkPreview');
            const linkCode = document.getElementById('inviteLinkCode');
            const code = `shadowcompany.gg/invite/${Math.random().toString(36).substring(2, 10)}`;
            if (linkPreview) linkPreview.style.display = 'block';
            if (linkCode) linkCode.textContent = code;

            renderInvites();
            showToast(`Einladung an ${name} gesendet!`, 'success');
        });
    }

    // Copy invite link
    const copyInviteLink = document.getElementById('copyInviteLink');
    if (copyInviteLink) {
        copyInviteLink.addEventListener('click', () => {
            const linkCode = document.getElementById('inviteLinkCode');
            if (linkCode) {
                navigator.clipboard?.writeText(linkCode.textContent).then(() => {
                    showToast('Link in die Zwischenablage kopiert!', 'success');
                });
            }
        });
    }

    // Generic modal close
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    // ─── Notification Button ─────────────────────────────────────

    const notifBtn = document.getElementById('notifBtn');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            showToast('3 neue Benachrichtigungen', 'info');
            const dot = notifBtn.querySelector('.notif-dot');
            if (dot) dot.style.display = 'none';
        });
    }

    // ─── Color Picker ────────────────────────────────────────────

    const colorPicker = document.getElementById('familyColorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const hex = e.target.value;
            const hexLabel = colorPicker.parentElement.querySelector('.color-hex');
            if (hexLabel) hexLabel.textContent = hex;
            document.documentElement.style.setProperty('--accent', hex);
        });
    }

    // ─── Search ──────────────────────────────────────────────────

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim().toLowerCase();
                if (!query) return;

                const member = MEMBERS.find(m => m.name.toLowerCase().includes(query));
                if (member) {
                    navigateTo('members');
                    showToast(`Operator "${member.name}" gefunden`, 'info');
                } else {
                    showToast('Keine Ergebnisse gefunden', 'warning');
                }
                searchInput.value = '';
            }
        });
    }

    // ─── Warn Modal ───────────────────────────────────────────────

    let warnTargetMember = null;

    function openWarnModal(member) {
        warnTargetMember = member;
        const warnModal = document.getElementById('warnModal');
        const warnTarget = document.getElementById('warnTarget');
        const warns = MEMBER_WARNS[member.id] || [];
        const strikes = [0,1,2].map(i => `<span class="warn-strike ${i < warns.length ? 'active' : ''}"></span>`).join('');

        warnTarget.innerHTML = `
            <img src="${avatarUrl(member.avatar, RANK_COLORS[member.rank])}" alt="">
            <div>
                <div class="warn-target-name">${member.name}</div>
                <div class="warn-target-rank">${RANK_LABELS[member.rank]} — ${warns.length}/3 Verwarnungen</div>
            </div>
            <div class="warn-strikes">${strikes}</div>
        `;
        warnModal.classList.add('active');
    }

    const confirmWarnBtn = document.getElementById('confirmWarnBtn');
    if (confirmWarnBtn) {
        confirmWarnBtn.addEventListener('click', () => {
            if (!warnTargetMember) return;
            const reason = document.getElementById('warnReason').value;
            const details = document.getElementById('warnDetails').value || '';
            const reasonLabels = { inactivity: 'Inaktivität', misconduct: 'Fehlverhalten', 'event-miss': 'Event verpasst', 'rule-break': 'Regelverstoß', other: 'Sonstiges' };

            if (!MEMBER_WARNS[warnTargetMember.id]) MEMBER_WARNS[warnTargetMember.id] = [];
            MEMBER_WARNS[warnTargetMember.id].push({ reason: reasonLabels[reason], details, date: 'Gerade eben' });

            const warnCount = MEMBER_WARNS[warnTargetMember.id].length;

            if (warnCount >= 3) {
                const idx = MEMBERS.indexOf(warnTargetMember);
                if (idx > -1) MEMBERS.splice(idx, 1);
                showToast(`${warnTargetMember.name} hat 3 Strikes — automatisch gekickt!`, 'error');
            } else {
                showToast(`${warnTargetMember.name} wurde verwarnt (${warnCount}/3)`, 'warning');
            }

            document.getElementById('warnModal').classList.remove('active');
            document.getElementById('warnDetails').value = '';
            renderMembers(document.getElementById('memberFilter').value);
            warnTargetMember = null;
        });
    }

    // ─── Notes Modal ────────────────────────────────────────────

    let notesTargetMember = null;

    function openNotesModal(member) {
        notesTargetMember = member;
        const notesModal = document.getElementById('notesModal');
        const notesTarget = document.getElementById('notesTarget');
        const warns = MEMBER_WARNS[member.id] || [];
        const notes = MEMBER_NOTES[member.id] || [];

        notesTarget.innerHTML = `
            <img src="${avatarUrl(member.avatar, RANK_COLORS[member.rank])}" alt="">
            <div>
                <div class="notes-target-name">${member.name}</div>
                <div class="notes-target-rank">${RANK_LABELS[member.rank]}</div>
            </div>
        `;

        const warnHistory = document.getElementById('notesWarnHistory');
        if (warns.length > 0) {
            warnHistory.innerHTML = `<h4>Verwarnungen (${warns.length}/3)</h4>` + warns.map(w => `
                <div class="warn-history-item">
                    <i class="fas fa-triangle-exclamation"></i>
                    <span class="warn-reason"><strong>${w.reason}</strong> ${w.details ? '— ' + w.details : ''}</span>
                    <span class="warn-date">${w.date}</span>
                </div>
            `).join('');
        } else {
            warnHistory.innerHTML = '<h4>Keine Verwarnungen</h4>';
        }

        const notesList = document.getElementById('notesList');
        notesList.innerHTML = notes.length ? notes.map(n => `
            <div class="note-item">
                <div class="note-item-text">${n.text}</div>
                <div class="note-item-meta">${n.date}</div>
            </div>
        `).join('') : '<p style="color:var(--text-muted);font-size:13px">Noch keine Notizen vorhanden.</p>';

        notesModal.classList.add('active');
    }

    const saveNoteBtn = document.getElementById('saveNoteBtn');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', () => {
            if (!notesTargetMember) return;
            const text = document.getElementById('noteText').value.trim();
            if (!text) return;

            if (!MEMBER_NOTES[notesTargetMember.id]) MEMBER_NOTES[notesTargetMember.id] = [];
            MEMBER_NOTES[notesTargetMember.id].push({ text, date: 'Gerade eben' });

            showToast(`Notiz für ${notesTargetMember.name} gespeichert`, 'success');
            document.getElementById('noteText').value = '';
            openNotesModal(notesTargetMember);
        });
    }

    // ─── Events ─────────────────────────────────────────────────

    function renderEvents() {
        const list = document.getElementById('eventsList');
        if (!list) return;

        const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

        list.innerHTML = EVENTS.map(e => {
            const d = new Date(e.date);
            const day = d.getDate();
            const month = monthNames[d.getMonth()];
            return `
            <div class="event-card">
                <div class="event-date-box">
                    <span class="event-date-day">${day}</span>
                    <span class="event-date-month">${month}</span>
                </div>
                <div class="event-info">
                    <h4>${e.name} ${e.mandatory ? '<span class="mandatory-tag">PFLICHT</span>' : ''}</h4>
                    <div class="event-meta">
                        <span><i class="fas fa-clock"></i> ${e.time} Uhr</span>
                        <span><i class="fas fa-user"></i> ${e.createdBy}</span>
                        <span class="event-type-badge ${e.type}">${e.type === 'meeting' ? 'Briefing' : e.type === 'war' ? 'Operation' : e.type === 'heist' ? 'Aufklärung' : e.type === 'training' ? 'Training' : e.type === 'party' ? 'Feier' : 'Sonstiges'}</span>
                    </div>
                    <div class="event-desc">${e.desc}</div>
                </div>
                <div class="event-rsvp">
                    <div class="event-rsvp-count"><strong>${e.rsvp.yes}</strong> zugesagt · ${e.rsvp.maybe} vielleicht · ${e.rsvp.no} abgesagt</div>
                    <div class="event-rsvp-btns">
                        <button class="rsvp-btn yes" data-event="${e.id}" data-rsvp="yes"><i class="fas fa-check"></i> Zusagen</button>
                        <button class="rsvp-btn maybe" data-event="${e.id}" data-rsvp="maybe"><i class="fas fa-question"></i></button>
                        <button class="rsvp-btn no" data-event="${e.id}" data-rsvp="no"><i class="fas fa-xmark"></i></button>
                    </div>
                </div>
            </div>`;
        }).join('');

        list.querySelectorAll('.rsvp-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const evId = parseInt(btn.dataset.event);
                const rsvpType = btn.dataset.rsvp;
                const ev = EVENTS.find(e => e.id === evId);
                if (!ev) return;
                ev.rsvp[rsvpType]++;
                btn.classList.add('active');
                showToast(`Du hast für "${ev.name}" ${rsvpType === 'yes' ? 'zugesagt' : rsvpType === 'no' ? 'abgesagt' : 'vielleicht gesagt'}`, 'info');
                renderEvents();
            });
        });
    }

    const createEventBtn = document.getElementById('createEventBtn');
    const eventModal = document.getElementById('eventModal');
    if (createEventBtn && eventModal) {
        createEventBtn.addEventListener('click', () => eventModal.classList.add('active'));
    }

    const saveEventBtn = document.getElementById('saveEventBtn');
    if (saveEventBtn) {
        saveEventBtn.addEventListener('click', () => {
            const name = document.getElementById('eventName').value.trim();
            const date = document.getElementById('eventDate').value;
            const time = document.getElementById('eventTime').value;
            const type = document.getElementById('eventType').value;
            const desc = document.getElementById('eventDesc').value.trim();
            const mandatory = document.getElementById('eventMandatory').checked;

            if (!name || !date) { showToast('Name und Datum sind Pflicht!', 'warning'); return; }

            EVENTS.unshift({ id: Date.now(), name, type, date, time: time || '20:00', desc, mandatory, rsvp: { yes: 1, no: 0, maybe: 0 }, createdBy: 'Commander_Shadow' });
            showToast(`Event "${name}" erstellt!`, 'success');
            eventModal.classList.remove('active');
            document.getElementById('eventName').value = '';
            document.getElementById('eventDesc').value = '';
            renderEvents();
        });
    }

    // ─── Polls ──────────────────────────────────────────────────

    function renderPolls() {
        const list = document.getElementById('pollsList');
        if (!list) return;

        list.innerHTML = POLLS.map(p => {
            const maxVotes = Math.max(...p.options.map(o => o.votes), 1);
            return `
            <div class="poll-card">
                <div class="poll-header">
                    <div>
                        <div class="poll-question">${p.question}</div>
                        <div class="poll-meta">von ${p.createdBy} · ${p.date}</div>
                    </div>
                    <span class="poll-status ${p.status}">${p.status === 'active' ? 'Aktiv' : 'Beendet'}</span>
                </div>
                <div class="poll-options">
                    ${p.options.map((o, i) => {
                        const pct = p.totalVotes ? Math.round((o.votes / p.totalVotes) * 100) : 0;
                        return `
                        <div class="poll-option ${i === 0 ? 'voted' : ''}" data-poll="${p.id}" data-option="${i}">
                            <div class="poll-option-bar" style="width: ${pct}%"></div>
                            <span class="poll-option-text">${o.text}</span>
                            <span class="poll-option-pct">${pct}%</span>
                            <span class="poll-option-votes">${o.votes} Stimmen</span>
                        </div>`;
                    }).join('')}
                </div>
                <div class="poll-footer">
                    <span>${p.totalVotes} Stimmen insgesamt</span>
                    <span>${p.status === 'active' ? 'Läuft noch ' + p.duration : 'Abgeschlossen'}</span>
                </div>
            </div>`;
        }).join('');

        list.querySelectorAll('.poll-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const pId = parseInt(opt.dataset.poll);
                const oIdx = parseInt(opt.dataset.option);
                const poll = POLLS.find(p => p.id === pId);
                if (!poll || poll.status !== 'active') return;
                poll.options[oIdx].votes++;
                poll.totalVotes++;
                showToast('Deine Stimme wurde gezählt!', 'success');
                renderPolls();
            });
        });
    }

    const createPollBtn = document.getElementById('createPollBtn');
    const pollModal = document.getElementById('pollModal');
    if (createPollBtn && pollModal) {
        createPollBtn.addEventListener('click', () => pollModal.classList.add('active'));
    }

    const addPollOptionBtn = document.getElementById('addPollOptionBtn');
    if (addPollOptionBtn) {
        addPollOptionBtn.addEventListener('click', () => {
            const container = document.getElementById('pollOptionsContainer');
            const count = container.querySelectorAll('input').length + 1;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-input poll-option-input';
            input.placeholder = `Option ${count}`;
            input.style.marginBottom = '8px';
            container.appendChild(input);
        });
    }

    const savePollBtn = document.getElementById('savePollBtn');
    if (savePollBtn) {
        savePollBtn.addEventListener('click', () => {
            const question = document.getElementById('pollQuestion').value.trim();
            const optionInputs = document.querySelectorAll('#pollOptionsContainer input');
            const options = Array.from(optionInputs).map(i => i.value.trim()).filter(v => v);
            const duration = document.getElementById('pollDuration').value;

            if (!question || options.length < 2) { showToast('Frage und min. 2 Optionen nötig!', 'warning'); return; }

            POLLS.unshift({ id: Date.now(), question, options: options.map(t => ({ text: t, votes: 0 })), totalVotes: 0, status: 'active', duration, createdBy: 'Commander_Shadow', date: 'Gerade eben' });
            showToast('Abstimmung gestartet!', 'success');
            pollModal.classList.remove('active');
            document.getElementById('pollQuestion').value = '';
            document.querySelectorAll('#pollOptionsContainer input').forEach(i => i.value = '');
            renderPolls();
        });
    }

    // ─── Applications ───────────────────────────────────────────

    function renderApplications(filter = 'all') {
        const list = document.getElementById('applicationsList');
        if (!list) return;

        let apps = [...APPLICATIONS];
        if (filter !== 'all') apps = apps.filter(a => a.status === filter);

        const statusColors = { pending: 'gold', accepted: 'green', rejected: 'red' };
        const statusLabels = { pending: 'Ausstehend', accepted: 'Angenommen', rejected: 'Abgelehnt' };

        list.innerHTML = apps.map(a => `
            <div class="app-card">
                <div class="app-card-header">
                    <div class="app-card-player">
                        <img src="${avatarUrl(a.avatar, '#6366f1')}" alt="">
                        <div>
                            <div class="app-card-player-name">${a.name}</div>
                            <div class="app-card-player-meta">Level ${a.level} · ${a.age} Jahre · ${a.date}</div>
                        </div>
                    </div>
                    <span class="status-badge ${a.status === 'pending' ? 'away' : a.status === 'accepted' ? 'online' : 'offline'}">${statusLabels[a.status]}</span>
                </div>
                <div class="app-card-answers">
                    <div class="app-answer">
                        <div class="app-answer-q">MilSim-Erfahrung</div>
                        <div class="app-answer-a">${a.answers.exp}</div>
                    </div>
                    <div class="app-answer">
                        <div class="app-answer-q">Warum die Shadow Company?</div>
                        <div class="app-answer-a">${a.answers.why}</div>
                    </div>
                    <div class="app-answer">
                        <div class="app-answer-q">Online-Zeit</div>
                        <div class="app-answer-a">${a.answers.hours}</div>
                    </div>
                </div>
                ${a.status === 'pending' ? `
                <div class="app-card-actions">
                    <button class="app-btn-accept" data-app="${a.id}"><i class="fas fa-check"></i> Annehmen</button>
                    <button class="app-btn-reject" data-app="${a.id}"><i class="fas fa-xmark"></i> Ablehnen</button>
                </div>` : ''}
            </div>
        `).join('');

        list.querySelectorAll('.app-btn-accept').forEach(btn => {
            btn.addEventListener('click', () => {
                const app = APPLICATIONS.find(a => a.id === parseInt(btn.dataset.app));
                if (app) {
                    app.status = 'accepted';
                    MEMBERS.push({ id: Date.now(), name: app.name, avatar: app.avatar, rank: 'recruit', status: 'offline', joined: 'Heute', lastActive: 'Gerade eben' });
                    showToast(`${app.name} wurde in die Kompanie aufgenommen!`, 'success');
                    renderApplications(document.getElementById('appFilter').value);
                    updateStats();
                }
            });
        });

        list.querySelectorAll('.app-btn-reject').forEach(btn => {
            btn.addEventListener('click', () => {
                const app = APPLICATIONS.find(a => a.id === parseInt(btn.dataset.app));
                if (app) {
                    app.status = 'rejected';
                    showToast(`Bewerbung von ${app.name} abgelehnt`, 'warning');
                    renderApplications(document.getElementById('appFilter').value);
                }
            });
        });
    }

    const appFilter = document.getElementById('appFilter');
    if (appFilter) {
        appFilter.addEventListener('change', () => renderApplications(appFilter.value));
    }

    // ─── Activity Tracker ───────────────────────────────────────

    function renderActivity() {
        const grid = document.getElementById('activityTrackerGrid');
        if (!grid) return;

        const sorted = [...MEMBERS].sort((a, b) => (MEMBER_ACTIVITY[b.id] || 0) - (MEMBER_ACTIVITY[a.id] || 0));
        const maxHours = 40;

        grid.innerHTML = sorted.map(m => {
            const hours = MEMBER_ACTIVITY[m.id] || 0;
            const pct = Math.min((hours / maxHours) * 100, 100);
            const level = hours >= 20 ? 'high' : hours >= 10 ? 'medium' : 'low';
            const trend = hours >= 20 ? '↑' : hours >= 10 ? '→' : '↓';
            const trendColor = level === 'high' ? 'var(--green)' : level === 'medium' ? 'var(--gold)' : 'var(--red)';

            return `
            <div class="activity-track-card">
                <img src="${avatarUrl(m.avatar, RANK_COLORS[m.rank])}" alt="">
                <div class="activity-track-name">${m.name}</div>
                <div class="activity-bar-container">
                    <div class="activity-bar-bg">
                        <div class="activity-bar-fill ${level}" style="width: ${pct}%"></div>
                    </div>
                </div>
                <span class="activity-hours ${level}">${hours}h</span>
                <span class="activity-trend-icon" style="color:${trendColor}">${trend}</span>
            </div>`;
        }).join('');
    }

    // ─── Profile Dropdown ────────────────────────────────────────

    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileToggle) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileToggle.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target)) {
                profileToggle.classList.remove('open');
            }
        });

        if (profileDropdown) {
            profileDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            profileDropdown.querySelectorAll('.profile-dd-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    if (action) {
                        profileToggle.classList.remove('open');
                        document.querySelector(`[data-page="${action}"]`)?.click();
                    }
                });
            });
        }
    }

    // ─── AGA Countdown Timer ──────────────────────────────────────

    const AGA_DATE = new Date('2026-04-05T19:00:00');

    function updateAgaCountdown() {
        const now = new Date();
        const diff = AGA_DATE - now;

        if (diff <= 0) {
            const timer = document.getElementById('agaCountdown');
            if (timer) timer.textContent = 'Event läuft!';
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        document.getElementById('agaCdDays').textContent = String(d).padStart(2, '0');
        document.getElementById('agaCdHours').textContent = String(h).padStart(2, '0');
        document.getElementById('agaCdMins').textContent = String(m).padStart(2, '0');
        document.getElementById('agaCdSecs').textContent = String(s).padStart(2, '0');
    }

    updateAgaCountdown();
    setInterval(updateAgaCountdown, 1000);

    // ─── AGA Dropdown Toggles ────────────────────────────────────

    document.querySelectorAll('.aga-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const dropdown = btn.closest('.aga-dropdown');
            dropdown.classList.toggle('open');
        });
    });

    // ─── AGA Event Buttons ────────────────────────────────────────

    const agaEquipmentBtn = document.getElementById('agaEquipmentBtn');
    const agaScheduleBtn = document.getElementById('agaScheduleBtn');
    const agaRulesBtn = document.getElementById('agaRulesBtn');
    const agaSignupBtn = document.getElementById('agaSignupBtn');

    if (agaEquipmentBtn) agaEquipmentBtn.addEventListener('click', () => openModal('equipmentModal'));
    if (agaScheduleBtn) agaScheduleBtn.addEventListener('click', () => openModal('scheduleModal'));
    if (agaRulesBtn) agaRulesBtn.addEventListener('click', () => openModal('agaRulesModal'));
    if (agaSignupBtn) {
        agaSignupBtn.addEventListener('click', () => {
            agaSignupBtn.innerHTML = '<i class="fas fa-check-double"></i> Angemeldet!';
            agaSignupBtn.style.background = 'var(--green-bg)';
            agaSignupBtn.style.color = 'var(--green)';
            agaSignupBtn.style.border = '1px solid var(--green)';
            agaSignupBtn.style.boxShadow = 'none';
            agaSignupBtn.disabled = true;
            showToast('Du bist für die AGA angemeldet!', 'success');
        });
    }

    // ─── Initial Render ──────────────────────────────────────────

    function init() {
        renderActivities();
        renderOnlineMembers();
        renderAnnouncements();
        renderChatMessages();
        renderChatMembers();
        renderMembers();
        renderInvites();
        renderRanks();
        renderEvents();
        renderPolls();
        renderApplications();
        renderActivity();
        updateStats();
    }

    init();

})();
