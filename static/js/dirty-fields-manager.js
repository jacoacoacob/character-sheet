
function createDirtyFieldsManager() {
    const _dirtyFields = [];

    return {
        isEmpty() {
            return _dirtyFields.length === 0;
        },
        clearAll() {
            while (_dirtyFields.length) {
                document.getElementById(_dirtyFields.pop()).classList.remove("input--dirty");
            }
        },
        check(input, formValue, apiValue) {
            if (formValue !== apiValue) {
                input.classList.add("input--dirty");
                _dirtyFields.push(input.id);
            } else {
                input.classList.remove("input--dirty");
                const indexOfFieldId = _dirtyFields.indexOf(input.id);
                if (indexOfFieldId > -1) {
                    _dirtyFields.splice(indexOfFieldId, 1);
                }
            }
        }
    }
}

export { createDirtyFieldsManager };
