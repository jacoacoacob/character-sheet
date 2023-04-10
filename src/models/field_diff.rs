use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use super::character_data::CharacterData;

#[derive(Serialize, Deserialize, Clone)]
pub struct FieldDiff {
    pub field_name: String,
    pub old: Option<String>,
    pub new: String,
}

impl FieldDiff {
    fn new(field_name: &str, old: Option<String>, new: String) -> Self {
        FieldDiff {
            old,
            new,
            field_name: field_name.to_string(),
        }
    }
}

#[derive(Default, Serialize, Deserialize)]
pub struct FieldDiffs {
    pub data: Vec<FieldDiff>,
}

impl From<(Option<CharacterData>, Option<CharacterData>)> for FieldDiffs {
    fn from(value: (Option<CharacterData>, Option<CharacterData>)) -> Self {
        let mut data = Vec::<FieldDiff>::new();

        match value {
            (Some(old), Some(new)) => {
                let old = HashMap::from(old);
                let new = HashMap::from(new);
                for field_name in old.keys() {
                    let old = old.get(field_name).unwrap().to_string();
                    let new = new.get(field_name).unwrap().to_string();
                    if old != new {
                        data.push(FieldDiff::new(field_name, Some(old), new));
                    }
                }
            }
            (None, Some(new)) => {
                let new = HashMap::from(new);
                for field_name in new.keys() {
                    let new = new.get(field_name).unwrap().to_string();
                    data.push(FieldDiff::new(field_name, None, new));
                }
            }
            _ => {}
        };

        FieldDiffs { data }
    }
}
