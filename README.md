# image-feed-REACT
A small project working with scrollviews and objects through react native. I've included images in the repository to display the functionality.

This project allowed me to experiement with creating seperate users as unique objects within an array. It consists of 3 screens: an image feed, a section to post a new image, and an account selection screen

Within the account selection screen, a user is able to add a new account or select one that has already been added. There are two text inputs here, one being an image uri input for a custom account image, and the other being the name of the account. As accounts are added, they are shown and selectable from a container just above the inputs. If there are more accounts than the container has room for, the scrollview kicks in allowing the user to scroll/ swipe through the accounts.

From here, the user may post an image. Within the post screen, there is a text field for inserting a uri for a desired image they'd like to post to the feed. The current active user is displayed at the top of this screen so that it's clear who is posting.

Finally, the feed screen is designed to accumulate images posted by the various users. Their name and account image is incorporated with the uploaded image, as well as a like button that keeps track of how many times each image was liked by a user.
