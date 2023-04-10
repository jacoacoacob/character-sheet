use serde::{Serialize, Deserialize};

use super::field_diff::FieldDiffs;

#[derive(Default, Serialize, Deserialize)]
pub struct CharacterDelta {
    pub id: usize,
    pub character_id: usize,
    pub message: String,
    pub field_diffs: FieldDiffs,
}

