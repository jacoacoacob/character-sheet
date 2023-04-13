use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use crate::markdown::html_from_markdown;

use super::character_data::{CharacterData, Ability, Proficiency, Markdown};

#[derive(Serialize, Deserialize, Clone, PartialEq)]
pub enum FieldValue {
    String(String),
    Num(isize),
    Proficiency(Proficiency),
    Ability(Ability),
    Markdown(Markdown),
}

impl From<Option<Ability>> for FieldValue {
    fn from(value: Option<Ability>) -> Self {
        FieldValue::Ability(value.unwrap_or_default())
    }
}

impl From<Option<Markdown>> for FieldValue {
    fn from(value: Option<Markdown>) -> Self {
        FieldValue::Markdown(value.unwrap_or_default())
    }
}

impl From<Option<Proficiency>> for FieldValue {
    fn from(value: Option<Proficiency>) -> Self {
        FieldValue::Proficiency(value.unwrap_or_default())
    }
}

impl From<Option<isize>> for FieldValue {
    fn from(value: Option<isize>) -> Self {
        FieldValue::Num(value.unwrap_or_default())
    }
}

impl From<Option<String>> for FieldValue {
    fn from(value: Option<String>) -> Self {
        FieldValue::String(value.unwrap_or_default())
    }
}


#[derive(Serialize, Deserialize, Clone)]
pub struct FieldDiff {
    pub field_name: String,
    pub old: Option<FieldValue>,
    pub new: FieldValue,
}

impl FieldDiff {
    fn new(field_name: &str, old: Option<FieldValue>, new: FieldValue) -> Self {
        FieldDiff {
            old,
            new,
            field_name: field_name.to_string(),
        }
    }
}

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct FieldDiffs {
    pub data: Vec<FieldDiff>,
}

impl From<(Option<CharacterData>, Option<CharacterData>)> for FieldDiffs {
    fn from(value: (Option<CharacterData>, Option<CharacterData>)) -> Self {
        let mut data = Vec::<FieldDiff>::new();

        match value {
            (Some(old), Some(new)) => {
                let old = HashMap::from(old);
                let mut new = HashMap::from(new);
                new.entry("notes".to_string()).and_modify(|value| match value {
                    FieldValue::Markdown(markdown) => {
                        markdown.html = html_from_markdown(&markdown.source);
                    },
                    _ => {}
                });
                for field_name in old.keys() {
                    let old = old.get(field_name).unwrap().clone();
                    let new = new.get(field_name).unwrap().clone();
                    if old != new {
                        data.push(FieldDiff::new(field_name, Some(old), new));
                    }
                }
            }
            (None, Some(new)) => {
                let mut new = HashMap::from(new);
                new.entry("notes".to_string()).and_modify(|value| match value {
                    FieldValue::Markdown(markdown) => {
                        markdown.html = html_from_markdown(&markdown.source);
                    },
                    _ => {}
                });
                for field_name in new.keys() {
                    let new = new.get(field_name).unwrap().clone();
                    data.push(FieldDiff::new(field_name, None, new));
                }
            }
            _ => {}
        };

        FieldDiffs { data }
    }
}
