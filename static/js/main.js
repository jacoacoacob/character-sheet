import { abilityFieldFactory, proficiencyFieldFactory, textFieldFactory } from "./fields.js";
import { createDiv, createHeader } from "./elements.js";
import { deepCopy, createField } from "./utils.js";

window.deepCopy = deepCopy;

const characterId = INITIAL_DATA.id;

const apiModel = deepCopy(INITIAL_DATA.data);
const formModel = deepCopy(INITIAL_DATA.data);

window.apiModel = apiModel;
window.formModel = formModel;

const abilityField = abilityFieldFactory(formModel, apiModel);
const textField = textFieldFactory(formModel, apiModel);
const proficiencyField = proficiencyFieldFactory(formModel, apiModel);

setupFields();
setupCommitForm();

function setupFields() {
    const fields = document.querySelector(".fields-wrapper");

    fields.classList.add("space-y-4")

    fields.appendChild(
        createDiv({
            className: "space-y-3 field-group",
            children: [
                createHeader(3, "General"),
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        createField(textField, "character_name"),
                        createField(textField, "class"),
                        createField(textField, "parentage"),
                        createField(textField, "level"),
                    ],
                }),
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        createField(textField, "player_name"),
                        createField(textField, "background"),
                        createField(textField, "alignment"),
                        createField(textField, "xp"),
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
                    className: "field-group",
                    children: [
                        createHeader(3, "Abilities"),
                        createField(abilityField, "ability_strength", "Strength"),
                        createField(abilityField, "ability_dexterity", "Dexterity"),
                        createField(abilityField, "ability_constitution", "Constitution"),
                        createField(abilityField, "ability_intelligence", "Intelligence"),
                        createField(abilityField, "ability_wisdom", "Wisdom"),
                        createField(abilityField, "ability_charisma", "Charisma"),
                    ],
                }),
                createDiv({
                    className: "space-x-10 space-y-4 field-group",
                    children: [
                        createHeader(3, "Saving Throws"),
                        createDiv({
                            className: "flex space-x-6",
                            children: [
                                createDiv({
                                    className: "space-y-4",
                                    children: [
                                        createDiv({
                                            children: [
                                                createField(textField, "inspiration"),
                                                createField(textField, "proficiency_bonus"),
                                            ],
                                        }),
                                        createDiv({
                                            className: "space-y-2",
                                            children: [
                                                createHeader(5, "ABILITY"),
                                                createField(proficiencyField, "saving_throw_strength", "Strength"),
                                                createField(proficiencyField, "saving_throw_dexterity", "Dexterity"),
                                                createField(proficiencyField, "saving_throw_constitution", "Constitution"),
                                                createField(proficiencyField, "saving_throw_intelligence", "Intelligence"),
                                                createField(proficiencyField, "saving_throw_wisdom", "Wisdom"),
                                                createField(proficiencyField, "saving_throw_charisma", "Charisma"),
                                            ],
                                        }),
                                    ]
                                }),
                                createDiv({
                                    children: [
                                        createHeader(5, "SKILL"),
                                        createDiv({
                                            className: "flex space-x-6",
                                            children: [
                                                createDiv({
                                                    className: "space-y-2",
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
                                                    className: "space-y-2",
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
                                }),
                            ]
                        })
                    ],
                }),
            ],
        })
    );

    // fields.appendChild(
    //     createFieldGroup(
    //         "general",
    //         textField,
    //         [
    //             "class",
    //             "level",
    //             "background",
    //             "character_name",
    //             "player_name",
    //             "parentage",
    //             "alignment",
    //             "xp",
    //         ]
    //     )
    // );

    // fields.appendChild(
    //     createFieldGroup(
    //         "abilities",
    //         abilityField,
    //         [
    //             ["ability_strength", "Strength"],
    //             ["ability_dexterity", "Dexterity"],
    //             ["ability_constitution", "Constitution"],
    //             ["ability_intelligence", "Intelligence"],
    //             ["ability_wisdom", "Wisdom"],
    //             ["ability_charisma", "Charisma"],
    //         ]
    //     )
    // );

    // fields.appendChild(
    //     createFieldGroup(
    //         "saving throws",
    //         proficiencyField,
    //         [
    //             ["saving_throw_strength", "Strength"],
    //             ["saving_throw_dexterity", "Dexterity"],
    //             ["saving_throw_constitution", "Constitution"],
    //             ["saving_throw_intelligence", "Intelligence"],
    //             ["saving_throw_wisdom", "Wisdom"],
    //             ["saving_throw_charisma", "Charisma"],
    //         ]
    //     )
    // )

    // fields.appendChild(
    //     createFieldGroup(
    //         "skills",
    //         proficiencyField,
    //         [
    //             ["skill_acrobatics", "Acrobatics (dex)"],
    //             ["skill_animal_handling", "Animal Handling (wis)"],
    //             ["skill_arcana", "Arcana (int)"],
    //             ["skill_athletics", "Athletics (str)"],
    //             ["skill_deception", "Deception (dex)"],
    //             ["skill_history", "History (int)"],
    //             ["skill_insight", "Insight (wis)"],
    //             ["skill_inimidation", "Intimidation (cha)"],
    //             ["skill_investigation", "Investigation (int)"],
    //             ["skill_medicine", "Medicine (wis)"],
    //             ["skill_nature", "Nature (int)"],
    //             ["skill_perception", "Perception (wis)"],
    //             ["skill_performance", "Performance (cha)"],
    //             ["skill_persuasion", "Persuasion (cha)"],
    //             ["skill_religion", "Religion (int)"],
    //             ["skill_sleight_of_hand", "Sleight of Hand (dex)"],
    //             ["skill_stealth", "Stealth (dex)"],
    //             ["skill_survival", "Survival (wis)"],
    //         ]
    //     )
    // );

    // fields.appendChild(
    //     createFieldGroup(
    //         "well-being",
    //         textField,
    //         [
    //             "death_save_fail",
    //             "dealth_save_success",
    //             "hit_dice",
    //             "hit_dice_current",
    //             "hit_dice_total",
    //             "hit_point_max",
    //             "hit_point_current",
    //             "hit_point_temp",
    //         ]
    //     )
    // );

    // fields.appendChild(
    //     createFieldGroup(
    //         "battle readiness",
    //         textField,
    //         [
    //             "armor_class",
    //             "initiative",
    //             "speed"
    //         ]
    //     )
    // )

    // fields.appendChild(
    //     createFieldGroup(
    //         "misc",
    //         textField,
    //         [
    //             "passive_perception",
    //             "inspiration",
    //             "proficiency_bonus"
    //         ]
    //     )
    // )
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
    });
}


