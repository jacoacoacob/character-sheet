
CREATE TABLE IF NOT EXISTS character_delta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    character_id INTEGER,
    message TEXT, -- Serialises to String
    field_diffs TEXT, -- Serializes to FieldDiffs
    FOREIGN KEY (character_id) REFERENCES character(id)
);
