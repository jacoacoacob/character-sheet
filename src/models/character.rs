use serde::{Serialize, Deserialize};

use super::character_data::CharacterData;

#[derive(Default, Serialize, Deserialize)]
pub struct Character {
    pub id: usize,
    pub data: CharacterData,
}
