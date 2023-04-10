"use strict";

(function () {

    const apiModel = INITIAL_DATA.data;
    const formModel = window.formModel = INITIAL_DATA.data;

    window.apiModel = apiModel;
    window.formModel = formModel;

    const fieldsWrapper = document.querySelector(".fields-wrapper");

    const fields = Object.keys(formModel).map(createFormField);

    const groupSkills = createFieldGroup("skills", [
        ""
    ])

    function createFieldGroup(groupName, fieldNames) {

    }

    function createFormField(fieldName) {
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

