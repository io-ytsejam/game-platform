export function scrollUsers(childs, container) {
    let letScroll = true;
    let firstUser = 0;
    let forward;
    let usersWidth = 0; // Sum of elements width, counting from first fully visible, to the last of all

    let users;
    setTimeout(() => {
        users = childs;
        users.forEach((val, key) => {
            if (key >= firstUser) {
                usersWidth += getPropertyValue(val, "width") + 28;
            }
        });
    }, 300);


    let lastUser = false;
    container.addEventListener("wheel", (e) => {
        if (letScroll) {

            letScroll = false;

            forward = e.deltaY > 0;

            if(((usersWidth - 400) < getPropertyValue(users[firstUser], "width") + 28) && forward) {
                // When it's last...
                if (forward && !lastUser) {
                    // Go right with last user
                    for (let user of users) {
                        user.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
                        user.style.right = (getPropertyValue(user, "right") + (usersWidth - 400) + "px");
                    }
                    lastUser = true;
                    firstUser++;
                }
            } else if(!forward && lastUser) {
                // Go left with last
                for (let user of users) {
                    user.style.transition = "all 0.3s ease";
                    user.style.right = (getPropertyValue(user, "right") - (usersWidth - 400) + "px");
                }
                lastUser = false;
                firstUser--;
            } else if (forward && !lastUser) {
                // Simple go right
                for (let user of users) {
                    user.style.transition = "all 0.3s ease";
                    user.style.right = (getPropertyValue(user, "right") + getPropertyValue(users[firstUser], "width") + 28 + "px");
                }
                firstUser++;
            } else if (firstUser > 0 && !lastUser) {
                // Go left
                for (let user of users) {
                    if (firstUser == 1) user.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
                    else user.style.transition = "all 0.3s ease";
                    user.style.right = (getPropertyValue(user, "right") - getPropertyValue(users[firstUser - 1], "width") - 28 + "px");
                }
                firstUser--;
            } else {
            }

            if (!lastUser) {
                usersWidth = 0;
                users.forEach((val, key) => {
                    if (key >= firstUser) {
                        usersWidth += getPropertyValue(val, "width") + 28;
                    }
                });
            }

            // All goes here!
            setTimeout(() => {
                letScroll = true;
            }, 500);
        }
    });


    function getPropertyValue(element, property) {
        // It's our own function, return value of given property of a given element
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`));
    }
}