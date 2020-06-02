function MovePlayer () {
    if (IsDown(Buttons.left)) {
        player.x -= speed
    }
    if (IsDown(Buttons.right)) {
        player.x += speed
    }
    player.x = Clamp(player.x, 0, screen.width)
}
function MoveTrees () {
    for (let i = 0; i <= trees.length - 1; i++) {
        trees[i].y -= treeSpeed;
if (trees[i].y < -30) {
            trees[i].y = screen.height + 30
            trees[i].x = RandomInt(screen.width)
            info.changeScoreBy(1)
        }
    }
}
function SetUp () {
    blankImage = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    playerSprite = img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 3 3 3 3 3 3 3 3 3 3
        3 3 3 5 5 5 3 3 3 3 5 5 5 5 3 3
        3 3 3 5 5 5 5 3 3 3 5 5 5 5 3 3
        3 3 3 5 5 5 5 3 3 3 5 5 5 5 3 3
        3 3 3 3 3 5 3 3 3 3 5 5 5 5 3 3
        3 3 3 3 3 3 3 3 3 3 3 5 5 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 3 3 3 3 3 3 3 3 3 3
        3 3 3 5 5 5 5 5 3 3 3 3 3 3 3 3
        3 3 3 3 5 5 5 5 5 5 3 3 3 3 3 3
        3 3 3 3 3 5 5 5 5 5 5 5 5 3 3 3
        3 3 3 3 3 3 5 5 5 3 3 3 3 3 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
    `
    player = sprites.create(playerSprite, 0)
    scene.setBackgroundColor(6)
    player.y = 20
    speed = 3
    treeSpeed = 1
    list.push(img`
        . . . . . . . . . . . . . . . . . 7 7 . . . . . . . . . . . . .
        . . . . . . . . . . . . . 7 7 7 7 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . .
        . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 7 7 7 . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 7 7 7 . . . .
        . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 7 7 7 7 . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . 7 7 . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 7 7 7 . . . . . .
        . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 7 7 . . . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . . .
        . . 7 . . . . . . . 7 7 7 7 e 7 7 7 7 . . . . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . e e 7 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . 7 7 7 . . e e e 7 7 7 . . . . . . . . . . . .
        . . . . . . . . . 7 7 . . . e e e . 7 7 . . . . . . . . . . . .
        . . . . . . . . 7 7 . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . e e e . . . . . . . . . . . . . . .
    `)
    tree = sprites.create(list[RandomInt(list.length)], 0)
    trees.push(tree)
    info.setScore(0)
    info.setLife(3)
}
let tree: Sprite = null
let list: Image[] = []
let trees: Sprite[] = []
let speed = 0
let treeSpeed = 0
let iFrames = 0
let blankImage: Image = null
let playerSprite: Image = null
let player: Sprite = null
SetUp()
game.onUpdate(function () {
    MovePlayer()
    MoveTrees()
    if (Collision(player, trees[0]) && iFrames == 0) {
        info.changeLifeBy(-1)
        if(info.life() > 0)
        {
            iFrames = 50;
        }
    }
    if(iFrames > 0)
    {
        --iFrames;
        if(iFrames % 5 == 0)
        {
            if(player.image == blankImage)
            {
                player.setImage(playerSprite)
            }
            else
            {
                player.setImage(blankImage)
            }
        }
        
    }
    
})
