document.addEventListener('DOMContentLoaded', loadStoryElements);

function loadStoryElements() {
    fetch('story.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown('character', data.characters);
            populateDropdown('setting', data.settings);
            populateDropdown('plot', data.plots);
        })
        .catch(error => console.error('Error loading story elements:', error));
}

function populateDropdown(elementId, options) {
    const select = document.getElementById(elementId);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.id;
        opt.textContent = option.id;
        select.appendChild(opt);
    });
}

document.getElementById('generateStory').addEventListener('click', generateStory);

function generateStory() {
    fetch('story.json')
        .then(response => response.json())
        .then(data => {
            const characterId = document.getElementById('character').value;
            const settingId = document.getElementById('setting').value;
            const plotId = document.getElementById('plot').value;

            const character = data.characters.find(c => c.id === characterId);
            const setting = data.settings.find(s => s.id === settingId);
            const plot = data.plots.find(p => p.id === plotId);

            const storyText = `${character.description} ${setting.description} ${plot.description}`;
            document.getElementById('storyText').textContent = storyText;
        })
        .catch(error => console.error('Error generating story:', error));
}
