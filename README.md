# Markdown -> Medium

- Take your markdown file and send it directly to a medium post!! With codes + formatting!!
- This uses the Medium API + nodejs + python to take your awesome post and push it to medium so you can focus on writing and not having to copy paste

> I made this into a command line tool so its way easier to use and work with. You can also run for loops now because well.. it is a script and not a website like the original :))

# How to use?

- Clone this repository / Download it
- Get your Medium credentials
    - Settings -> Integration tokens -> Generate new token -> Store this somewhere
- Install nodejs 
    - npm install node-fetch && npm install minimist ( To support command line )
- Get python (you probably have it already if you use Mac/Linux)
- Go to where you downloaded this repository in your command line
    - Run this
        ```bash
            python3 poster.py --n "your post title" --f "path_to_your_file" --i "your API token"
        '''
    - Optional 
        ```bash
        --c "Cors link"
        ```
- Go to your medium drafts 
- Enjoy!!

# Inspired by

- This work is inspired by an awesome blog post I came across [Link](https://dev.to/ignatk/import-markdown-into-medium-in-4-clicks-3jgb)
