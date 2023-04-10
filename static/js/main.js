"use strict";

(function () {

    const characterId = INITIAL_DATA.id;

    const apiModel = INITIAL_DATA.data;
    const formModel = INITIAL_DATA.data;

    window.apiModel = apiModel;
    window.formModel = formModel;

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
        )

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

        const groupHeader = document.createElement("h3");
        groupHeader.textContent = groupName;

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
                group.appendChild(field)
            });

        return group;
    }

    function createProficiencyField(fieldName, label) {
        const wrapper = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.title = "Check the box to indicate proficiency";
        checkbox.id = `${fieldName}-proficient`;
        checkbox.checked = formModel[fieldName].proficient;

        const modifier = document.createElement("input");
        modifier.id = `${fieldName}-modifier`;
        modifier.placeholder = "modifier";
        modifier.value = formModel[fieldName].modifier;
        
        const fieldLabel = document.createElement("label");
        fieldLabel.setAttribute("for", `${fieldName}-modifier`);
        fieldLabel.textContent = label;

        checkbox.addEventListener("input", (ev) => {
            formModel[fieldName].proficient = ev.target.checked;
        });

        modifier.addEventListener("input", (ev) => {
            formModel[fieldName].modifier = ev.target.value;
        });

        wrapper.appendChild(checkbox);
        wrapper.appendChild(fieldLabel);
        wrapper.appendChild(modifier);

        return wrapper
    }

    function createTextField(fieldName) {
        const wrapper = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", fieldName);
        label.textContent = fieldName;

        const input = document.createElement("input");
        input.id = fieldName;
        input.value = formModel[fieldName];

        input.addEventListener("input", (ev) => {
            formModel[fieldName] = ev.target.value;
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        return wrapper;
    }

})();

