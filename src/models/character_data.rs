use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use super::character_delta::CharacterDelta;

#[derive(Default, Serialize, Deserialize)]
pub struct CharacterData {
    pub class: Option<String>,
    pub level: Option<String>,
    pub background: Option<String>,
    pub player_name: Option<String>,
    pub race: Option<String>,
    pub alignment: Option<String>,
    pub xp: Option<String>,
    pub score_stength: Option<String>,
    pub score_dexterity: Option<String>,
    pub score_constitution: Option<String>,
    pub score_intelligence: Option<String>,
    pub score_wisdom: Option<String>,
    pub score_charisma: Option<String>,
    pub inspiration: Option<String>,
    pub proficiency_bonus: Option<String>,
    pub saving_throw_str: Option<String>,
    pub saving_throw_dexterity: Option<String>,
    pub saving_throw_constitution: Option<String>,
    pub saving_throw_intelligence: Option<String>,
    pub saving_throw_wisdom: Option<String>,
    pub saving_throw_charisma: Option<String>,
    pub death_save_fail: Option<String>,
    pub death_save_success: Option<String>,
    pub skill_acrobatics: Option<String>,
    pub skill_animal_handling: Option<String>,
    pub skill_athletics: Option<String>,
    pub skill_deception: Option<String>,
    pub skill_history: Option<String>,
    pub skill_insight: Option<String>,
    pub skill_inimidation: Option<String>,
    pub skill_investigation: Option<String>,
    pub skill_medicine: Option<String>,
    pub skill_nature: Option<String>,
    pub skill_perception: Option<String>,
    pub skill_performance: Option<String>,
    pub skill_persuasion: Option<String>,
    pub skill_religion: Option<String>,
    pub skill_sleight_of_hand: Option<String>,
    pub skill_stealth: Option<String>,
    pub skill_survival: Option<String>,
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
        let mut data = HashMap::new();

        for delta in value {
            for diff in delta.field_diffs.data {
                data.insert(diff.field_name, diff.new);
            }
        }

        let get_field = |field_name: &str| {
            match &data.get(field_name) {
                Some(value) => Some(value.to_string()),
                None => None
            }
        };

        CharacterData {
            class: get_field("class"),
            level: get_field("level"),
            background: get_field("background"),
            player_name: get_field("player_name"),
            race: get_field("race"),
            alignment: get_field("alignment"),
            xp: get_field("xp"),
            score_stength: get_field("score_stength"),
            score_dexterity: get_field("score_dexterity"),
            score_constitution: get_field("score_constitution"),
            score_intelligence: get_field("score_intelligence"),
            score_wisdom: get_field("score_wisdom"),
            score_charisma: get_field("score_charisma"),
            inspiration: get_field("inspiration"),
            proficiency_bonus: get_field("proficiency_bonus"),
            saving_throw_str: get_field("saving_throw_str"),
            saving_throw_dexterity: get_field("saving_throw_dexterity"),
            saving_throw_constitution: get_field("saving_throw_constitution"),
            saving_throw_intelligence: get_field("saving_throw_intelligence"),
            saving_throw_wisdom: get_field("saving_throw_wisdom"),
            saving_throw_charisma: get_field("saving_throw_charisma"),
            death_save_fail: get_field("death_save_fail"),
            death_save_success: get_field("death_save_success"),
            skill_acrobatics: get_field("skill_acrobatics"),
            skill_animal_handling: get_field("skill_animal_handling"),
            skill_athletics: get_field("skill_athletics"),
            skill_deception: get_field("skill_deception"),
            skill_history: get_field("skill_history"),
            skill_insight: get_field("skill_insight"),
            skill_inimidation: get_field("skill_inimidation"),
            skill_investigation: get_field("skill_investigation"),
            skill_medicine: get_field("skill_medicine"),
            skill_nature: get_field("skill_nature"),
            skill_perception: get_field("skill_perception"),
            skill_performance: get_field("skill_performance"),
            skill_persuasion: get_field("skill_persuasion"),
            skill_religion: get_field("skill_religion"),
            skill_sleight_of_hand: get_field("skill_sleight_of_hand"),
            skill_stealth: get_field("skill_stealth"),
            skill_survival: get_field("skill_survival"),
            passive_wisdom: get_field("passive_wisdom"),
            armor_class: get_field("armor_class"),
            initiative: get_field("initiative"),
            speed: get_field("speed"),
            hit_point_max: get_field("hit_point_max"),
            hit_point_current: get_field("hit_point_current"),
            hit_point_temp: get_field("hit_point_temp"),
            hit_dice: get_field("hit_dice"),
            hit_dice_current: get_field("hit_dice_current"),
            hit_dice_total: get_field("hit_dice_total"),
            cp: get_field("cp"),
            sp: get_field("sp"),
            ep: get_field("ep"),
            gp: get_field("gp"),
            pp: get_field("pp"),
            equipment: get_field("equipment"),
            personality_traits: get_field("personality_traits"),
            ideals: get_field("ideals"),
            bonds: get_field("bonds"),
            flaws: get_field("flaws"),
            features_and_traits: get_field("features_and_traits"),
        }


    }
}


impl From<CharacterData> for HashMap<String, String>  {
    fn from(value: CharacterData) -> Self {
        let mut data = HashMap::new();
        data.insert("class".to_string(), value.class.unwrap_or_default());
        data.insert("level".to_string(), value.level.unwrap_or_default());
        data.insert("background".to_string(), value.background.unwrap_or_default());
        data.insert("player_name".to_string(), value.player_name.unwrap_or_default());
        data.insert("race".to_string(), value.race.unwrap_or_default());
        data.insert("alignment".to_string(), value.alignment.unwrap_or_default());
        data.insert("xp".to_string(), value.xp.unwrap_or_default());
        data.insert("score_stength".to_string(), value.score_stength.unwrap_or_default());
        data.insert("score_dexterity".to_string(), value.score_dexterity.unwrap_or_default());
        data.insert("score_constitution".to_string(), value.score_constitution.unwrap_or_default());
        data.insert("score_intelligence".to_string(), value.score_intelligence.unwrap_or_default());
        data.insert("score_wisdom".to_string(), value.score_wisdom.unwrap_or_default());
        data.insert("score_charisma".to_string(), value.score_charisma.unwrap_or_default());
        data.insert("inspiration".to_string(), value.inspiration.unwrap_or_default());
        data.insert("proficiency_bonus".to_string(), value.proficiency_bonus.unwrap_or_default());
        data.insert("saving_throw_str".to_string(), value.saving_throw_str.unwrap_or_default());
        data.insert("saving_throw_dexterity".to_string(), value.saving_throw_dexterity.unwrap_or_default());
        data.insert("saving_throw_constitution".to_string(), value.saving_throw_constitution.unwrap_or_default());
        data.insert("saving_throw_intelligence".to_string(), value.saving_throw_intelligence.unwrap_or_default());
        data.insert("saving_throw_wisdom".to_string(), value.saving_throw_wisdom.unwrap_or_default());
        data.insert("saving_throw_charisma".to_string(), value.saving_throw_charisma.unwrap_or_default());
        data.insert("death_save_fail".to_string(), value.death_save_fail.unwrap_or_default());
        data.insert("death_save_success".to_string(), value.death_save_success.unwrap_or_default());
        data.insert("skill_acrobatics".to_string(), value.skill_acrobatics.unwrap_or_default());
        data.insert("skill_animal_handling".to_string(), value.skill_animal_handling.unwrap_or_default());
        data.insert("skill_athletics".to_string(), value.skill_athletics.unwrap_or_default());
        data.insert("skill_deception".to_string(), value.skill_deception.unwrap_or_default());
        data.insert("skill_history".to_string(), value.skill_history.unwrap_or_default());
        data.insert("skill_insight".to_string(), value.skill_insight.unwrap_or_default());
        data.insert("skill_inimidation".to_string(), value.skill_inimidation.unwrap_or_default());
        data.insert("skill_investigation".to_string(), value.skill_investigation.unwrap_or_default());
        data.insert("skill_medicine".to_string(), value.skill_medicine.unwrap_or_default());
        data.insert("skill_nature".to_string(), value.skill_nature.unwrap_or_default());
        data.insert("skill_perception".to_string(), value.skill_perception.unwrap_or_default());
        data.insert("skill_performance".to_string(), value.skill_performance.unwrap_or_default());
        data.insert("skill_persuasion".to_string(), value.skill_persuasion.unwrap_or_default());
        data.insert("skill_religion".to_string(), value.skill_religion.unwrap_or_default());
        data.insert("skill_sleight_of_hand".to_string(), value.skill_sleight_of_hand.unwrap_or_default());
        data.insert("skill_stealth".to_string(), value.skill_stealth.unwrap_or_default());
        data.insert("skill_survival".to_string(), value.skill_survival.unwrap_or_default());
        data.insert("passive_wisdom".to_string(), value.passive_wisdom.unwrap_or_default());
        data.insert("armor_class".to_string(), value.armor_class.unwrap_or_default());
        data.insert("initiative".to_string(), value.initiative.unwrap_or_default());
        data.insert("speed".to_string(), value.speed.unwrap_or_default());
        data.insert("hit_point_max".to_string(), value.hit_point_max.unwrap_or_default());
        data.insert("hit_point_current".to_string(), value.hit_point_current.unwrap_or_default());
        data.insert("hit_point_temp".to_string(), value.hit_point_temp.unwrap_or_default());
        data.insert("hit_dice".to_string(), value.hit_dice.unwrap_or_default());
        data.insert("hit_dice_current".to_string(), value.hit_dice_current.unwrap_or_default());
        data.insert("hit_dice_total".to_string(), value.hit_dice_total.unwrap_or_default());
        data.insert("cp".to_string(), value.cp.unwrap_or_default());
        data.insert("sp".to_string(), value.sp.unwrap_or_default());
        data.insert("ep".to_string(), value.ep.unwrap_or_default());
        data.insert("gp".to_string(), value.gp.unwrap_or_default());
        data.insert("pp".to_string(), value.pp.unwrap_or_default());
        data.insert("equipment".to_string(), value.equipment.unwrap_or_default());
        data.insert("personality_traits".to_string(), value.personality_traits.unwrap_or_default());
        data.insert("ideals".to_string(), value.ideals.unwrap_or_default());
        data.insert("bonds".to_string(), value.bonds.unwrap_or_default());
        data.insert("flaws".to_string(), value.flaws.unwrap_or_default());
        data.insert("features_and_traits".to_string(), value.features_and_traits.unwrap_or_default());
        data
    }
}
