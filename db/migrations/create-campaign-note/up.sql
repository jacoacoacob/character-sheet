
CREATE TABLE IF NOT EXISTS campaign_note (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    character_id INTEGER,
    message TEXT,
    FOREIGN KEY (character_id) REFERENCES character(id)
);
