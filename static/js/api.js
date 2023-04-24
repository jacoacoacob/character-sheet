
class Api {
    constructor(characterId) {
        this.characterId = characterId;
    }

    async fetchCommitHistory() {
        const res = await fetch(`/commits/${this.characterId}`);

        return await res.json();
    }

    async updateCharacter(message, new_data) {
        const res = await fetch(`/character/${this.characterId}`, {
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

}

export { Api };
