import { abilityFieldFactory, proficiencyFieldFactory } from "./elements.js";
import { deepCopy } from "./utils.js";



window.deepCopy = deepCopy;

const characterId = INITIAL_DATA.id;

const apiModel = deepCopy(INITIAL_DATA.data);
const formModel = deepCopy(INITIAL_DATA.data);

window.apiModel = apiModel;
window.formModel = formModel;

const createAbilityField = abilityFieldFactory(formModel, apiModel);
const createProficiencyField = proficiencyFieldFactory(formModel, apiModel);

setupFields();
setupCommitForm();

function setupFields() {
    const fields = document.querySelector(".fields-wrapper");

    fields.appendChild(
        createFieldGroup(
            "general",
            createTextField,
            [
                "class",
                "level",
                "background",
                "character_name",
                "player_name",
                "parentage",
                "alignment",
                "xp",
            ]
        )
    );

    fields.appendChild(
        createFieldGroup(
            "abilities",
            createAbilityField,
            [
                ["ability_strength", "Strength"],
                ["ability_dexterity", "Dexterity"],
                ["ability_constitution", "Constitution"],
                ["ability_intelligence", "Intelligence"],
                ["ability_wisdom", "Wisdom"],
                ["ability_charisma", "Charisma"],
            ]
        )
    );

    fields.appendChild(
        createFieldGroup(
            "saving throws",
            createProficiencyField,
            [
                ["saving_throw_strength", "Strength"],
                ["saving_throw_dexterity", "Dexterity"],
                ["saving_throw_constitution", "Constitution"],
                ["saving_throw_intelligence", "Intelligence"],
                ["saving_throw_wisdom", "Wisdom"],
                ["saving_throw_charisma", "Charisma"],
            ]
        )
    )

    fields.appendChild(
        createFieldGroup(
            "skills",
            createProficiencyField,
            [
                ["skill_acrobatics", "Acrobatics (dex)"],
                ["skill_animal_handling", "Animal Handling (wis)"],
                ["skill_arcana", "Arcana (int)"],
                ["skill_athletics", "Athletics (str)"],
                ["skill_deception", "Deception (dex)"],
                ["skill_history", "History (int)"],
                ["skill_insight", "Insight (wis)"],
                ["skill_inimidation", "Intimidation (cha)"],
                ["skill_investigation", "Investigation (int)"],
                ["skill_medicine", "Medicine (wis)"],
                ["skill_nature", "Nature (int)"],
                ["skill_perception", "Perception (wis)"],
                ["skill_performance", "Performance (cha)"],
                ["skill_persuasion", "Persuasion (cha)"],
                ["skill_religion", "Religion (int)"],
                ["skill_sleight_of_hand", "Sleight of Hand (dex)"],
                ["skill_stealth", "Stealth (dex)"],
                ["skill_survival", "Survival (wis)"],
            ]
        )
    );

    fields.appendChild(
        createFieldGroup(
            "well-being",
            createTextField,
            [
                "death_save_fail",
                "dealth_save_success",
                "hit_dice",
                "hit_dice_current",
                "hit_dice_total",
                "hit_point_max",
                "hit_point_current",
                "hit_point_temp",
            ]
        )
    );

    fields.appendChild(
        createFieldGroup(
            "battle readiness",
            createTextField,
            [
                "armor_class",
                "initiative",
                "speed"
            ]
        )
    )

    fields.appendChild(
        createFieldGroup(
            "misc",
            createTextField,
            [
                "passive_perception",
                "inspiration",
                "proficiency_bonus"
            ]
        )
    )
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

function createFieldGroup(groupName, fieldFactory, fieldNames) {
    const group = document.createElement("section");
    group.classList.add("field-group");

    const groupHeader = document.createElement("h3");
    groupHeader.textContent = groupName;

    const fields = document.createElement("div");
    fields.classList.add("field-group__fields");

    group.appendChild(groupHeader);

    fieldNames
        .map((fieldName) => {
            if (typeof fieldName === "string") {
                return fieldFactory(fieldName, fieldName);
            } else {
                return fieldFactory(fieldName[0], fieldName[1]);
            }
        })
        .forEach(field => {
            fields.appendChild(field)
        });

    group.appendChild(fields);

    return group;
}


function createTextField(fieldName) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("field");
    wrapper.classList.add("text-field");

    const label = document.createElement("label");
    label.classList.add("text-field__label");
    label.setAttribute("for", fieldName);
    label.textContent = fieldName;

    const input = document.createElement("input");
    input.classList.add("text-field__input");
    input.id = fieldName;
    input.value = formModel[fieldName];

    input.addEventListener("input", (ev) => {
        formModel[fieldName] = ev.target.value.trim();
        checkIsDirty(
            input,
            formModel[fieldName],
            apiModel[fieldName]
        );
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
}

function checkIsDirty(input, formValue, apiValue) {
    if (formValue !== apiValue) {
        input.classList.add("dirty");
    } else {
        input.classList.remove("dirty");
    }
}


