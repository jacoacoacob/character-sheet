use serde::{Serialize, Deserialize};

use super::character_data::CharacterData;

#[derive(Default, Serialize, Deserialize)]
pub struct Character {
    pub id: String,
    pub data: CharacterData,
}
