function load() {

    document.getElementById("smb-link")
        .addEventListener("click",() => {

            gtag('event', 'click', {
                event_category: 'documentation',
                event_label: 'smb'
            });
    });

    document.getElementById("ksb-link")
        .addEventListener("click",() => {

            gtag('event', 'click', {
                event_category: 'documentation',
                event_label: 'ksb'
            });
        });
}