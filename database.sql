-- ==============================================
-- HUMA - Base de données
-- Application de suivi du bien-être et feedback
-- ==============================================

-- ==============================================
-- TABLE: organizations
-- Organisations (entreprises)
-- ==============================================
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: teams
-- Équipes au sein d'une organisation
-- ==============================================
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: users
-- Utilisateurs (collaborateurs et responsables)
-- ==============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('employee', 'manager', 'director', 'admin')),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    work_style VARCHAR(50) CHECK (work_style IN ('Collaboratif', 'Autonome', 'Structuré', 'Flexible')),
    motivation_type VARCHAR(50) CHECK (motivation_type IN ('Reconnaissance', 'Apprentissage', 'Impact', 'Équilibre')),
    stress_source VARCHAR(50) CHECK (stress_source IN ('Charge de travail', 'Relations', 'Incertitude', 'Délais')),
    current_level INT DEFAULT 1,
    total_xp INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: team_members
-- Appartenance des utilisateurs aux équipes
-- ==============================================
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, user_id)
);

-- ==============================================
-- TABLE: mood_checkins
-- Check-ins d'humeur quotidiens (anonymisés)
-- ==============================================
CREATE TABLE mood_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score BETWEEN 1 AND 10),
    mood_label VARCHAR(50) NOT NULL,
    is_anonymous BOOLEAN DEFAULT TRUE,
    checkin_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: mood_feelings
-- Tags de ressenti associés aux check-ins
-- ==============================================
CREATE TABLE mood_feelings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checkin_id UUID NOT NULL REFERENCES mood_checkins(id) ON DELETE CASCADE,
    feeling VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: question_themes
-- Thèmes des questions périodiques
-- ==============================================
CREATE TABLE question_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_key VARCHAR(100) UNIQUE NOT NULL,
    theme_name VARCHAR(255) NOT NULL,
    theme_description TEXT,
    icon VARCHAR(50),
    sort_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des 7 thèmes principaux
INSERT INTO question_themes (theme_key, theme_name, theme_description, icon, sort_order) VALUES
    ('charge_rythme', 'Charge / Rythme de travail', 'Questions sur la charge de travail et le rythme', '⚡', 1),
    ('relations_ambiance', 'Relations / Ambiance / Coopération', 'Questions sur les relations et l''ambiance d''équipe', '🤝', 2),
    ('sens_motivation', 'Sens / Motivation / Engagement', 'Questions sur le sens du travail et la motivation', '🎯', 3),
    ('organisation_management', 'Organisation / Clarté / Management', 'Questions sur l''organisation et le management', '📋', 4),
    ('reconnaissance_feedback', 'Reconnaissance / Feedback / Développement', 'Questions sur la reconnaissance et le développement', '⭐', 5),
    ('equilibre_vie', 'Équilibre vie pro / perso', 'Questions sur l''équilibre vie professionnelle et personnelle', '⚖️', 6),
    ('locaux_materiel', 'Locaux / Matériel / Environnement physique', 'Questions sur les conditions matérielles de travail', '🏢', 7);

-- ==============================================
-- TABLE: questions
-- Questions périodiques du questionnaire
-- ==============================================
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_id UUID NOT NULL REFERENCES question_themes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_number INT NOT NULL,
    frequency VARCHAR(50) NOT NULL CHECK (frequency IN ('H', 'M', '2x/M')), -- H=Hebdo, M=Mensuel, 2x/M=Bi-mensuel
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de quelques exemples de questions pour chaque thème
INSERT INTO questions (theme_id, question_text, question_number, frequency) VALUES
    -- Charge / Rythme de travail
    ((SELECT id FROM question_themes WHERE theme_key = 'charge_rythme'), 'Est-ce que ta charge de travail te semble adaptée au temps que tu as pour tout faire ?', 1, 'H'),
    ((SELECT id FROM question_themes WHERE theme_key = 'charge_rythme'), 'Arrives-tu généralement à terminer ce que tu as à faire dans les délais ?', 2, 'H'),
    ((SELECT id FROM question_themes WHERE theme_key = 'charge_rythme'), 'Ton rythme de travail te paraît-il soutenable sur la durée ?', 3, 'H'),
    ((SELECT id FROM question_themes WHERE theme_key = 'charge_rythme'), 'Penses-tu avoir assez de moments pour souffler dans ta journée ?', 4, 'H'),
    ((SELECT id FROM question_themes WHERE theme_key = 'charge_rythme'), 'As-tu souvent l''impression d''être en surcharge mentale ou émotionnelle ?', 5, 'H'),
    
    -- Relations / Ambiance
    ((SELECT id FROM question_themes WHERE theme_key = 'relations_ambiance'), 'Comment tu ressens la qualité de tes relations avec tes collègues en ce moment ?', 1, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'relations_ambiance'), 'Quand tu rencontres une difficulté, te sens-tu soutenu(e) par ton équipe ?', 2, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'relations_ambiance'), 'Comment qualifierais-tu l''ambiance générale dans ton service ?', 3, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'relations_ambiance'), 'Selon toi, les situations de tension ou de conflit sont-elles bien gérées ?', 4, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'relations_ambiance'), 'Te sens-tu respecté(e) et réellement écouté(e) dans ton travail ?', 5, '2x/M'),
    
    -- Sens / Motivation
    ((SELECT id FROM question_themes WHERE theme_key = 'sens_motivation'), 'Est-ce que l''utilité de ton travail te paraît claire ?', 1, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'sens_motivation'), 'As-tu le sentiment que ton travail a du sens pour toi ?', 2, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'sens_motivation'), 'Comment tu te sens en termes de motivation en ce moment ?', 3, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'sens_motivation'), 'Penses-tu contribuer de manière positive aux objectifs de ton organisation ?', 4, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'sens_motivation'), 'Es-tu fier/fière du travail que tu accomplis au quotidien ?', 5, 'M'),
    
    -- Organisation / Management
    ((SELECT id FROM question_themes WHERE theme_key = 'organisation_management'), 'Selon toi, les rôles et responsabilités de chacun sont-ils bien définis ?', 1, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'organisation_management'), 'Reçois-tu les informations dont tu as besoin pour travailler sereinement ?', 2, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'organisation_management'), 'Les décisions prises par ton management te paraissent-elles compréhensibles ?', 3, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'organisation_management'), 'Les objectifs qu''on te fixe te semblent-ils réalistes ?', 4, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'organisation_management'), 'Comment tu trouves le fonctionnement des processus internes ?', 5, 'M'),
    
    -- Reconnaissance / Feedback
    ((SELECT id FROM question_themes WHERE theme_key = 'reconnaissance_feedback'), 'Te sens-tu reconnu(e) pour le travail que tu fournis ?', 1, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'reconnaissance_feedback'), 'Reçois-tu suffisamment de retours sur ton travail pour pouvoir progresser ?', 2, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'reconnaissance_feedback'), 'As-tu l''impression que tes compétences sont valorisées ?', 3, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'reconnaissance_feedback'), 'Est-ce que tu as accès à des opportunités pour évoluer ou te former ?', 4, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'reconnaissance_feedback'), 'As-tu le sentiment que ton/ta manager exprime de la considération pour ton travail ?', 5, '2x/M'),
    
    -- Équilibre vie pro/perso
    ((SELECT id FROM question_themes WHERE theme_key = 'equilibre_vie'), 'Arrives-tu à trouver un bon équilibre entre ton travail et ta vie perso ?', 1, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'equilibre_vie'), 'As-tu suffisamment de temps pour tes activités en dehors du travail ?', 2, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'equilibre_vie'), 'Ton organisation de travail te laisse-t-elle un minimum de flexibilité ?', 3, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'equilibre_vie'), 'Ta charge de travail déborde-t-elle sur ton temps personnel ?', 4, 'H'),
    ((SELECT id FROM question_themes WHERE theme_key = 'equilibre_vie'), 'Si tu fais du télétravail : est-ce que les conditions actuelles te conviennent ?', 5, 'M'),
    
    -- Locaux / Matériel
    ((SELECT id FROM question_themes WHERE theme_key = 'locaux_materiel'), 'As-tu tout le matériel nécessaire pour bien travailler au quotidien ?', 1, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'locaux_materiel'), 'Comment trouves-tu tes locaux de travail en termes de confort et d''adaptation ?', 2, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'locaux_materiel'), 'Ton poste de travail te semble-t-il ergonomique ?', 3, 'M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'locaux_materiel'), 'Ton environnement de travail te permet-il de te concentrer facilement ?', 4, '2x/M'),
    ((SELECT id FROM question_themes WHERE theme_key = 'locaux_materiel'), 'Trouves-tu les équipements (informatique, outils…) satisfaisants ?', 5, 'M');

-- ==============================================
-- TABLE: question_responses
-- Réponses aux questions périodiques
-- ==============================================
CREATE TABLE question_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    response_value INT NOT NULL CHECK (response_value BETWEEN 1 AND 5),
    response_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: feedbacks
-- Boîte à remarques / feedbacks
-- ==============================================
CREATE TABLE feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES question_themes(id) ON DELETE SET NULL,
    title VARCHAR(255),
    feedback_text TEXT NOT NULL,
    solution_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'vu', 'en_cours', 'resolu', 'archive')),
    is_anonymous BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: feedback_ai_analysis
-- Analyse IA des feedbacks
-- ==============================================
CREATE TABLE feedback_ai_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE,
    detected_theme VARCHAR(255),
    sentiment VARCHAR(50) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    summary TEXT,
    keywords TEXT[], -- Array de mots-clés
    priority_score INT CHECK (priority_score BETWEEN 1 AND 10),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: badges
-- Définition des badges disponibles
-- ==============================================
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    xp_required INT NOT NULL,
    badge_type VARCHAR(50) CHECK (badge_type IN ('participation', 'streak', 'feedback', 'level', 'special')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de quelques badges de base
INSERT INTO badges (name, description, icon, xp_required, badge_type) VALUES
    ('Premier pas', 'Compléter ton premier check-in', '🌱', 10, 'participation'),
    ('Régularité', 'Une semaine complète de check-ins', '🔥', 50, 'streak'),
    ('Contributeur', 'Soumettre ton premier feedback', '💡', 25, 'feedback'),
    ('Niveau 5', 'Atteindre le niveau 5', '⭐', 400, 'level'),
    ('Ambassadeur', 'Aider l''équipe à progresser', '👑', 1000, 'special');

-- ==============================================
-- TABLE: user_badges
-- Badges obtenus par les utilisateurs
-- ==============================================
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- ==============================================
-- TABLE: daily_tips
-- Conseils du jour générés/personnalisés
-- ==============================================
CREATE TABLE daily_tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    theme_id UUID REFERENCES question_themes(id) ON DELETE SET NULL,
    target_mood_range VARCHAR(50), -- ex: 'low', 'medium', 'high'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: user_tips
-- Conseils attribués aux utilisateurs
-- ==============================================
CREATE TABLE user_tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tip_id UUID NOT NULL REFERENCES daily_tips(id) ON DELETE CASCADE,
    assigned_date DATE NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: qvt_scores
-- Scores QVT (Qualité de Vie au Travail) agrégés
-- ==============================================
CREATE TABLE qvt_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    score_date DATE NOT NULL,
    global_score DECIMAL(4,2) CHECK (global_score BETWEEN 0 AND 10),
    charge_rythme_score DECIMAL(4,2),
    relations_ambiance_score DECIMAL(4,2),
    sens_motivation_score DECIMAL(4,2),
    organisation_management_score DECIMAL(4,2),
    reconnaissance_feedback_score DECIMAL(4,2),
    equilibre_vie_score DECIMAL(4,2),
    locaux_materiel_score DECIMAL(4,2),
    participant_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, score_date)
);

-- ==============================================
-- TABLE: ai_insights
-- Insights et alertes générées par l'IA
-- ==============================================
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) CHECK (insight_type IN ('trend', 'alert', 'suggestion', 'pattern')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(50) CHECK (severity IN ('info', 'warning', 'critical')),
    data JSONB, -- Données complémentaires structurées
    is_acknowledged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: user_settings
-- Paramètres de compte utilisateur
-- ==============================================
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notifications & Rappels
    daily_reminder_enabled BOOLEAN DEFAULT TRUE,
    monthly_summary_enabled BOOLEAN DEFAULT TRUE,
    ai_insights_enabled BOOLEAN DEFAULT TRUE,
    team_weather_enabled BOOLEAN DEFAULT FALSE,
    preferred_notification_time VARCHAR(20) DEFAULT '9h00', -- 9h00, 17h00, 14h00
    
    -- Personnalisation
    ai_recommendations_enabled BOOLEAN DEFAULT TRUE,
    team_comparison_enabled BOOLEAN DEFAULT TRUE,
    monthly_goals_enabled BOOLEAN DEFAULT FALSE,
    
    -- Préférences de confidentialité
    allow_anonymous_feedback BOOLEAN DEFAULT TRUE,
    share_mood_with_team BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- TABLE: notifications
-- Notifications pour les utilisateurs et managers
-- ==============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    link_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- INDEXES pour optimisation des requêtes
-- ==============================================

-- Index pour les recherches fréquentes
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_teams_organization ON teams(organization_id);
CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);

-- Index pour les check-ins (requêtes temporelles fréquentes)
CREATE INDEX idx_mood_checkins_user_date ON mood_checkins(user_id, checkin_date);
CREATE INDEX idx_mood_checkins_team_date ON mood_checkins(team_id, checkin_date);
CREATE INDEX idx_mood_checkins_date ON mood_checkins(checkin_date);

-- Index pour les feedbacks
CREATE INDEX idx_feedbacks_user ON feedbacks(user_id);
CREATE INDEX idx_feedbacks_team ON feedbacks(team_id);
CREATE INDEX idx_feedbacks_status ON feedbacks(status);
CREATE INDEX idx_feedbacks_theme ON feedbacks(theme_id);

-- Index pour les réponses aux questions
CREATE INDEX idx_question_responses_user ON question_responses(user_id);
CREATE INDEX idx_question_responses_team ON question_responses(team_id);
CREATE INDEX idx_question_responses_date ON question_responses(response_date);

-- Index pour les scores QVT
CREATE INDEX idx_qvt_scores_team_date ON qvt_scores(team_id, score_date);

-- Index pour les insights IA
CREATE INDEX idx_ai_insights_team ON ai_insights(team_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(insight_type);

-- Index pour les paramètres utilisateur
CREATE INDEX idx_user_settings_user ON user_settings(user_id);

-- Index pour les notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ==============================================
-- VUES UTILES
-- ==============================================

-- Vue: Participation des utilisateurs (7 derniers jours)
CREATE VIEW v_user_participation_week AS
SELECT 
    u.id as user_id,
    u.email,
    t.id as team_id,
    t.name as team_name,
    COUNT(mc.id) as checkins_count,
    AVG(mc.score) as avg_mood_score
FROM users u
JOIN team_members tm ON u.id = tm.user_id
JOIN teams t ON tm.team_id = t.id
LEFT JOIN mood_checkins mc ON u.id = mc.user_id 
    AND mc.checkin_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY u.id, u.email, t.id, t.name;

-- Vue: Statistiques équipe (mois en cours)
CREATE VIEW v_team_stats_month AS
SELECT 
    t.id as team_id,
    t.name as team_name,
    COUNT(DISTINCT mc.user_id) as active_users,
    COUNT(mc.id) as total_checkins,
    AVG(mc.score) as avg_mood_score,
    COUNT(DISTINCT mc.checkin_date) as days_with_checkins
FROM teams t
LEFT JOIN mood_checkins mc ON t.id = mc.team_id 
    AND EXTRACT(MONTH FROM mc.checkin_date) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM mc.checkin_date) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY t.id, t.name;

-- Vue: Feedbacks par statut et thème
CREATE VIEW v_feedbacks_summary AS
SELECT 
    t.id as team_id,
    t.name as team_name,
    qt.theme_name,
    f.status,
    COUNT(f.id) as feedback_count
FROM teams t
LEFT JOIN feedbacks f ON t.id = f.team_id
LEFT JOIN question_themes qt ON f.theme_id = qt.id
GROUP BY t.id, t.name, qt.theme_name, f.status;

-- ==============================================
-- FONCTIONS UTILES
-- ==============================================

-- Fonction: Calculer le niveau et XP d'un utilisateur
CREATE OR REPLACE FUNCTION calculate_user_level(user_xp INT)
RETURNS INT AS $$
BEGIN
    -- Progression: Niveau = sqrt(XP / 100)
    -- Niveau 1 = 0-99 XP, Niveau 2 = 100-399 XP, Niveau 3 = 400-899 XP, etc.
    RETURN GREATEST(1, FLOOR(SQRT(user_xp / 100.0)) + 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction: Mettre à jour le niveau d'un utilisateur après gain d'XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
    NEW.current_level = calculate_user_level(NEW.total_xp);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-mise à jour du niveau
CREATE TRIGGER trigger_update_user_level
BEFORE UPDATE OF total_xp ON users
FOR EACH ROW
EXECUTE FUNCTION update_user_level();

-- Fonction: Attribuer XP pour un check-in
CREATE OR REPLACE FUNCTION award_xp_for_checkin()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET total_xp = total_xp + 10 
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: XP automatique sur check-in
CREATE TRIGGER trigger_award_xp_checkin
AFTER INSERT ON mood_checkins
FOR EACH ROW
EXECUTE FUNCTION award_xp_for_checkin();

-- Fonction: Attribuer XP pour un feedback
CREATE OR REPLACE FUNCTION award_xp_for_feedback()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET total_xp = total_xp + 25 
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: XP automatique sur feedback
CREATE TRIGGER trigger_award_xp_feedback
AFTER INSERT ON feedbacks
FOR EACH ROW
EXECUTE FUNCTION award_xp_for_feedback();

-- ==============================================
-- DONNÉES DE TEST (optionnel)
-- ==============================================

-- Création d'une organisation de test
INSERT INTO organizations (id, name) VALUES
    ('00000000-0000-0000-0000-000000000001', 'ACME Corp');

-- Création d'équipes de test
INSERT INTO teams (id, organization_id, name) VALUES
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Équipe Développement'),
    ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Équipe Marketing');

-- Création d'utilisateurs de test
INSERT INTO users (id, organization_id, email, role, first_name, last_name, onboarding_completed, work_style, motivation_type, stress_source) VALUES
    ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'john.doe@acme.com', 'employee', 'John', 'Doe', true, 'Autonome', 'Impact', 'Charge de travail'),
    ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'jane.smith@acme.com', 'employee', 'Jane', 'Smith', true, 'Collaboratif', 'Reconnaissance', 'Relations'),
    ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'manager@acme.com', 'manager', 'Alice', 'Manager', true, 'Structuré', 'Équilibre', 'Délais');

-- Ajout des membres aux équipes
INSERT INTO team_members (team_id, user_id) VALUES
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201'),
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202'),
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000203');

-- Création des paramètres par défaut pour les utilisateurs de test
INSERT INTO user_settings (user_id, daily_reminder_enabled, monthly_summary_enabled, ai_insights_enabled, team_weather_enabled, preferred_notification_time) VALUES
    ('00000000-0000-0000-0000-000000000201', true, true, true, false, '9h00'),
    ('00000000-0000-0000-0000-000000000202', true, true, true, true, '17h00'),
    ('00000000-0000-0000-0000-000000000203', true, true, true, true, '14h00');

-- ==============================================
-- NOTES D'IMPLÉMENTATION
-- ==============================================

/*
ANONYMISATION ET CONFIDENTIALITÉ:
- Les données des check-ins sont marquées avec is_anonymous
- Les données agrégées (qvt_scores, ai_insights) ne contiennent pas d'identifiants individuels
- Pour le dashboard des managers: utiliser les vues et tables agrégées uniquement

GAMIFICATION:
- Système XP: +10 par check-in, +25 par feedback
- Niveau calculé automatiquement via trigger
- Badges débloqués selon critères (participation, streaks, etc.)

IA ET ANALYSE:
- feedback_ai_analysis: stocke les analyses IA des feedbacks
- ai_insights: génère des alertes/tendances pour les managers
- Implémenter les algorithmes d'analyse côté backend

FRÉQUENCE DES QUESTIONS:
- Scheduler côté backend pour proposer les bonnes questions selon leur fréquence (H/M/2x/M)
- Eviter de surcharger les utilisateurs: rotation intelligente des questions

PERFORMANCE:
- Index créés sur les colonnes les plus requêtées
- Vues matérialisées possibles pour les dashboards (à créer selon besoin)
- Partitionnement possible sur mood_checkins si volume très important

EXTENSIONS FUTURES POSSIBLES:
- Ajout de notifications push (integration avec Teams/Slack)
- Export de rapports (table reports)
- Historique des modifications (audit_logs)
- Commentaires sur les feedbacks (feedback_comments)
- Actions suggérées par l'IA (ai_suggestions)
*/