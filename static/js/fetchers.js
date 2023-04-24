
async function updateCharacter(characterId, message, new_data) {
    const res = await fetch(`/character/${characterId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            new_data,
        }),
    });

    return await res.json();
}

async function getCommitHistory(characterId) {
    const res = await fetch(`/commits/${characterId}`);

    return await res.json();
}

async function createMarkdownPreview(source) {
    const res = await fetch("/md-preview", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ source }),
    });

    return await res.json();
}

export { updateCharacter, getCommitHistory, createMarkdownPreview };
