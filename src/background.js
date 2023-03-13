function onCommand(command) {
    chrome.tabs.query({ url: 'https://*.spotify.com/*' }, tabs => {
        // Open a spotify tab if one does not exist yet.
        if (tabs.length === 0) chrome.tabs.create({ url: 'https://open.spotify.com/collection/tracks' });

        let checkedOrNot =
            'var checked = btn.getAttribute("aria-checked");' +
            'if (checked == "true") { var link = "https://www.myinstants.com/media/sounds/classic_hurt.mp3"; }' +
            'else { var link = "https://www.myinstants.com/media/sounds/hitmarker_2.mp3"; }' +
            'var audio = new Audio(link); audio.volume = 0.4; audio.play(); btn.click();';

        let isSongLikedLogic = 
            'var checked = btn.getAttribute("aria-checked");' +
            'if (checked == "true") { var link = "https://www.myinstants.com/media/sounds/yeay.mp3"; }' +
            'else { var link = "https://www.myinstants.com/media/sounds/engineer_no01.mp3"; }' +
            'var audio = new Audio(link); audio.volume = 0.3; audio.play();';


        for (let tab of tabs) {
            let code = '';

            if (tab.url.startsWith('https://open.spotify.com')) {
                switch (command) {
                    case 'a-previous':
                        code = 'document.querySelector("button[aria-label=\'Vorige\']").click()';
                        break;
                    case 'b-play-pause':
                        code = 'document.querySelector("button[data-testid=\'control-button-playpause\']").click();';
                        break;
                    case 'c-next':
                        code = 'document.querySelector("button[data-testid=\'control-button-skip-forward\']").click();';
                        break;
                    case 'd-like-song':
                        code = 'var btn = document.querySelector("button[data-testid=\'add-button\']");' + checkedOrNot;
                        break;
                    case 'e-is-song-liked':
                        code = 'var btn = document.querySelector("button[data-testid=\'add-button\']");' + isSongLikedLogic;
                        break;
                    case 'f-shuffle':
                        code = 'var btn = document.querySelector("button[data-testid=\'control-button-shuffle\']");' + checkedOrNot;
                        break;
                }
            }

            // Apply command on only 1 spotify tab.
            if (code.length) {
                chrome.tabs.executeScript(tab.id, { code: code });
                break;
            }
        }
        // Unload background page as soon as we're done.
        window.close();
    });
}

chrome.commands.onCommand.addListener(onCommand);