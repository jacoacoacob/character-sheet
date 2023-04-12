import { abilityFieldFactory, numberFieldFactory, proficiencyFieldFactory, textFieldFactory, textareaFieldFactory } from "./fields.js";
import { createDiv, createHeader } from "./elements.js";
import { fieldGroup } from "./layouts.js";
import { naiveDeepCopy, createField } from "./utils.js";

const characterId = INITIAL_DATA.id;

const apiModel = naiveDeepCopy(INITIAL_DATA.data);
const formModel = naiveDeepCopy(INITIAL_DATA.data);

const dirtyFields = createDirtyFields();

const context = {
    apiModel,
    formModel,
    dirtyFields,
};

window.apiModel = apiModel;
window.formModel = formModel;

const abilityField = abilityFieldFactory(context);
const textField = textFieldFactory(context);
const textareaField = textareaFieldFactory(context);
const numberField = numberFieldFactory(context);
const proficiencyField = proficiencyFieldFactory(context);

setupFields();
setupCommitForm();

function setupFields() {
    const fields = document.querySelector(".fields-wrapper");

    fields.classList.add("space-y-4");

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
                            createField(proficiencyField, "skill_deception", "Deception (dex)"),
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
        ]
    })

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
        ]
    });

    const battleStuff = createDiv({
        className: "flex flex-col space-y-3",
        children: [
            createField(numberField(), "armor_class", "AC"),
            createField(numberField(), "initiative"),
            createField(numberField(), "speed"),
        ],
    });

    const hitPoints = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "HIT POINTS"),
            createField(numberField(), "hit_point_current", "current"),
            createField(numberField(), "hit_point_max", "max"),
        ],
    });

    const hitDice = createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "HIT DICE"),
            createField(textField({ style: { width: "72px" }}), "hit_dice", "kind"),
            createField(numberField(), "hit_dice_current", "current"),
            createField(numberField(), "hit_dice_total", "max"),
        ],
    });

    const deathSaves =  createDiv({
        className: "space-y-3",
        children: [
            createHeader(6, "DEATH SAVES"),
            createField(numberField(), "death_save_fail", "fail"),
            createField(numberField(), "death_save_success", "success"),
        ]
    });

    fields.append(
        createDiv({
            children: [
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        createDiv({
                            className: "space-y-4",
                            children: [
                                fieldGroup({ flex: 1, root: characterInfo }),
                                createDiv({
                                    className: "flex flex-1 space-x-4",
                                    children: [
                                        createDiv({
                                            className: "flex flex-col  space-y-4",
                                            children: [
                                                fieldGroup({ root: abilityScores }),
                                                fieldGroup({ flex: 1, root: passivePerception }),
                                            ],
                                        }),
                                        createDiv({
                                            className: "flex flex-col  space-y-4",
                                            children: [
                                                fieldGroup({ flex: 1, root: abilitySavingThrows }),
                                                fieldGroup({ root: proficiencyBonus }),
                                            ],
                                        }),
                                        createDiv({
                                            className: "flex flex-col flex-1 space-y-4",
                                            children: [
                                                fieldGroup({ flex: 1, root: skillSavingThrows }),
                                            ],
                                        }),
                                    ],
                                }),
                            ]
                        }),
                        createDiv({
                            className: "space-y-4",
                            children: [
                                fieldGroup({ root: battleStuff }),
                                fieldGroup({ root: hitPoints }),
                                fieldGroup({ root: hitDice }),
                                fieldGroup({ root: deathSaves }),
                            ],
                        }),
                    ],
                }),
            ]
        })
    );

    fields.appendChild(
        createDiv({
            className: "flex space-x-4",
            children: [
                createDiv({
                    className: "space-y-4",
                    children: [
                        createDiv({
                            className: "space-x-4 flex",
                            children: [
                                // createDiv({
                                //     className: "space-y-4 flex flex-col justify-between",
                                //     children: [
                                //         createDiv({
                                //             className: "field-group",
                                //             children: [
                                //                 createField(textField(), "passive_perception"),
                                //             ],
                                //         }),
                                //     ],
                                // }),
                                // createDiv({
                                //     className: "space-y-4 flex flex-col justify-between",
                                //     children: [
                                //         createDiv({
                                //             className: "field-group space-y-3",
                                //             children: [
                                //                 createField(textField(), "inspiration"),
                                //                 createField(textField(), "proficiency_bonus"),
                                //             ],
                                //         }),
                                //     ]
                                // }),
                                // createDiv({
                                //     className: "field-group",
                                //     children: [
                                //         createHeader(6, "SV THRW (SKILL)"),
                                //         createDiv({
                                //             className: "flex space-x-4",
                                //             children: [
                                //                 createDiv({
                                //                     className: "space-y-2",
                                //                     children: [
                                //                         createField(proficiencyField, "skill_acrobatics", "Acrobatics (dex)"),
                                //                         createField(proficiencyField, "skill_animal_handling", "Animal Handling (wis)"),
                                //                         createField(proficiencyField, "skill_arcana", "Arcana (int)"),
                                //                         createField(proficiencyField, "skill_athletics", "Athletics (str)"),
                                //                         createField(proficiencyField, "skill_deception", "Deception (dex)"),
                                //                         createField(proficiencyField, "skill_history", "History (int)"),
                                //                         createField(proficiencyField, "skill_insight", "Insight (wis)"),
                                //                         createField(proficiencyField, "skill_inimidation", "Intimidation (cha)"),
                                //                         createField(proficiencyField, "skill_investigation", "Investigation (int)"),
                                //                     ],
                                //                 }),
                                //                 createDiv({
                                //                     className: "space-y-2",
                                //                     children: [
                                //                         createField(proficiencyField, "skill_medicine", "Medicine (wis)"),
                                //                         createField(proficiencyField, "skill_nature", "Nature (int)"),
                                //                         createField(proficiencyField, "skill_perception", "Perception (wis)"),
                                //                         createField(proficiencyField, "skill_performance", "Performance (cha)"),
                                //                         createField(proficiencyField, "skill_persuasion", "Persuasion (cha)"),
                                //                         createField(proficiencyField, "skill_religion", "Religion (int)"),
                                //                         createField(proficiencyField, "skill_sleight_of_hand", "Sleight of Hand (dex)"),
                                //                         createField(proficiencyField, "skill_stealth", "Stealth (dex)"),
                                //                         createField(proficiencyField, "skill_survival", "Survival (wis)"),
                                //                     ],
                                //                 }),
                                //             ],
                                //         }),
                                //     ],
                                // }),
                            ],
                        }),
                    ]
                }),
                createDiv({
                    className: "flex flex-col space-y-4",
                    children: [
                        createDiv({
                            className: "flex space-x-4",
                            children: [
                                // createDiv({
                                //     className: "field-group flex-1",
                                //     children: [
                                //         createHeader(6, "BATTLE STUFF"),
                                //         createDiv({
                                //             className: "flex flex-wrap space-x-4 space-y-3",
                                //             children: [
                                //                 createField(numberField(), "armor_class", "AC"),
                                //                 createField(numberField(), "initiative"),
                                //                 createField(numberField(), "speed"),
                                //             ]
                                //         }),
                                //     ]
                                // }),
                                // createDiv({
                                //     className: "field-group flex-1",
                                //     children: [
                                //         createDiv({
                                //             className: "space-y-3",
                                //             children: [
                                //                 createHeader(6, "HIT POINTS"),
                                //                 createField(numberField(), "hit_point_current", "current"),
                                //                 createField(numberField(), "hit_point_max", "max"),
                                //             ],
                                //         }),
                                //     ],
                                // }),
                            ],
                        }),
                        // createDiv({
                        //     className: "flex space-x-4",
                        //     children: [
                        //         createDiv({
                        //             className: "field-group space-y-3",
                        //             children: [
                        //                 createHeader(6, "HIT DICE"),
                        //                 createField(textField(), "hit_dice", "kind"),
                        //                 createDiv({
                        //                     className: "flex flex-wrap space-x-4",
                        //                     children: [
                        //                         createField(numberField(), "hit_dice_current", "current"),
                        //                         createField(numberField(), "hit_dice_total", "max"),
                        //                     ],
                        //                 }),
                        //             ]
                        //         }),
                        //         createDiv({
                        //             className: "field-group flex-1 space-y-3",
                        //             children: [
                        //                 createHeader(6, "DEATH SAVES"),
                        //                 createField(numberField(), "death_save_fail", "fail"),
                        //                 createField(numberField(), "death_save_success", "success"),
                        //             ]
                        //         }),

                                
                        //     ],
                        // }),
                        createDiv({
                            className: "flex flex-col space-y-4",
                            children: [
                                createDiv({
                                    className: "field-group",
                                    style: {
                                        width: "100%",
                                    },
                                    children: [
                                        createField(textareaField, "equipment")
                                    ],
                                }),
                                createDiv({
                                    className: "field-group flex-1",
                                    children: [
                                        createField(textareaField, "proficiencies_and_languages"),
                                    ],
                                }),
                            ]
                        }),
                  
                    ],
                }),
                
            ],
        })
    );

    fields.appendChild(
        createDiv({
            className: "flex space-x-4",
            children: [
                createDiv({
                    className: "field-group flex-1",
                    children: [
                        createField(textareaField, "features_and_traits"),
                    ]
                }),
            ],
        })
    );
}



function createDirtyFields() {
    const _dirtyFields = [];

    return {
        add(fieldId) {
            _dirtyFields.push(fieldId);
        },
        remove(fieldId) {
            const indexOfFieldId = _dirtyFields.indexOf(fieldId);
            if (indexOfFieldId > -1) {
                _dirtyFields.splice(indexOfFieldId, 1);
            }
        },
        removeAll() {
            while (_dirtyFields.length) {
                document.getElementById(_dirtyFields.pop()).classList.remove("input--dirty");
            }
        }
    }
}

function setupCommitForm() {
    const form = document.getElementById("commit-form");
    const message = document.getElementById("commit-message");

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();

        const response = await fetch(`/${characterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message.value,
                new_data: formModel,
            }),
        });

        message.value = "";

        const responseJson = await response.json();

        Object.entries(responseJson.data).forEach(([fieldName, value]) => {
            apiModel[fieldName] = value;
        });

        dirtyFields.removeAll();
    });
}


