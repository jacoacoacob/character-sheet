use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};

use super::character_data::CharacterData;

#[derive(Default, Clone, Serialize, Deserialize)]
pub struct Character {
    pub id: String,
    pub data: CharacterData,
    pub updated: DateTime<Utc>,
}
