// HUMA - Base de données
// Application de suivi du bien-être et feedback
// Diagramme compatible avec dbdiagram.io

Table organizations {
  id uuid [pk]
  name varchar(255) [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Organisations (entreprises)'
}

Table teams {
  id uuid [pk]
  organization_id uuid [not null, ref: > organizations.id]
  name varchar(255) [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Équipes au sein d\'une organisation'
}

Table users {
  id uuid [pk]
  organization_id uuid [not null, ref: > organizations.id]
  email varchar(255) [unique, not null]
  role varchar(50) [not null, note: 'employee, manager, director, admin']
  first_name varchar(255)
  last_name varchar(255)
  is_active boolean [default: true]
  onboarding_completed boolean [default: false]
  work_style varchar(50) [note: 'Collaboratif, Autonome, Structuré, Flexible']
  motivation_type varchar(50) [note: 'Reconnaissance, Apprentissage, Impact, Équilibre']
  stress_source varchar(50) [note: 'Charge de travail, Relations, Incertitude, Délais']
  current_level int [default: 1]
  total_xp int [default: 0]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Utilisateurs (collaborateurs et responsables)'
}

Table team_members {
  id uuid [pk]
  team_id uuid [not null, ref: > teams.id]
  user_id uuid [not null, ref: > users.id]
  joined_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (team_id, user_id) [unique]
  }
  
  Note: 'Appartenance des utilisateurs aux équipes'
}

Table mood_checkins {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  team_id uuid [not null, ref: > teams.id]
  score int [not null, note: '1-10']
  mood_label varchar(50) [not null]
  is_anonymous boolean [default: true]
  checkin_date date [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    user_id
    team_id
    checkin_date
    (user_id, checkin_date)
    (team_id, checkin_date)
  }
  
  Note: 'Check-ins d\'humeur quotidiens (anonymisés)'
}

Table mood_feelings {
  id uuid [pk]
  checkin_id uuid [not null, ref: > mood_checkins.id]
  feeling varchar(100) [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Tags de ressenti associés aux check-ins'
}

Table question_themes {
  id uuid [pk]
  theme_key varchar(100) [unique, not null]
  theme_name varchar(255) [not null]
  theme_description text
  icon varchar(50)
  sort_order int
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Thèmes des questions périodiques (Charge/Rythme, Relations, Sens, etc.)'
}

Table questions {
  id uuid [pk]
  theme_id uuid [not null, ref: > question_themes.id]
  question_text text [not null]
  question_number int [not null]
  frequency varchar(50) [not null, note: 'H=Hebdo, M=Mensuel, 2x/M=Bi-mensuel']
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Questions périodiques du questionnaire (35 questions réparties sur 7 thèmes)'
}

Table question_responses {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  team_id uuid [not null, ref: > teams.id]
  question_id uuid [not null, ref: > questions.id]
  response_value int [not null, note: '1-5']
  response_date date [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    user_id
    team_id
    response_date
  }
  
  Note: 'Réponses aux questions périodiques'
}

Table feedbacks {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  team_id uuid [not null, ref: > teams.id]
  theme_id uuid [ref: > question_themes.id]
  title varchar(255)
  feedback_text text [not null]
  solution_text text [not null]
  status varchar(50) [default: 'pending', note: 'pending, vu, en_cours, resolu, archive']
  is_anonymous boolean [default: true]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    user_id
    team_id
    status
    theme_id
  }
  
  Note: 'Boîte à remarques / feedbacks (obligatoirement avec solution)'
}

Table feedback_ai_analysis {
  id uuid [pk]
  feedback_id uuid [not null, ref: > feedbacks.id]
  detected_theme varchar(255)
  sentiment varchar(50) [note: 'positive, neutral, negative']
  summary text
  keywords text
  priority_score int [note: '1-10']
  analyzed_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Analyse IA des feedbacks (thème, sentiment, mots-clés, priorité)'
}

Table badges {
  id uuid [pk]
  name varchar(255) [not null]
  description text
  icon varchar(255)
  xp_required int [not null]
  badge_type varchar(50) [note: 'participation, streak, feedback, level, special']
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Définition des badges disponibles'
}

Table user_badges {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  badge_id uuid [not null, ref: > badges.id]
  earned_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (user_id, badge_id) [unique]
  }
  
  Note: 'Badges obtenus par les utilisateurs'
}

Table daily_tips {
  id uuid [pk]
  title varchar(255) [not null]
  content text [not null]
  theme_id uuid [ref: > question_themes.id]
  target_mood_range varchar(50) [note: 'low, medium, high']
  is_active boolean [default: true]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Conseils du jour générés/personnalisés'
}

Table user_tips {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  tip_id uuid [not null, ref: > daily_tips.id]
  assigned_date date [not null]
  is_read boolean [default: false]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  Note: 'Conseils attribués aux utilisateurs'
}

Table qvt_scores {
  id uuid [pk]
  team_id uuid [not null, ref: > teams.id]
  score_date date [not null]
  global_score decimal(4,2) [note: '0-10']
  charge_rythme_score decimal(4,2)
  relations_ambiance_score decimal(4,2)
  sens_motivation_score decimal(4,2)
  organisation_management_score decimal(4,2)
  reconnaissance_feedback_score decimal(4,2)
  equilibre_vie_score decimal(4,2)
  locaux_materiel_score decimal(4,2)
  participant_count int
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (team_id, score_date) [unique]
    team_id
    score_date
  }
  
  Note: 'Scores QVT (Qualité de Vie au Travail) agrégés par équipe'
}

Table ai_insights {
  id uuid [pk]
  team_id uuid [not null, ref: > teams.id]
  insight_type varchar(50) [note: 'trend, alert, suggestion, pattern']
  title varchar(255) [not null]
  description text
  severity varchar(50) [note: 'info, warning, critical']
  data text [note: 'JSONB - Données complémentaires structurées']
  is_acknowledged boolean [default: false]
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    team_id
    insight_type
  }
  
  Note: 'Insights et alertes générées par l\'IA'
}

Table user_settings {
  id uuid [pk]
  user_id uuid [unique, not null, ref: > users.id]
  
  daily_reminder_enabled boolean [default: true]
  monthly_summary_enabled boolean [default: true]
  ai_insights_enabled boolean [default: true]
  team_weather_enabled boolean [default: false]
  preferred_notification_time varchar(20) [default: '9h00', note: '9h00, 17h00, 14h00']
  
  ai_recommendations_enabled boolean [default: true]
  team_comparison_enabled boolean [default: true]
  monthly_goals_enabled boolean [default: false]
  
  allow_anonymous_feedback boolean [default: true]
  share_mood_with_team boolean [default: true]
  
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    user_id
  }
  
  Note: 'Paramètres de compte utilisateur (notifications, personnalisation, confidentialité)'
}

Table notifications {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  notification_type varchar(50) [not null]
  title varchar(255) [not null]
  message text
  is_read boolean [default: false]
  link_url varchar(500)
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    user_id
    is_read
  }
  
  Note: 'Notifications pour les utilisateurs et managers'
}