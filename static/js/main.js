"use strict";

(function () {

    const apiModel = INITIAL_DATA.data;
    const formModel = window.formModel = INITIAL_DATA.data;

    window.apiModel = apiModel;
    window.formModel = formModel;

    const fields = document.querySelector(".fields-wrapper");

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
                ["skill_acrobatics", "Acrobatics"],
                ["skill_animal_handling", "Animal Handling"],
                ["skill_athletics", "Athletics"],
                ["skill_deception", "Deception"],
                ["skill_history", "History"],
                ["skill_insight", "Insight"],
                ["skill_inimidation", "Intimidation"],
                ["skill_investigation", "Investigation"],
                ["skill_medicine", "Medicine"],
                ["skill_nature", "Nature"],
                ["skill_perception", "Perception"],
                ["skill_performance", "Performance"],
                ["skill_persuasion", "Persuasion"],
                ["skill_religion", "Religion"],
                ["skill_sleight_of_hand", "Sleight of Hand"],
                ["skill_stealth", "Stealth"],
                ["skill_survival", "Survival"],
            ]
        )
    );

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
        const elem = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", fieldName);
        label.textContent = fieldName;

        const input = document.createElement("input");
        input.id = fieldName;

        input.addEventListener("input", (ev) => {
            formModel[fieldName] = ev.target.value;
        });

        elem.appendChild(label);
        elem.appendChild(input);

        return { fieldName, elem };
    }

})();

