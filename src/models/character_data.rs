use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use super::character_delta::CharacterDelta;

#[derive(Default, Serialize, Deserialize, Clone, PartialEq)]
pub struct Proficiency {
    pub proficient: bool,
    pub modifier: String,
}

#[derive(Default, Serialize, Deserialize, Clone, PartialEq)]
pub struct Ability {
    pub score: String,
    pub modifier: String,
}

#[derive(Serialize, Deserialize, Clone, PartialEq)]
pub enum FieldValue {
    String(String),
    Proficiency(Proficiency),
    Ability(Ability),
}

#[derive(Default, Serialize, Deserialize)]
pub struct CharacterData {
    pub class: Option<String>,
    pub level: Option<String>,
    pub background: Option<String>,
    pub character_name: Option<String>,
    pub player_name: Option<String>,
    pub parentage: Option<String>,
    pub alignment: Option<String>,
    pub xp: Option<String>,
    pub ability_strength: Option<Ability>,
    pub ability_dexterity: Option<Ability>,
    pub ability_constitution: Option<Ability>,
    pub ability_intelligence: Option<Ability>,
    pub ability_wisdom: Option<Ability>,
    pub ability_charisma: Option<Ability>,
    pub inspiration: Option<String>,
    pub proficiency_bonus: Option<String>,
    pub saving_throw_strength: Option<Proficiency>,
    pub saving_throw_dexterity: Option<Proficiency>,
    pub saving_throw_constitution: Option<Proficiency>,
    pub saving_throw_intelligence: Option<Proficiency>,
    pub saving_throw_wisdom: Option<Proficiency>,
    pub saving_throw_charisma: Option<Proficiency>,
    pub death_save_fail: Option<String>,
    pub death_save_success: Option<String>,
    pub skill_acrobatics: Option<Proficiency>,
    pub skill_animal_handling: Option<Proficiency>,
    pub skill_arcana: Option<Proficiency>,
    pub skill_athletics: Option<Proficiency>,
    pub skill_deception: Option<Proficiency>,
    pub skill_history: Option<Proficiency>,
    pub skill_insight: Option<Proficiency>,
    pub skill_inimidation: Option<Proficiency>,
    pub skill_investigation: Option<Proficiency>,
    pub skill_medicine: Option<Proficiency>,
    pub skill_nature: Option<Proficiency>,
    pub skill_perception: Option<Proficiency>,
    pub skill_performance: Option<Proficiency>,
    pub skill_persuasion: Option<Proficiency>,
    pub skill_religion: Option<Proficiency>,
    pub skill_sleight_of_hand: Option<Proficiency>,
    pub skill_stealth: Option<Proficiency>,
    pub skill_survival: Option<Proficiency>,
    pub passive_wisdom: Option<String>,
    pub armor_class: Option<String>,
    pub initiative: Option<String>,
    pub speed: Option<String>,
    pub hit_point_max: Option<String>,
    pub hit_point_current: Option<String>,
    pub hit_point_temp: Option<String>,
    pub hit_dice: Option<String>,
    pub hit_dice_current: Option<String>,
    pub hit_dice_total: Option<String>,
    pub cp: Option<String>,
    pub sp: Option<String>,
    pub ep: Option<String>,
    pub gp: Option<String>,
    pub pp: Option<String>,
    pub equipment: Option<String>,
    pub personality_traits: Option<String>,
    pub ideals: Option<String>,
    pub bonds: Option<String>,
    pub flaws: Option<String>,
    pub features_and_traits: Option<String>,
}

impl From<Vec<CharacterDelta>> for CharacterData {
    fn from(value: Vec<CharacterDelta>) -> Self {
        let mut data = HashMap::<String, FieldValue>::new();

        for delta in value {
            for diff in delta.field_diffs.data {
                data.insert(diff.field_name, diff.new);
            }
        }

        let get_string = |field_name: &str| match &data.get(field_name) {
            Some(FieldValue::String(value)) => Some(value.to_string()),
            _ => None,
        };

        let get_ability = |field_name: &str| match &data.get(field_name) {
            Some(FieldValue::Ability(value)) => Some(value.clone()),
            _ => None,
        };

        let get_proficiency = |field_name: &str| match &data.get(field_name) {
            Some(FieldValue::Proficiency(value)) => Some(value.clone()),
            _ => None,
        };

        CharacterData {
            class: get_string("class"),
            level: get_string("level"),
            background: get_string("background"),
            character_name: get_string("character_name"),
            player_name: get_string("player_name"),
            parentage: get_string("parentage"),
            alignment: get_string("alignment"),
            xp: get_string("xp"),
            ability_strength: get_ability("ability_strength"),
            ability_dexterity: get_ability("ability_dexterity"),
            ability_constitution: get_ability("ability_constitution"),
            ability_intelligence: get_ability("ability_intelligence"),
            ability_wisdom: get_ability("ability_wisdom"),
            ability_charisma: get_ability("ability_charisma"),
            inspiration: get_string("inspiration"),
            proficiency_bonus: get_string("proficiency_bonus"),
            saving_throw_strength: get_proficiency("saving_throw_strength"),
            saving_throw_dexterity: get_proficiency("saving_throw_dexterity"),
            saving_throw_constitution: get_proficiency("saving_throw_constitution"),
            saving_throw_intelligence: get_proficiency("saving_throw_intelligence"),
            saving_throw_wisdom: get_proficiency("saving_throw_wisdom"),
            saving_throw_charisma: get_proficiency("saving_throw_charisma"),
            death_save_fail: get_string("death_save_fail"),
            death_save_success: get_string("death_save_success"),
            skill_acrobatics: get_proficiency("skill_acrobatics"),
            skill_animal_handling: get_proficiency("skill_animal_handling"),
            skill_arcana: get_proficiency("skill_arcana"),
            skill_athletics: get_proficiency("skill_athletics"),
            skill_deception: get_proficiency("skill_deception"),
            skill_history: get_proficiency("skill_history"),
            skill_insight: get_proficiency("skill_insight"),
            skill_inimidation: get_proficiency("skill_inimidation"),
            skill_investigation: get_proficiency("skill_investigation"),
            skill_medicine: get_proficiency("skill_medicine"),
            skill_nature: get_proficiency("skill_nature"),
            skill_perception: get_proficiency("skill_perception"),
            skill_performance: get_proficiency("skill_performance"),
            skill_persuasion: get_proficiency("skill_persuasion"),
            skill_religion: get_proficiency("skill_religion"),
            skill_sleight_of_hand: get_proficiency("skill_sleight_of_hand"),
            skill_stealth: get_proficiency("skill_stealth"),
            skill_survival: get_proficiency("skill_survival"),
            passive_wisdom: get_string("passive_wisdom"),
            armor_class: get_string("armor_class"),
            initiative: get_string("initiative"),
            speed: get_string("speed"),
            hit_point_max: get_string("hit_point_max"),
            hit_point_current: get_string("hit_point_current"),
            hit_point_temp: get_string("hit_point_temp"),
            hit_dice: get_string("hit_dice"),
            hit_dice_current: get_string("hit_dice_current"),
            hit_dice_total: get_string("hit_dice_total"),
            cp: get_string("cp"),
            sp: get_string("sp"),
            ep: get_string("ep"),
            gp: get_string("gp"),
            pp: get_string("pp"),
            equipment: get_string("equipment"),
            personality_traits: get_string("personality_traits"),
            ideals: get_string("ideals"),
            bonds: get_string("bonds"),
            flaws: get_string("flaws"),
            features_and_traits: get_string("features_and_traits"),
        }
    }
}

impl From<CharacterData> for HashMap<String, FieldValue> {
    fn from(value: CharacterData) -> Self {
        let mut data = HashMap::<String, FieldValue>::new();

        let fv_string = |v: Option<String>| FieldValue::String(v.unwrap_or_default());

        let fv_ability = |v: Option<Ability>| FieldValue::Ability(v.unwrap_or_default());

        let fv_proficiency =
            |v: Option<Proficiency>| FieldValue::Proficiency(v.unwrap_or_default());

        data.insert("class".to_string(), fv_string(value.class));
        data.insert("level".to_string(), fv_string(value.level));
        data.insert("background".to_string(), fv_string(value.background));
        data.insert(
            "character_name".to_string(),
            fv_string(value.character_name),
        );
        data.insert("player_name".to_string(), fv_string(value.player_name));
        data.insert("parentage".to_string(), fv_string(value.parentage));
        data.insert("alignment".to_string(), fv_string(value.alignment));
        data.insert("xp".to_string(), fv_string(value.xp));
        data.insert(
            "ability_strength".to_string(),
            fv_ability(value.ability_strength),
        );
        data.insert(
            "ability_dexterity".to_string(),
            fv_ability(value.ability_dexterity),
        );
        data.insert(
            "ability_constitution".to_string(),
            fv_ability(value.ability_constitution),
        );
        data.insert(
            "ability_intelligence".to_string(),
            fv_ability(value.ability_intelligence),
        );
        data.insert(
            "ability_wisdom".to_string(),
            fv_ability(value.ability_wisdom),
        );
        data.insert(
            "ability_charisma".to_string(),
            fv_ability(value.ability_charisma),
        );
        data.insert(
            "ability_inspiration".to_string(),
            fv_string(value.inspiration),
        );
        data.insert(
            "proficiency_bonus".to_string(),
            fv_string(value.proficiency_bonus),
        );
        data.insert(
            "saving_throw_strength".to_string(),
            fv_proficiency(value.saving_throw_strength),
        );
        data.insert(
            "saving_throw_dexterity".to_string(),
            fv_proficiency(value.saving_throw_dexterity),
        );
        data.insert(
            "saving_throw_constitution".to_string(),
            fv_proficiency(value.saving_throw_constitution),
        );
        data.insert(
            "saving_throw_intelligence".to_string(),
            fv_proficiency(value.saving_throw_intelligence),
        );
        data.insert(
            "saving_throw_wisdom".to_string(),
            fv_proficiency(value.saving_throw_wisdom),
        );
        data.insert(
            "saving_throw_charisma".to_string(),
            fv_proficiency(value.saving_throw_charisma),
        );
        data.insert(
            "death_save_fail".to_string(),
            fv_string(value.death_save_fail),
        );
        data.insert(
            "death_save_success".to_string(),
            fv_string(value.death_save_success),
        );
        data.insert(
            "skill_acrobatics".to_string(),
            fv_proficiency(value.skill_acrobatics),
        );
        data.insert(
            "skill_animal_handling".to_string(),
            fv_proficiency(value.skill_animal_handling),
        );
        data.insert(
            "skill_arcana".to_string(),
            fv_proficiency(value.skill_arcana),
        );
        data.insert(
            "skill_athletics".to_string(),
            fv_proficiency(value.skill_athletics),
        );
        data.insert(
            "skill_deception".to_string(),
            fv_proficiency(value.skill_deception),
        );
        data.insert(
            "skill_history".to_string(),
            fv_proficiency(value.skill_history),
        );
        data.insert(
            "skill_insight".to_string(),
            fv_proficiency(value.skill_insight),
        );
        data.insert(
            "skill_inimidation".to_string(),
            fv_proficiency(value.skill_inimidation),
        );
        data.insert(
            "skill_investigation".to_string(),
            fv_proficiency(value.skill_investigation),
        );
        data.insert(
            "skill_medicine".to_string(),
            fv_proficiency(value.skill_medicine),
        );
        data.insert(
            "skill_nature".to_string(),
            fv_proficiency(value.skill_nature),
        );
        data.insert(
            "skill_perception".to_string(),
            fv_proficiency(value.skill_perception),
        );
        data.insert(
            "skill_performance".to_string(),
            fv_proficiency(value.skill_performance),
        );
        data.insert(
            "skill_persuasion".to_string(),
            fv_proficiency(value.skill_persuasion),
        );
        data.insert(
            "skill_religion".to_string(),
            fv_proficiency(value.skill_religion),
        );
        data.insert(
            "skill_sleight_of_hand".to_string(),
            fv_proficiency(value.skill_sleight_of_hand),
        );
        data.insert(
            "skill_stealth".to_string(),
            fv_proficiency(value.skill_stealth),
        );
        data.insert(
            "skill_survival".to_string(),
            fv_proficiency(value.skill_survival),
        );
        data.insert(
            "passive_wisdom".to_string(),
            fv_string(value.passive_wisdom),
        );
        data.insert("armor_class".to_string(), fv_string(value.armor_class));
        data.insert("initiative".to_string(), fv_string(value.initiative));
        data.insert("speed".to_string(), fv_string(value.speed));
        data.insert("hit_point_max".to_string(), fv_string(value.hit_point_max));
        data.insert(
            "hit_point_current".to_string(),
            fv_string(value.hit_point_current),
        );
        data.insert(
            "hit_point_temp".to_string(),
            fv_string(value.hit_point_temp),
        );
        data.insert("hit_dice".to_string(), fv_string(value.hit_dice));
        data.insert(
            "hit_dice_current".to_string(),
            fv_string(value.hit_dice_current),
        );
        data.insert(
            "hit_dice_total".to_string(),
            fv_string(value.hit_dice_total),
        );
        data.insert("cp".to_string(), fv_string(value.cp));
        data.insert("sp".to_string(), fv_string(value.sp));
        data.insert("ep".to_string(), fv_string(value.ep));
        data.insert("gp".to_string(), fv_string(value.gp));
        data.insert("pp".to_string(), fv_string(value.pp));
        data.insert("equipment".to_string(), fv_string(value.equipment));
        data.insert(
            "personality_traits".to_string(),
            fv_string(value.personality_traits),
        );
        data.insert("ideals".to_string(), fv_string(value.ideals));
        data.insert("bonds".to_string(), fv_string(value.bonds));
        data.insert("flaws".to_string(), fv_string(value.flaws));
        data.insert(
            "features_and_traits".to_string(),
            fv_string(value.features_and_traits),
        );
        data
    }
}
