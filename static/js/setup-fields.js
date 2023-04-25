import { createDiv, createHeader } from "./elements.js";

import {
    abilityFieldFactory,
    markdownFieldFactory,
    numberFieldFactory,
    proficiencyFieldFactory,
    textFieldFactory,
} from "./fields/index.js";

import { fieldGroup } from "./layouts.js";
import { createField } from "./utils.js";


/**
 * 
 * @param {import("./main.js").Context} context 
 */
function setupFields(context) {
    const abilityField = abilityFieldFactory(context);
    const textField = textFieldFactory(context);
    const markdownField = markdownFieldFactory(context);
    const numberField = numberFieldFactory(context);
    const proficiencyField = proficiencyFieldFactory(context);


    const container = document.getElementById("fields-wrapper");

    container.classList.add("space-y-4");

    const characterInfo = createDiv({
        className: "space-y-3",
        children: [
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(textField(), "character_name"),
                    createField(textField(), "class"),
                    createField(textField(), "parentage"),
                    createField(textField(), "level"),
                ],
            }),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(textField(), "player_name"),
                    createField(textField(), "background"),
                    createField(textField(), "alignment"),
                    createField(textField(), "xp"),
                ],
            }),
        ]
    });

    const abilityScores = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "ABILITY SCORES"),
            createField(abilityField, "ability_strength", "Strength"),
            createField(abilityField, "ability_dexterity", "Dexterity"),
            createField(abilityField, "ability_constitution", "Constitution"),
            createField(abilityField, "ability_intelligence", "Intelligence"),
            createField(abilityField, "ability_wisdom", "Wisdom"),
            createField(abilityField, "ability_charisma", "Charisma"),
        ],
    });

    const abilitySavingThrows = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "SV THRW (ABILITY)"),
            createField(proficiencyField, "saving_throw_strength", "Strength"),
            createField(proficiencyField, "saving_throw_dexterity", "Dexterity"),
            createField(proficiencyField, "saving_throw_constitution", "Constitution"),
            createField(proficiencyField, "saving_throw_intelligence", "Intelligence"),
            createField(proficiencyField, "saving_throw_wisdom", "Wisdom"),
            createField(proficiencyField, "saving_throw_charisma", "Charisma"),
        ],
    });

    const skillSavingThrows = createDiv({
        children: [
            createHeader(6, "SV THRW (SKILL)"),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createDiv({
                        className: "space-y-3",
                        children: [
                            createField(proficiencyField, "skill_acrobatics", "Acrobatics (dex)"),
                            createField(proficiencyField, "skill_animal_handling", "Animal Handling (wis)"),
                            createField(proficiencyField, "skill_arcana", "Arcana (int)"),
                            createField(proficiencyField, "skill_athletics", "Athletics (str)"),
                            createField(proficiencyField, "skill_deception", "Deception (cha)"),
                            createField(proficiencyField, "skill_history", "History (int)"),
                            createField(proficiencyField, "skill_insight", "Insight (wis)"),
                            createField(proficiencyField, "skill_inimidation", "Intimidation (cha)"),
                            createField(proficiencyField, "skill_investigation", "Investigation (int)"),
                        ],
                    }),
                    createDiv({
                        className: "space-y-3",
                        children: [
                            createField(proficiencyField, "skill_medicine", "Medicine (wis)"),
                            createField(proficiencyField, "skill_nature", "Nature (int)"),
                            createField(proficiencyField, "skill_perception", "Perception (wis)"),
                            createField(proficiencyField, "skill_performance", "Performance (cha)"),
                            createField(proficiencyField, "skill_persuasion", "Persuasion (cha)"),
                            createField(proficiencyField, "skill_religion", "Religion (int)"),
                            createField(proficiencyField, "skill_sleight_of_hand", "Sleight of Hand (dex)"),
                            createField(proficiencyField, "skill_stealth", "Stealth (dex)"),
                            createField(proficiencyField, "skill_survival", "Survival (wis)"),
                        ],
                    }),
                ],
            }),
        ],
    });

    const passivePerception = createDiv({
        children: [
            createField(textField(), "passive_perception"),
        ],
    });
    
    const proficiencyBonus = createDiv({
        className: "space-y-3",
        children: [
            createField(textField(), "inspiration"),
            createField(textField(), "proficiency_bonus"),
        ],
    });

    const acInitiativeSpeed = createDiv({
        className: "space-y-3",
        children: [
            createField(numberField(), "armor_class", "AC"),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(numberField(), "initiative"),
                    createField(numberField(), "speed"),
                ],
            }),
        ],
    });

    const hitDice = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "HIT DICE"),
            createDiv({
                className: "space-y-3",
                children: [
                    createField(textField({ style: { width: "72px" }}), "hit_dice", "kind"),
                    createDiv({
                        className: "flex space-x-4",
                        children: [
                            createField(numberField(), "hit_dice_current", "current"),
                            createField(numberField(), "hit_dice_total", "max"),
                        ]
                    }),
                ]
            })
        ],
    });

    const hitPoints = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "HIT POINTS"),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(numberField(), "hit_point_current", "Current HP"),
                    createField(numberField(), "hit_point_max", "Max HP"),
                ]
            })
        ],
    });

    const deathSaves = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "DEATH SAVES"),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(numberField(), "death_save_fail", "fail"),
                    createField(numberField(), "death_save_success", "success"),
                ]
            })
        ],
    });

    const money = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "MONEY"),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(numberField(), "cp", "CP"),
                    createField(numberField(), "gp", "GP"),
                ],
            }),
            createDiv({
                className: "flex space-x-4",
                children: [
                    createField(numberField(), "sp", "SP"),
                    createField(numberField(), "pp", "PP"),
                ],
            }),
            createField(numberField(), "ep", "EP"),
        ],
    });

    const attacksAndSpells = createDiv({
        children: [
            createField(markdownField, "attacks_and_spells"),
        ],
    });
    
    const equipment = createDiv({
        children: [
            createField(markdownField, "equipment"),
        ],
    });

    const notes = createDiv({
        children: [
            createField(markdownField, "notes"),
        ],
    });

    container.append(
        createDiv({
            className: "space-y-4",
            children: [
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        createDiv({
                            className: "space-y-4",
                            children: [
                                fieldGroup({ root: characterInfo, flex: 1 }),
                                createDiv({
                                    className: "flex flex-1 space-x-4",
                                    children: [
                                        createDiv({
                                            className: "flex flex-col space-y-4",
                                            children: [
                                                fieldGroup({ root: abilityScores, flex: 1 }),
                                                fieldGroup({ root: passivePerception, flex: 1 }),
                                            ],
                                        }),
                                        createDiv({
                                            className: "flex flex-col  space-y-4",
                                            children: [
                                                fieldGroup({ root: abilitySavingThrows, flex: 1 }),
                                                fieldGroup({ root: proficiencyBonus }),
                                            ],
                                        }),
                                        createDiv({
                                            className: "flex flex-col flex-1 space-y-4",
                                            children: [
                                                fieldGroup({ root: skillSavingThrows, flex: 1 }),
                                            ],
                                        }),
                                    ],
                                }),
                            ]
                        }),
                        createDiv({
                            className: "space-y-4",
                            children: [
                                fieldGroup({ root: acInitiativeSpeed }),
                                fieldGroup({ root: hitDice }),
                                fieldGroup({ root: hitPoints }),
                                fieldGroup({ root: deathSaves }),
                                fieldGroup({ root: money }),
                            ],
                        }),
                    ],
                }),
                createDiv({
                    className: "flex",
                    children: [
                        createDiv({
                            className: "flex-1 space-y-4",
                            children: [
                                fieldGroup({ root: equipment, flex: 1 }),
                                fieldGroup({ root: attacksAndSpells, flex: 1 }),
                                fieldGroup({ root: notes, flex: 1 }),
                            ]
                        })
                    ],
                }),
            ],
        }),
    );   
}

export { setupFields };
