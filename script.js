window.addEventListener("DOMContentLoaded", async () => {
    const userStatusElement = document.getElementById("userStatus");
  
    const THRESHOLD = 60_000;
  
    if (!('IdleDetector' in window)) {
        alert('IdleDetector API is not supported in this browser.');
        return;
    }

    try {
        state = await IdleDetector.requestPermission(); 
    } catch {
        state = await Notification.requestPermission(); 
    }
    console.log("state =", state);

    if (state !== "granted") {
        alert("You need to grant the idle detection permission for this demo to work.");
        return;
    }

    try {
        const idleDetector = new IdleDetector();
        idleDetector.addEventListener("change", () => {
            const userState = idleDetector.userState;
            console.log("userState =", userState);
            const screenState = idleDetector.screenState;
            console.log("screenState =", screenState);
            userStatusElement.textContent = `User state: ${userState} Screen state: ${screenState}`
        });
        idleDetector.start({
            threshold: THRESHOLD,
        });
    } catch (err) {
        console.error(err.name, err.message);
    }
});
