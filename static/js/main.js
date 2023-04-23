import { createButton, createDiv, createHeader } from "./elements.js";
import { createModal } from "./modal.js";
import {
    abilityFieldFactory,
    markdownFieldFactory,
    numberFieldFactory,
    proficiencyFieldFactory,
    textFieldFactory,
} from "./fields/index.js";
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
const markdownField = markdownFieldFactory(context);
const numberField = numberFieldFactory(context);
const proficiencyField = proficiencyFieldFactory(context);

setupFields();
setupSaveModal();
setupSaveAsImage()
// setupCommitForm();

function setupFields() {
    const fields = document.getElementById("fields-wrapper");

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

    fields.append(
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
    const commitChanges = document.getElementById("commit-changes");

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandS(ev) {
        return (ev.metaKey || ev.ctrlKey) && ["s", "S"].includes(ev.key);
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandEnter(ev) {
        return (ev.metaKey || ev.ctrlKey) && ev.key === "Enter";
    }

    let prevActiveElement = null;

    window.addEventListener("keydown", (ev) => {
        if (isCommandS(ev)) {
            ev.preventDefault();
            prevActiveElement = document.activeElement
            message.focus();
        }
    });

    message.addEventListener("keydown", (ev) => {
        if (isCommandEnter(ev)) {
            commitChanges.click();
            if (prevActiveElement) {
                prevActiveElement.focus();
                prevActiveElement = null;
            }
        }
    })


    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();

        const response = await fetch(`/character/${characterId}`, {
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


// function setupSaveModal() {
function setupSaveModalOld() {
    const modal = document.getElementById("save-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const formCommit = document.getElementById("form-commit");
    const btnSubmitCommitForm = document.getElementById("btn-submit-commit-form");
    const taCommitMessage = document.getElementById("ta-commit-message");

    let prevActiveElement = null;

    btnCloseModal.addEventListener("click", closeModal);

    window.addEventListener("keydown", (ev) => {
        if (isCommandS(ev)) {
            ev.preventDefault();
            openModal();
        }
    });

    formCommit.addEventListener("submit", async (ev) => {
        ev.preventDefault();

        const response = await fetch(`/character/${characterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: taCommitMessage.value,
                new_data: formModel,
            }),
        });

        taCommitMessage.value = "";
        
        const responseJson = await response.json();

        Object.entries(responseJson.data).forEach(([fieldName, value]) => {
            apiModel[fieldName] = value;
        });

        dirtyFields.removeAll();

        closeModal();
    });

    taCommitMessage.addEventListener("keydown", (ev) => {
        if (isCommandEnter(ev)) {
            btnSubmitCommitForm.click();
        }
    });

 

    function openModal() {
        modal.classList.add("modal--visible");
        prevActiveElement = document.activeElement;
        taCommitMessage.focus();
        window.addEventListener("keydown", listenEscapeKey);
    }

    function closeModal() {
        modal.classList.remove("modal--visible");
        if (prevActiveElement) {
            prevActiveElement.focus();
            prevActiveElement = null;
        }
        window.removeEventListener("keydown", listenEscapeKey);
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandS(ev) {
        return (ev.metaKey || ev.ctrlKey) && ["s", "S"].includes(ev.key);
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandEnter(ev) {
        return (ev.metaKey || ev.ctrlKey) && ev.key === "Enter";
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isEsc(ev) {
        return ev.key === "Escape";
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function listenEscapeKey(ev) {
        if (isEsc(ev)) {
            closeModal();
        }
    }
}

function setupSaveAsImage() {
    const btnSaveImage = document.getElementById("btn-save-image")
    
    btnSaveImage.addEventListener("click", async () => {
        const element = document.getElementById("fields-wrapper");

        element.style.padding = "8px";
        
        const a = document.createElement("a");

        try {
            const canvas = await html2canvas(element);
            a.href = canvas.toDataURL();
            a.download = formModel.character_name + "_" + new Date().toDateString().toLowerCase().replace(/\s+/g, "_");
            a.click();
        } catch (error) {
            console.error(error);
        } finally {
            element.style.padding = 0;
        }
    });
}

function setupSaveModal() {

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandS(ev) {
        return (ev.metaKey || ev.ctrlKey) && ["s", "S"].includes(ev.key);
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function isCommandEnter(ev) {
        return (ev.metaKey || ev.ctrlKey) && ev.key === "Enter";
    }


    createModal({
        setup({ closeModal, openModal }) {
            window.addEventListener("keydown", (ev) => {
                if (isCommandS(ev)) {
                    ev.preventDefault();
                    openModal();
                }
            });
            
            return [];
        },
    });
}

