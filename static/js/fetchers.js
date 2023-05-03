
async function fetchJson(method, path, body) {
    const response = await fetch(path, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: typeof body === "undefined" ? body : JSON.stringify(body),
    });

    return await response.json();
}

const createCommit = (characterId, message, new_data) =>
    fetchJson("PUT", `/character/${characterId}`, { message, new_data });


const getCommitHistory = (characterId) =>
    fetchJson("GET", `/commits/${characterId}`);

const updateCommitMessage = (commitId, message) =>
    fetchJson("PUT", `/commits/${commitId}`, { message });


const createMarkdownPreview = (source) =>
    fetchJson("POST", "/md-preview", { source });


const getCampaignNoteList = (characterId) =>
    fetchJson("GET", `/notes/${characterId}`);

const createCampaignNote = (characterId, message) =>
    fetchJson("POST", `/notes/${characterId}`, { message });

const updateCampaignNote = (noteId, message) =>
    fetchJson("PUT", `/notes/${noteId}`, { message });

    
export {
    getCampaignNoteList,
    createCommit,
    getCommitHistory,
    createMarkdownPreview,
    createCampaignNote,
    updateCampaignNote,
    updateCommitMessage,
};
